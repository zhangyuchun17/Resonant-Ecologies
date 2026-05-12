$path = "D:\02" + [char]0x5b66 + [char]0x4e60 + "\2026spring\Resonant Ecologies\data\waterway_filtered.geojson"
Write-Host "Reading: $path"
$text = [System.IO.File]::ReadAllText($path)
Write-Host "File length: $($text.Length)"

$ww = [regex]::Matches($text, '"waterway":"([^"]+)"')
$counts = @{}
foreach ($m in $ww) {
    $v = $m.Groups[1].Value
    if ($counts[$v]) { $counts[$v]++ } else { $counts[$v] = 1 }
}
Write-Host "=== waterway values ==="
$counts.GetEnumerator() | Sort-Object Value -Descending | ForEach-Object { Write-Host "$($_.Key): $($_.Value)" }
