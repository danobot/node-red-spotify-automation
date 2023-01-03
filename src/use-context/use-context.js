  
module.exports = function (RED) {
    
    function AppendContextNode(config) {
        RED.nodes.createNode(this, config);
        let globalContext = this.context().global;
        this.on('input', function (msg) {
            msg.payload = globalContext.get(config.key)||[];
            this.send(msg);
        });
       
    }
    RED.nodes.registerType("use-context", AppendContextNode);

};