exports.init = function () {
    this.ws = this.link("_clientConnected").send().data(function (err, data) {
        this.emit("data", err, data);
    }.bind(this));
};

exports.wsEmit = function (ev, data) {
    this.ws.send(null, data);
};
