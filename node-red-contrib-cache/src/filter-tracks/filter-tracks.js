const { Console } = require("console");

module.exports = function (RED) {

    function FilterTrackNode(config) {
        RED.nodes.createNode(this, config);
        
        this.on('input', function (msg) {
            let globalContext = this.context().global;
            
            let inputList  = msg.payload;
            this.log("Input size: ", inputList.length)
            this.log("filter context key: ",config.name)
            let filterList = []
            if (globalContext.keys().includes(config.name)) {
                filterList = globalContext.get(config.name, "file")
            }
            this.log("filter size: ", filterList.length)
            
            let filterIds = filterList.map(i => i.track.id)
            //this.log("filterIds", filterIds.length)

            msg.payload = inputList.filter((item) => {
                return !filterIds.includes(item.track.id); 
              })
            this.log("output size: ", msg.payload.length)
            this.send(msg);
        });
       
    }
    RED.nodes.registerType("filter-tracks", FilterTrackNode);

};