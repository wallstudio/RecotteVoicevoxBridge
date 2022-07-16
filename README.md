# RecotteVoicevoxBridge

RecotteStudioとVOICEVOXを連携させるアプリです。

## 使い方

1. [RecotteStudio](https://www.ah-soft.com/rs/updates/)と[VOICEVOX](https://voicevox.hiroshiba.jp/)の最新版をそれぞれインストールしてください。
1. [Releases](https://github.com/wallstudio/RecotteVoicevoxBridge/releases)からRecotteVoicevoxBridgeをダウンロードして適当なディレクトリに展開します。
1. RecotteStudioの外部アプリ連携を画像のように設定します。（実行コマンドのexeファイルの場所は各環境に合わせてください）
1. VOICEVOXを起動してください。
1. RecotteStudioの話者を図を参考して設定します。（話者名に指定すべき番号は後述）
1. CeVIOAPI連携と同様に更新をかけるたびに自動でVOICEVOXから音声データを引っ張って来るようになります。

![image](img/config1.png)
![image](img/config2.png)

RecotteStudioの設定方法は以下の動画がわかりやすいので見てください。（あとマキさんが可愛いので）  

https://twitter.com/ahsoft/status/1423217051456262149?s=20


## 仕組み

VOICEVOX起動状態でVoiceVoxEngineが起動している筈なので、横からHTTPリクエストを飛ばす。


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


## 標準で読め上げできない文字へのケア

VOICEVOXの辞書ではどうしても読めない言葉があるので、事前に置き換えることが出来ます。
JSON型式のファイルを作ります。
```
{
  "RecotteStudio" : "れこってすたぢお",
  "VOICEVOX" : "ぼいすぼっくす",
  "Twitch" : "ついっち"
}
```

RecotteStudioに設定する引数に、ファイルをフルパスで指示します。

```
-o "%o" -s "%s" -c "%c" -d "d:\replaced.json"
```


## VOICEVOXを継承するソフトウェアと連動する場合
- COEIROINKと連動する場合
    - オプションに -p 50031 を指定します。
- LMROIDと連動する場合
    - オプションに -p 50073 を指定します。


## 話者IDの調べ方
- VOICEVOX
    - VOICEVOXを立ち上げたうえで、[ドキュメント](http://127.0.0.1:50021/docs#/%E3%81%9D%E3%81%AE%E4%BB%96/speakers_speakers_get)を参考に調べます。(Try it out → Executeの順に押して表示されるリストを見て調べます)   
- COEIROINK
    - COEIROINKを立ち上げたうえで、[ドキュメント](http://127.0.0.1:50031/docs#/%E3%81%9D%E3%81%AE%E4%BB%96/speakers_speakers_get)を参考に調べます。(Try it out → Executeの順に押して表示されるリストを見て調べます)
- LMROID
    - LMROIDを立ち上げたうえで、[ドキュメント](http://127.0.0.1:50073/docs#/%E3%81%9D%E3%81%AE%E4%BB%96/speakers_speakers_get)を参考に調べます。(Try it out → Executeの順に押して表示されるリストを見て調べます)


## Build

```
npm install
.\build.bat
```
