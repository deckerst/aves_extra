const appId = "C106014023";

const url = "https://web-drcn.hispace.dbankcloud.cn/uowap/index";
const params = {
    params: {
        method: "internal.getTabDetail",
        uri: "app%7C" + appId,
    },
    headers: {
        'Accept-Encoding': 'application/json',
    },
};

exports.endpoint = async function(request, response) {
    const axios = require("axios");

    var version = "not available";
    await axios.get(url, params)
        .then(function (res) {
            version = "v" + res.data["layoutData"][0]["dataList"][0]["versionName"];
        });
    var result = {
        "schemaVersion": 1,
        "label": "huawei",
        "message": version,
        "color": "blue",
        "cacheSeconds": 12 * 3600,
    };
    response.end(JSON.stringify(result));
}