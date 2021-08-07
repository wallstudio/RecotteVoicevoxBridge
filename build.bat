@echo off

set ZIP_FILENAME="recotte_voicevox_bridge.zip"
set ZIP_WOKING_DIR="RecotteVoicevoxBridge"


@REM Clan
del %ZIP_FILENAME%
rd /S /Q %ZIP_WOKING_DIR%

@REM Build
node .\node_modules\typescript\lib\tsc.js --build
node .\node_modules\nexe\index.js -t x64-14.15.3 -i .\dist\index.js

@REM Pack
mkdir %ZIP_WOKING_DIR%
copy README.md %ZIP_WOKING_DIR%\README.md
copy LICENSE %ZIP_WOKING_DIR%\LICENSE
copy RecotteVoicevoxBridge.exe %ZIP_WOKING_DIR%\RecotteVoicevoxBridge.exe
PowerShell.exe -Command Compress-Archive -Path %ZIP_WOKING_DIR% -DestinationPath %ZIP_FILENAME%
rd /S /Q %ZIP_WOKING_DIR%