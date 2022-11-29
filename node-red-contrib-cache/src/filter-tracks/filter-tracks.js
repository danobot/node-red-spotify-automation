const { Console } = require("console");

module.exports = function (RED) {

    function FilterTrackNode(config) {
        RED.nodes.createNode(this, config);
        
        this.on('input', function (msg) {
            let globalContext = this.context().global;
            
            let inputList  = msg.payload;
            console.log("Input size: ", inputList.length)
            console.log("filterList key: ",config.name)
            let filterList = []
            if (globalContext.keys().includes(config.name)) {
                filterList = globalContext.get(config.name, "file")
            }
            console.log("filter size: ", filterList.length)
            
            let filterIds = filterList.map(i => i.track.id)
            //console.log("filterIds", filterIds.length)

            msg.payload = inputList.filter((item) => {
                return !filterIds.includes(item.track.id); 
              })
            console.log("output size: ", msg.payload.length)
            this.send(msg);
        });
       
    }
    RED.nodes.registerType("filter-tracks", FilterTrackNode);

};