const { Console } = require("console");

module.exports = function (RED) {

    function FilterTrackNode(config) {
        RED.nodes.createNode(this, config);
        this.on('input', function (msg) {
            let globalContext = this.context().global;
            
            let inputList  = msg.payload;
            this.log("Input size: " + inputList.length)
            this.log("filter context key: " + config.keyy)
            let filterList = globalContext.get(config.keyy)||[]
            this.log("filter size: " + filterList.length)
            
            let filterIds = filterList.map(t => t.track ? t.track.id : t.id)
            //this.log("filterIds", filterIds.length)

            msg.payload = inputList.filter((item) => {
                return !filterIds.includes(item.track.id); 
              })
            this.log("output size: " + msg.payload.length)
            this.send(msg);
        });
       
    }
    RED.nodes.registerType("filter-tracks", FilterTrackNode);

};