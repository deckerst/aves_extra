const url = "https://www.amazon.com/dp/B09XQHQQ72";
const regex = /Version:<\/span><span> (.*?)<\/span>/;

exports.endpoint = async function(request, response) {
    const jsdom = require("jsdom");
    const { JSDOM } = jsdom;

    var version = "not available";
    var options = {};
    await JSDOM.fromURL(url, options).then(dom => {
        version = "v" + dom.serialize().match(regex)[1];
    });
    var result = {
      "schemaVersion": 1,
      "label": "amazon",
      "message": version,
      "color": "blue",
      "cacheSeconds": 12 * 3600,
    };
    response.end(JSON.stringify(result));
}