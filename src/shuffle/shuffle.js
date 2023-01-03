module.exports = function (RED) {

    function ShuffleNode(config) {
        RED.nodes.createNode(this, config);

        this.on('input', function (msg) {
            this.log(typeof msg.payload)
            if (typeof msg.payload !== 'object') {
                msg.error = "payload must be array";
                this.send(msg);
                return
            }
            let shuffled = msg.payload
                .map(value => ({ value, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ value }) => value);
            msg.payload = shuffled;
            this.send(msg);
        });
       
    }
    RED.nodes.registerType("shuffle", ShuffleNode);

};