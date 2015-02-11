this.clients = {};

exports.init = function () {
    this.on("_clientConnected", engine.flow(this, [{
        "call": "_clientConnected"
    }]));
};

function Client(link, clients) {
    this.id = link.id;
    this.socket = link.socket;
    this.clients = clients;
    this.on("close", function () {
        this.clients[this.id] = null;
    }.bind(this));
}

Client.prototype.on = function () {
    this.socket.on.apply(this, arguments);
};

exports._clientConnected = function (link) {
    this.clients[link.id] = new Client(link, this.clients);
};
