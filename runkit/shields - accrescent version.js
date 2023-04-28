const appId = "deckers.thibault.aves";
const url = "https://store.accrescent.app/apps/" + appId + "/repodata.json";

exports.endpoint = async function(request, response) {
    const axios = require("axios");

    var version = "not available";
    await axios.get(url)
        .then(function (res) {
            version = "v" + res.data["version"];
        });
    var result = {
        "schemaVersion": 1,
        "label": "accrescent",
        "message": version,
        "color": "blue",
        "cacheSeconds": 12 * 3600,
    };
    response.end(JSON.stringify(result));
}
