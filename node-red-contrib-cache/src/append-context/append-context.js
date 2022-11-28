module.exports = function (RED) {

    function AppendContextNode(config) {
        RED.nodes.createNode(this, config);

        this.on('input', function (msg) {
            
            let value = context.global.get(config.key) || []
            value = value.concat(msg.payload)
            global.set(config.key, value)
            this.send(msg);
        });
       
    }
    RED.nodes.registerType("append-context", AppendContextNode);

};