this.clients = {};

exports.init = function () {
    this.on("_clientConnected", engine.flow(this, [{
        "call": "_clientConnected"
    }]));
};

function Client(link, clients, conf) {
    this.id = link.id;
    this.socket = link.socket;
    this.clients = clients;
    this.type = conf.type;
    this.lnk = link;
    this.on("close", function () {
        this.clients[this.id] = null;
    }.bind(this));
    link.data(function (err, data) {
        if (err) { return this.emit("close"); }
        switch (this.type) {
            case "client":
                break;
            case "session":
                break;
            case "group":
                break;
            default:
                Object.keys(this.clients).forEach(function (c) {
                    this.clients[c].lnk.send(err, data);
                }.bind(this));
                break;
        }


    }.bind(this));
}

Client.prototype.on = function () {
    this.socket.on.apply(this, arguments);
};

exports._clientConnected = function (link) {
    this.clients[link.id] = new Client(link, this.clients, this._config);
};
