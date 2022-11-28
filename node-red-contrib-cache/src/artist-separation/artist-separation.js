module.exports = function (RED) {

    function ShuffleNode(config) {
        RED.nodes.createNode(this, config);

        this.on('input', function (msg) {
            const ARTIST_SEPARATION = 4;


        const increase = (m) => {
            Object.values(m).forEach(item => item++)
        }

        const resetTrackARtists = (track, artistMap) => {
            track.track.artists.map(artist => {
                artistMap[artist.id] = 0;
            });
        }

        let buffer = [];
        let artistMap = {}
        let inputList = msg.payload.slice(0,50).reverse();
        let outputList = []
        inputList.map(track => {
            //console.log(track)
            track.track.artists.map(artist => {
                artistMap[artist.id] = ARTIST_SEPARATION + 1;
            })

        })

        // algo
        console.log("Playlist length: ", inputList.length)
        const wasRepeated = (a) => {
            //console.log(a.name, artistMap[a.id])
            return artistMap[a.id] <= ARTIST_SEPARATION;
        }

        while (inputList.length > 0) {
            let currentTrack;
            let hasRepeated;
            do {
                currentTrack = inputList.pop();
                hasRepeated = currentTrack.track.artists.some(wasRepeated);
                
                if (hasRepeated) { // track was played recently - skip this one and move on to next
                    console.log("Artist repeated. Skipping to next and adding to buffer.", currentTrack.track.artists.map(a => a.name))
                    buffer.push(currentTrack)
                    
                    continue;
                }
                
                console.log("Artist not repeated: ", currentTrack.track.artists.map(a => a.name))
                outputList.push(currentTrack);

                increase(artistMap); // increase all by 1
                resetTrackARtists(currentTrack, artistMap);
                if (buffer.length > 0) {
                    inputList.push(buffer.shift())
                }
            } while (hasRepeated && inputList.length > 0);

            
        }
        msg.payload = [];
        return msg
        });
       
    }
    RED.nodes.registerType("artist-separation", ShuffleNode);

};