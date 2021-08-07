const { argv } = require("nexe");

(async function()
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
})();