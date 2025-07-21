# Comprehensive script to remove ALL CSS comments
$cssFile = "src\index.css"

if (Test-Path $cssFile) {
    Write-Host "Processing CSS file: $cssFile"
    
    $content = Get-Content $cssFile -Raw
    
    # Remove CSS comments /* ... */ (including multiline)
    $content = $content -replace '/\*[\s\S]*?\*/', ''
    
    # Remove any remaining single line comments that start with //
    $content = $content -replace '//[^\r\n]*', ''
    
    # Clean up multiple consecutive empty lines
    $content = $content -replace '(\r?\n\s*){3,}', "`r`n`r`n"
    
    # Remove trailing whitespace from lines
    $content = $content -replace '[ \t]+(\r?\n)', '$1'
    
    $content | Set-Content $cssFile
    
    Write-Host "All CSS comments removed successfully!"
} else {
    Write-Host "CSS file not found: $cssFile"
}
