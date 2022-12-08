const url = "https://galaxystore.samsung.com/detail/deckers.thibault.aves";
const regex = />Version<\/div>(.*?) /;

exports.endpoint = async function(request, response) {
    const jsdom = require("jsdom");
    const { JSDOM } = jsdom;
    function delay(milisec) {
        return new Promise(resolve => {
            setTimeout(() => { resolve('') }, milisec);
        })
    }

    var version = "not available";
    var options = {
        resources: "usable",
        runScripts: "dangerously",
    };
    await JSDOM.fromURL(url, options).then(async dom => {
        dom.window.matchMedia = dom.window.matchMedia || (() => { return { matches: false, addListener: () => {}, removeListener: () => {}, }; });
        await delay(3000);
        version = "v" + dom.serialize().match(regex)[1];
    });
    var result = {
      "schemaVersion": 1,
      "label": "galaxy",
      "message": version,
      "color": "blue",
      "cacheSeconds": 12 * 3600,
    };
    response.end(JSON.stringify(result));
}