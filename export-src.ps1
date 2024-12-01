$srcPath = ".\src"
$files = Get-ChildItem -Path $srcPath -Recurse -File | Where-Object { $_.Extension -in ".tsx",".ts",".js",".jsx",".css" }
$result = @()

foreach ($file in $files) {
    $relativePath = $file.FullName.Replace((Get-Location).Path + "\", "")
    $content = Get-Content -Path $file.FullName -Raw
    $result += @{
        path = $relativePath
        content = $content
    }
}

$result | ConvertTo-Json -Depth 10 | Set-Content "src-export.json" 