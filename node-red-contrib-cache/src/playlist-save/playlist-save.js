
module.exports = function (RED) {
    const SpotifyWebApi = require('spotify-web-api-node');
    const paginated_fetch = require('../common/paginated_fetch');
    const refreshToken = require('../common/refresh_token');
    function PlaylistSaveNode(config) {
        RED.nodes.createNode(this, config);

        const node = this;
        node.config = RED.nodes.getNode(config.auth);

        const spotifyApi = new SpotifyWebApi({
            clientId: node.config.credentials.clientId,
            clientSecret: node.config.credentials.clientSecret,
            accessToken: node.config.credentials.accessToken,
            refreshToken: node.config.credentials.refreshToken
        });

        node.on('input', function (msg) {
            if ((new Date().getTime() / 1000) > node.config.credentials.expireTime) {
                refreshToken(node, spotifyApi).then(() => {
                    handleInput(msg);
                });
            } else {
                spotifyApi.setAccessToken(node.config.credentials.accessToken);
                handleInput(msg);
            }
        });

        function handleInput(msg) {
            try {
                let tracks = msg.payload.map(t => t.track.uri);
                console.log("Updating playlist: " + config.playlist);
               
                // spotifyApi.getPlaylistTracks(param, {...p}).then(res => {
                //     const data = res.body
                //     console.log("res", res)
              
                   
                //     return res;
            
                // })
                paginated_fetch('getPlaylistTracks', config.playlist, 0, [], spotifyApi).then(data => {
                    console.log("Playlist items; ", data.length)
                    let pTracks = data.map(i=> i.track);
                    console.log("Got playlist tracks", pTracks.length)
                    return pTracks
                }).then(data => {
                    console.log(data.map(i=> i))
                    // let pTracks = data.body.items;
                    // console.log("Got playlist tracks", pTracks.length)
                    return data
                }).catch(err => {
                    console.error(err)
                    msg.error = err;
                    node.send(msg);
                });

                // spotifyApi.addTracksToPlaylist(config.playlist, tracks).then(data => {
                //     msg.payload = data;
                //     console.log(data)
                //     node.send(msg);
                // }).catch(err => {
                //     console.error(err)
                //     msg.error = err;
                //     node.send(msg);
                // });
                
                
            } catch (err) {
                msg.err = err;
                console.error(err)
                node.send(msg);
            }
        }
        
        
    }
    RED.nodes.registerType("playlist-save", PlaylistSaveNode);


 
};