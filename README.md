# RecotteVoicevoxBridge

VoiceVox起動状態でVoiceVoxEngineが起動している筈なので、横からHTTPリクエストを飛ばす。

```
RecotteStudio
↓ shell ( -o "%o" -s "%s" -c "%c" )
RecotteVoicevoxBridge
↓ http api (http://127.0.0.1:50021/audio_query, http://127.0.0.1:50021/synthesis)
VoiceVoxEngine
↓ PMW
RecotteVoicevoxBridge
↓ Wav file
RecotteStudio
```

## Build

```
npm install
.\build.bat
```