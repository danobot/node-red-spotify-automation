module.exports = function (RED) {

    function FirstNode(config) {
        RED.nodes.createNode(this, config);

        this.on('input', function (msg) {
            this.log(typeof msg.payload)
            if (typeof msg.payload !== 'object') {
                msg.error = "payload must be array";
                this.send(msg);
                return
            }
            msg.payload = msg.payload.splice(0, config.count);
            this.send(msg);
        });
       
    }
    RED.nodes.registerType("first", FirstNode);

};