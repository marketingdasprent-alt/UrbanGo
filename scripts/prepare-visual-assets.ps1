# Deterministic asset conversion: retain official symbol pixels and typography.
Add-Type -AssemblyName System.Drawing
$assetDir = Join-Path $PSScriptRoot '../assets/images'
$sourcePath = [IO.Path]::GetFullPath((Join-Path $assetDir 'urbango-logo.png'))
$bitmap = [Drawing.Bitmap]::new($sourcePath)
$width = $bitmap.Width
$height = $bitmap.Height
$symbolWidth = 205
$background = [Collections.Generic.HashSet[int]]::new()
$queue = [Collections.Generic.Queue[int]]::new()
for ($y=0; $y -lt $height; $y++) { $queue.Enqueue($y*$symbolWidth); $queue.Enqueue($y*$symbolWidth+$symbolWidth-1) }
for ($x=0; $x -lt $symbolWidth; $x++) { $queue.Enqueue($x); $queue.Enqueue(($height-1)*$symbolWidth+$x) }
while ($queue.Count) {
  $index = $queue.Dequeue()
  if ($background.Contains($index)) { continue }
  $x = $index % $symbolWidth; $y = [int][Math]::Floor($index/$symbolWidth)
  $c = $bitmap.GetPixel($x,$y)
  if ($c.R -lt 235 -or $c.G -lt 235 -or $c.B -lt 235) { continue }
  [void]$background.Add($index)
  if ($x -gt 0) { $queue.Enqueue($index-1) }
  if ($x -lt $symbolWidth-1) { $queue.Enqueue($index+1) }
  if ($y -gt 0) { $queue.Enqueue($index-$symbolWidth) }
  if ($y -lt $height-1) { $queue.Enqueue($index+$symbolWidth) }
}
$mask = [Text.StringBuilder]::new()
for ($y=0; $y -lt $height; $y++) {
  $x=0
  while ($x -lt $symbolWidth) {
    if ($background.Contains($y*$symbolWidth+$x)) { $x++; continue }
    $start=$x
    while ($x -lt $symbolWidth -and !$background.Contains($y*$symbolWidth+$x)) { $x++ }
    [void]$mask.Append("M$start,$y h$($x-$start)v1H$start z ")
  }
}
$bitmap.Dispose()
$embedded = [Convert]::ToBase64String([IO.File]::ReadAllBytes($sourcePath))
$svg = @"
<svg xmlns="http://www.w3.org/2000/svg" width="$width" height="$height" viewBox="0 0 $width $height">
<defs>
<image id="official" width="$width" height="$height" href="data:image/png;base64,$embedded"/>
<clipPath id="symbol"><path d="$mask"/></clipPath>
<clipPath id="letters"><rect x="$symbolWidth" width="$($width-$symbolWidth)" height="$height"/></clipPath>
<filter id="white" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  -0.34413 -0.34413 -0.34413 0 1"/></filter>
</defs>
<use href="#official" clip-path="url(#symbol)"/>
<g clip-path="url(#letters)"><use href="#official" filter="url(#white)"/></g>
</svg>
"@
[IO.File]::WriteAllText((Join-Path $assetDir 'urbango-logo-dark.svg'),$svg)

$generatedDir = 'C:/Users/Pichau/.codex/generated_images/01a047d0-4297-7850-b156-3d184d640878'
$photos = @{
  'exec-ef5a675f-01b6-48a3-8e1a-e10f887bf294.png'='driver-own-car.jpg'
  'exec-34f25771-64d0-4df0-9701-d1adeddf419e.png'='driver-car-handover.jpg'
}
$codec = [Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object MimeType -eq 'image/jpeg'
foreach ($entry in $photos.GetEnumerator()) {
  $photo = [Drawing.Image]::FromFile((Join-Path $generatedDir $entry.Key))
  $scaled = [Drawing.Bitmap]::new(1200,800)
  $graphics = [Drawing.Graphics]::FromImage($scaled)
  $graphics.InterpolationMode = [Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $graphics.DrawImage($photo,0,0,1200,800)
  $parameters = [Drawing.Imaging.EncoderParameters]::new(1)
  $parameters.Param[0] = [Drawing.Imaging.EncoderParameter]::new([Drawing.Imaging.Encoder]::Quality,[long]86)
  $scaled.Save((Join-Path $assetDir $entry.Value),$codec,$parameters)
  $parameters.Dispose(); $graphics.Dispose(); $scaled.Dispose(); $photo.Dispose()
}
