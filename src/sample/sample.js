function getRandomSubarray(arr, size) {
    var shuffled = arr.slice(0), i = arr.length, temp, index;
    while (i--) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(0, size);
}

module.exports = function (RED) {
    
    function SampleNode(config) {
        RED.nodes.createNode(this, config);
        
        this.on('input', function (msg) {

            msg.payload = getRandomSubarray(msg.payload, config.count)
            
            this.send(msg);
        });
       
    }
    RED.nodes.registerType("sample", SampleNode);

};