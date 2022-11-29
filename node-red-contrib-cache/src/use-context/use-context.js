  
module.exports = function (RED) {
    
    function AppendContextNode(config) {
        RED.nodes.createNode(this, config);
        let globalContext = this.context().global;
        console.log("Use Context Global context ", globalContext.keys())
        this.on('input', function (msg) {
            console.log("Use Context Global context uibside", globalContext.keys())
            
             
            let value = globalContext.get(config.key)||[]
            // if (globalContext.keys().includes(config.name)) {
                
            //     console.log("Use Context: loaded: ", value.length)
            // } else {
            //     console.log("Use Context: Context key does not exist.", config.key)
            // }
            msg.payload = value;
            this.send(msg);
        });
       
    }
    RED.nodes.registerType("use-context", AppendContextNode);

};