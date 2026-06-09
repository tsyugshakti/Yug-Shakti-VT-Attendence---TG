$modelsDir = ".\models"
$jsDir = ".\js"

if (-not (Test-Path $modelsDir)) { New-Item -ItemType Directory -Path $modelsDir }
if (-not (Test-Path $jsDir)) { New-Item -ItemType Directory -Path $jsDir }

$files = @(
    @{ url="https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/dist/face-api.min.js"; dest="$jsDir\face-api.min.js" },
    @{ url="https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/ssd_mobilenetv1_model-weights_manifest.json"; dest="$modelsDir\ssd_mobilenetv1_model-weights_manifest.json" },
    @{ url="https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/ssd_mobilenetv1_model-shard1"; dest="$modelsDir\ssd_mobilenetv1_model-shard1" },
    @{ url="https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/ssd_mobilenetv1_model-shard2"; dest="$modelsDir\ssd_mobilenetv1_model-shard2" },
    @{ url="https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/face_landmark_68_model-weights_manifest.json"; dest="$modelsDir\face_landmark_68_model-weights_manifest.json" },
    @{ url="https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/face_landmark_68_model-shard1"; dest="$modelsDir\face_landmark_68_model-shard1" },
    @{ url="https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/face_recognition_model-weights_manifest.json"; dest="$modelsDir\face_recognition_model-weights_manifest.json" },
    @{ url="https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/face_recognition_model-shard1"; dest="$modelsDir\face_recognition_model-shard1" },
    @{ url="https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/face_recognition_model-shard2"; dest="$modelsDir\face_recognition_model-shard2" }
)

foreach ($file in $files) {
    Write-Host "Downloading $($file.dest)..."
    Invoke-WebRequest -Uri $file.url -OutFile $file.dest
}
Write-Host "Done!"
