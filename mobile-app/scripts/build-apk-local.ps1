# Build release APK locally (no Expo login). Output: ../downloads/uxi-tech.apk
$ErrorActionPreference = "Stop"
$root = Split-Path (Split-Path $PSScriptRoot -Parent) -Parent
$mobile = Join-Path $root "mobile-app"
$apkOut = Join-Path $root "downloads\uxi-tech.apk"

$env:ANDROID_HOME = if ($env:ANDROID_HOME) { $env:ANDROID_HOME } else { "$env:LOCALAPPDATA\Android\Sdk" }
$env:GRADLE_USER_HOME = "C:\gradle"

if (-not (Test-Path $env:ANDROID_HOME)) {
  Write-Error "Android SDK not found. Install Android Studio."
}

Set-Location $mobile
if (-not (Test-Path "android")) {
  npx expo prebuild --platform android --no-install
}

Set-Location (Join-Path $mobile "android")
.\gradlew.bat assembleRelease -PreactNativeArchitectures=arm64-v8a

$built = Join-Path $mobile "android\app\build\outputs\apk\release\app-release.apk"
if (-not (Test-Path $built)) { Write-Error "APK not found at $built" }

New-Item -ItemType Directory -Force -Path (Split-Path $apkOut) | Out-Null
Copy-Item $built $apkOut -Force
Write-Host "APK ready: $apkOut ($([math]::Round((Get-Item $apkOut).Length / 1MB, 1)) MB)"
