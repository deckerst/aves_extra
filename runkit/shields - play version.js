const appId = "deckers.thibault.aves";

exports.endpoint = async function(request, response) {
    const gplay = require('google-play-scraper');
    var version = "not available";
    await gplay.app({appId: appId})
      .then(function (res) {
        version = "v" + res.version;
      }, function (res) {
        console.log(res);
      });
    var result = {
      "schemaVersion": 1,
      "label": "play",
      "message": version,
      "color": "blue",
      "cacheSeconds": 12 * 3600,
    };
    response.end(JSON.stringify(result));
}
