
module.exports = function refreshToken(node, spotifyApi, RED, config) {
    return new Promise((resolve, reject) => {
        spotifyApi.refreshAccessToken()
        .then(data => {
            node.config.credentials.expireTime = data.body.expires_in + Math.floor(new Date().getTime() / 1000);
            node.config.credentials.accessToken = data.body.access_token;
            
            RED.nodes.addCredentials(config.auth, node.config.credentials);

            spotifyApi.setAccessToken(data.body.access_token);

            resolve();
        })
        .catch(error => {
            reject(error);
        });
    });
}

