import { NodeInitializer } from "node-red";
import { SpotifyNode, SpotifyNodeDef } from "./modules/types";
// import { SpotifyWebApi } from "spotify-web-api-node";

import SpotifyWebApi = require("spotify-web-api-node");

const nodeInit: NodeInitializer = (RED): void => {
  function SpotifyNodeConstructor(
    this: SpotifyNode,
    config: SpotifyNodeDef
  ): void {
    RED.nodes.createNode(this, config);
    const node = this;
    const spotifyApi = new SpotifyWebApi({
        clientId: config.credentials.clientId,
        clientSecret: config.credentials.clientSecret,
        accessToken: config.credentials.accessToken,
        refreshToken: config.credentials.refreshToken
    });

    node.on('input', function (msg) {
        if ((new Date().getTime() / 1000) > config.credentials.expireTime) {
            refreshToken().then(() => {
                handleInput(msg);
            });
        } else {
            spotifyApi.setAccessToken(config.credentials.accessToken);
            handleInput(msg);
        }
    });

    function handleInput(msg) {
        try {
            let params = (msg.params) ? msg.params : [];
            // Reduce params to 1 less than the function expects, as the last param is the callback
            params = params.slice(0, spotifyApi[config.api].length - 1);

            spotifyApi[config.api](...params).then(data => {
                msg.payload = data.body;
                node.send(msg);
            }).catch(err => {
                msg.error = err;
                node.send(msg);
            });
        } catch (err) {
            msg.err = err;
            node.send(msg);
        }
    }

    function refreshToken() {
        return new Promise((resolve, reject) => {
            spotifyApi.refreshAccessToken()
            .then(data => {
                config.credentials.expireTime = data.body.expires_in + Math.floor(new Date().getTime() / 1000);
                config.credentials.accessToken = data.body.access_token;
                
                RED.nodes.addCredentials(config.auth, config.credentials);

                spotifyApi.setAccessToken(data.body.access_token);

                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
        });
    }
  }

  RED.nodes.registerType("spotify", SpotifyNodeConstructor);
};

export = nodeInit;
