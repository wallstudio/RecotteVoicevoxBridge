# RecotteVoicevoxBridge

VoiceVox起動状態でVoiceVoxEngineが起動している筈なので、横からHTTPリクエストを飛ばす。

![image](https://user-images.githubusercontent.com/22035855/128590646-14116bfe-030b-4d22-94ef-4be289080c6d.png)

```
RecotteStudio
↓ shell ( -o "%o" -s "%s" -c "%c" )
RecotteVoicevoxBridge
↓ http api (http://127.0.0.1:50021/audio_query, http://127.0.0.1:50021/synthesis)
VoiceVoxEngine
↓ PCM
RecotteVoicevoxBridge
↓ Wav file
RecotteStudio
```

## Build

```
npm install
.\build.bat
```
