const { Console } = require("console");

module.exports = function (RED) {

    function FilterTrackNode(config) {
        RED.nodes.createNode(this, config);
        var globalContext = this.context().global;
        this.on('input', function (msg) {
        console.log("context ", this.context().keys())
            
            let inputList  = msg.payload;
            console.log("Filter Input: ", inputList.length)
            console.log("filterList context key: ",config.name)
            let filterList = globalContext.get(config.name)
            console.log("filterList: ", filterList.length)
            
            let filterIds = filterList.map(i => i.track.id)
            console.log("filterIds", filterIds.length)

            msg.payload = inputList.filter((item) => {
                return !filterIds.includes(item.track.id); 
              })

            this.send(msg);
        });
       
    }
    RED.nodes.registerType("filter-tracks", FilterTrackNode);

};