import { Configuration, DefaultApi } from "./openapi/index";
import { writeFileSync } from "fs";

export async function main()
{
    try
    {
        // -o "%o" -s "%s" -c "%c"
        const output = process.argv[process.argv.indexOf("-o") + 1];
        const speaker = process.argv[process.argv.indexOf("-s") + 1];
        const comment = process.argv[process.argv.indexOf("-c") + 1];
        console.log(`output: ${output}`);
        console.log(`speaker: ${speaker}`);
        console.log(`comment: ${comment}`);

        const api = new DefaultApi(new Configuration({ basePath: "http://127.0.0.1:50021" }));
        const query = await api.audioQueryAudioQueryPost({
            text: comment,
            speaker: parseInt(speaker),
        });
        const data = await api.synthesisSynthesisPost({
            speaker: parseInt(speaker),
            audioQuery: query,
        });
        writeFileSync(output, Buffer.from(await data.arrayBuffer()));
    }
    catch(e)
    {
        console.error(e);
    }
    finally
    {
        // delay(for dev)
        let promis = new Promise((r, _) => setTimeout(r, 5000));
        await promis;
    }
}