module.exports = function (RED) {

    function AppendContextNode(config) {
        RED.nodes.createNode(this, config);
        this.on('input', function (msg) {
            let globalContext = this.context().global;
            console.log("context ", globalContext.keys())
            let storedValue = globalContext.get(config.key) || []
            console.log("payload ", msg.payload.length)
            console.log("storedValue ", storedValue.length)
            
            let concatValue = storedValue.concat(msg.payload)
            console.log("concatValue ", concatValue.length)
            globalContext.set(config.key, concatValue)

            this.send(msg);
        });
       
    }
    RED.nodes.registerType("append-context", AppendContextNode);

};