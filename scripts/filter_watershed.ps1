# Spatial filter: keep only waterways that fall within the combined watershed polygons
# Uses ray-casting point-in-polygon for each waterway feature

param(
    [string]$WaterwayFile = "public\data\waterway.geojson",
    [string]$WatershedFile = "public\data\santa_cruz_watershed_complete.geojson",
    [string]$RillitoFile = "public\data\rillito_system_watersheds.geojson",
    [string]$OutputFile = "public\data\waterway_filtered.geojson"
)

# Ray-casting point-in-polygon
function Test-PointInPolygon([double]$px, [double]$py, [array]$ring) {
    $inside = $false
    $n = $ring.Count
    $j = $n - 1
    for ($i = 0; $i -lt $n; $i++) {
        $xi = [double]$ring[$i][0]; $yi = [double]$ring[$i][1]
        $xj = [double]$ring[$j][0]; $yj = [double]$ring[$j][1]
        if ((($yi -gt $py) -ne ($yj -gt $py)) -and
            ($px -lt ($xj - $xi) * ($py - $yi) / ($yj - $yi) + $xi)) {
            $inside = -not $inside
        }
        $j = $i
    }
    return $inside
}

# Build combined list of polygon rings from both watershed files
Write-Host "Loading watershed polygons..."
$sc = Get-Content $WatershedFile -Raw | ConvertFrom-Json
$ri = Get-Content $RillitoFile -Raw | ConvertFrom-Json

$allRings = @()
foreach ($f in $sc.features) {
    # Polygon: coordinates is array of rings; MultiPolygon: array of polygons
    if ($f.geometry.type -eq "Polygon") {
        $allRings += ,($f.geometry.coordinates[0])  # exterior ring only
    } elseif ($f.geometry.type -eq "MultiPolygon") {
        foreach ($poly in $f.geometry.coordinates) {
            $allRings += ,($poly[0])
        }
    }
}
foreach ($f in $ri.features) {
    if ($f.geometry.type -eq "Polygon") {
        $allRings += ,($f.geometry.coordinates[0])
    } elseif ($f.geometry.type -eq "MultiPolygon") {
        foreach ($poly in $f.geometry.coordinates) {
            $allRings += ,($poly[0])
        }
    }
}
Write-Host "Loaded $($allRings.Count) polygon rings for testing"

# Watershed bounding box (pre-filter)
$minLon = -111.31; $maxLon = -110.33; $minLat = 31.03; $maxLat = 32.70

# Point test: check if point is in ANY of the watershed rings
function Test-InWatershed([double]$px, [double]$py) {
    # bbox pre-check
    if ($px -lt $minLon -or $px -gt $maxLon -or $py -lt $minLat -or $py -gt $maxLat) {
        return $false
    }
    foreach ($ring in $script:allRings) {
        if (Test-PointInPolygon $px $py $ring) { return $true }
    }
    return $false
}

Write-Host "Loading waterways..."
$waterways = Get-Content $WaterwayFile -Raw | ConvertFrom-Json
$total = $waterways.features.Count
Write-Host "Total features: $total"

$kept = @()
$i = 0
foreach ($f in $waterways.features) {
    $i++
    if ($i % 500 -eq 0) { Write-Host "  Processing $i / $total  (kept: $($kept.Count))..." }

    $coords = $f.geometry.coordinates
    $type = $f.geometry.type
    $inWatershed = $false

    # For each feature, test a sample of its coordinates
    if ($type -eq "LineString") {
        $pts = $coords
    } elseif ($type -eq "MultiLineString") {
        $pts = $coords | ForEach-Object { $_ } | Select-Object -First 3
    } else {
        $pts = @()
    }

    # Test first, middle, and last point for efficiency
    $testPts = @()
    if ($pts.Count -gt 0) {
        $testPts += ,$pts[0]
        if ($pts.Count -gt 2) { $testPts += ,$pts[[Math]::Floor($pts.Count / 2)] }
        $testPts += ,$pts[$pts.Count - 1]
    }

    foreach ($pt in $testPts) {
        if (Test-InWatershed ([double]$pt[0]) ([double]$pt[1])) {
            $inWatershed = $true
            break
        }
    }

    if ($inWatershed) { $kept += $f }
}

Write-Host "Kept: $($kept.Count) / $total features"

# Write output
$output = [ordered]@{
    type = "FeatureCollection"
    generator = "filtered-watershed"
    features = $kept
}
$output | ConvertTo-Json -Depth 100 -Compress | Set-Content $OutputFile -Encoding UTF8
$sizeKB = [Math]::Round((Get-Item $OutputFile).Length / 1024)
Write-Host "Written: $OutputFile ($sizeKB KB)"
