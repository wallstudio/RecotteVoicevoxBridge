@echo off

set ZIP_FILENAME="recotte_voicevox_bridge.zip"
set ZIP_WOKING_DIR="RecotteVoicevoxBridge"

./build-only.bat

@REM Pack
PowerShell.exe -Command Compress-Archive -Path %ZIP_WOKING_DIR% -DestinationPath %ZIP_FILENAME%
rd /S /Q %ZIP_WOKING_DIR%