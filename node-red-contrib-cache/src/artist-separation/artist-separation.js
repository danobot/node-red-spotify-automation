module.exports = function (RED) {

    function ShuffleNode(config) {
        RED.nodes.createNode(this, config);

        this.on('input', function (msg) {
            const ARTIST_SEPARATION = 4;

            const increase = (artistMapParam) => {
                Object.keys(artistMapParam).forEach(a => artistMapParam[a] = ++artistMapParam[a])
            }
            
            const printTrack = (track) => {
                return track.track.name + " - " +
                       track.track.artists.map(a => a.name);
            }
            
            let buffer = [];
            let artistMap = {};
            let inputList = msg.payload.reverse();
            let outputList = []
            
            const resetTrackARtists = (track) => {
                track.track.artists.forEach(artist => {
                    artistMap[artist.id] = 0;
                });
            }
            
            
            inputList.map(track => {
                track.track.artists.map(artist => {
                    if (!Object.keys(artistMap).includes(artist.id)) {
                        artistMap[artist.id] = ARTIST_SEPARATION + 1;
                    }
                    
                })
            
            })
            //console.log("Artist Map Length", Object.keys(artistMap).length)
            console.log("Playlist length: ", inputList.length)
            const wasRepeated = (a) => {
                let r = artistMap[a.id] <= ARTIST_SEPARATION
                //console.log("\t\tGap too close?: " + artistMap[a.id] + "<=" + ARTIST_SEPARATION + "="+r)
                return r;
            }
            
            const trackArtistWasRepeated = (t) => {
                return t.track.artists.some(wasRepeated);
            }
            while (inputList.length > 0) {
                let currentTrack;
                let hasRepeated;
                do {
                    currentTrack = inputList.pop();
                    console.log("Current track: ", printTrack(currentTrack));
                    
                    hasRepeated = trackArtistWasRepeated(currentTrack)
                    
                    if (hasRepeated) { // track was played recently - skip this one and move on to next
                        console.log("\t\tArtist repeated. Adding to buffer.Skipping to next.")
                        buffer.push(currentTrack)
                        console.log("\t\tBuffer: ", buffer.map(t => printTrack(t)))
                        continue;
                    }
                    
                    
                    console.log("\t\tAdding track to playlist.")
                    outputList.push(currentTrack);
            
                    increase(artistMap); // increase all by 1
                    resetTrackARtists(currentTrack);
                    
                    if (buffer.length > 0) {
                        
                        let peekBufferTrack = buffer.shift()
                        console.log("\t\tMaintaining Buffer - Item: ", printTrack(peekBufferTrack))
                        if (!trackArtistWasRepeated(peekBufferTrack)) {
                            console.log("\t\t\tAdding track to inputList (from buffer):", printTrack(peekBufferTrack))
                            inputList.push(peekBufferTrack)
                        } else {
                            console.log("\t\t\tTrack not ready. Returning element to buffer.")
                            buffer.push(peekBufferTrack); // rotates the buffer
                        }
                            
                    }
                } while (hasRepeated && inputList.length > 0);
            
                
            }
            //console.log("Buffer Contents")
            //buffer.map(t => console.log(printTrack(t)))
            //console.log("End Buffer")
            //console.log("Output List")
            //outputList.map(t=> console.log(printTrack(t)))
            msg.payload = outputList;
            this.send(msg);
        });
       
    }
    RED.nodes.registerType("artist-separation", ShuffleNode);

};