import { FetchAPI, Configuration, DefaultApi } from "./openapi/index";
import { writeFileSync, readFileSync } from "fs";
import fetch from "node-fetch";

export async function main()
{
    try
    {
        // -o "%o" -s "%s" -c "%c"
        const output = process.argv[process.argv.indexOf("-o") + 1];
        const speaker = process.argv[process.argv.indexOf("-s") + 1];
        var comment = process.argv[process.argv.indexOf("-c") + 1];
        const dictionary = process.argv[process.argv.indexOf("-d") + 1];
        var port = process.argv.indexOf("-p") >0 ? process.argv[process.argv.indexOf("-p") + 1] : "50021";
        var ip = process.argv.indexOf("-i") >0 ? process.argv[process.argv.indexOf("-i") + 1] : "127.0.0.1";
        
        console.log(`output: ${output}`);
        console.log(`speaker: ${speaker}`);
        console.log(`comment: ${comment}`);
        console.log(`dictionary: ${dictionary}`);
        console.log(`connect to ${ip}:${port}`);
        
        //読めない文字を置き換える
        if (dictionary.indexOf(".exe") < 0)
        {
            const erratas = JSON.parse(readFileSync(dictionary, { encoding: 'utf-8' }));
            for (const key in erratas) comment = comment.replace(key, erratas[key]);
            console.log(`fixed: ${comment}`);
        }
        
        const api = new DefaultApi(new Configuration(
        {
            basePath: `http://${ip}:${port}`,
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
    catch(e)
    {
        console.error(e);
        await setTimeout(() => {}, 5000);
    }
}