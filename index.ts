import { FetchAPI, Configuration, DefaultApi } from "./openapi/index";
import { writeFileSync, readFileSync } from "fs";
import fetch from "node-fetch";

export async function main() {
    try {
        // -o "%o" -s "%s" -c "%c"
        const output = process.argv[process.argv.indexOf("-o") + 1];
        const speaker = process.argv[process.argv.indexOf("-s") + 1];
        var comment = process.argv[process.argv.indexOf("-c") + 1];
        const dictionary = process.argv[process.argv.indexOf("-d") + 1];

        console.log(`output: ${output}`);
        console.log(`speaker: ${speaker}`);
        console.log(`comment: ${comment}`);
        console.log(`dictionary: ${dictionary}`);

        //読めない文字を置き換える（暫定だけどね）
        try {
            if (dictionary.indexOf(".exe") < 0) {

                let buffer = readFileSync(dictionary, { encoding: 'utf-8' });
                let dictionaryList = buffer.split('\r\n');

                dictionaryList.forEach((element, index, array) => {

                    let dictionaryItem = element.trimEnd().split(',');

                    if (dictionaryItem.length == 1) {
                        comment = comment.replace(dictionaryItem[0], "");
                    } else if (dictionaryItem.length > 1) {
                        comment = comment.replace(dictionaryItem[0], dictionaryItem[1]);
                    }
                });
            }
            console.log(`fixed: ${comment}`);
        }
        catch (e) {
            console.log(`replace failure: ${e}`);
        }

        const api = new DefaultApi(new Configuration(
            {
                basePath: "http://127.0.0.1:50021",
                fetchApi: fetch as any as FetchAPI,
            }));
        const query = await api.audioQueryAudioQueryPost({
            text: comment,
            speaker: parseInt(speaker),
        });
        const data = await api.synthesisSynthesisPost({
            speaker: parseInt(speaker),
            audioQuery: query,
        });
        // HTMLAudioElement.srcに指してるのでWavだと嬉しい（生PCMだとだるい）
        // https://github.com/Hiroshiba/voicevox/blob/main/src/store/audio.ts#L558
        writeFileSync(output, Buffer.from(await data.arrayBuffer()));
    }
    catch (e) {
        console.error(e);
        await setTimeout(() => { }, 5000);
    }
}