$text = Get-Content 'D:\02学习\2026spring\Resonant Ecologies\data\water_area_polygon.geojson' -Raw -Encoding UTF8
Write-Host "File size: $($text.Length) chars"
$json = $text | ConvertFrom-Json
Write-Host "Features: $($json.features.Count)"

$names = [regex]::Matches($text, '"name":"([^"]+)"')
$seen = @{}
Write-Host "=== name values ==="
foreach ($m in $names) {
    $v = $m.Groups[1].Value
    if (-not $seen[$v]) {
        $seen[$v] = 1
        Write-Host $v
    }
    if ($seen.Count -ge 20) { break }
}

Write-Host "=== geometry types ==="
$geomTypes = [regex]::Matches($text, '"type":"(Polygon|MultiPolygon|LineString|MultiLineString|Point)"')
$tc = @{}
foreach ($m in $geomTypes) {
    $v = $m.Groups[1].Value
    if ($tc[$v]) { $tc[$v]++ } else { $tc[$v] = 1 }
}
foreach ($k in $tc.Keys) { Write-Host "$k : $($tc[$k])" }
