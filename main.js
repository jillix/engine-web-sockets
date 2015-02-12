/**
 * init
 * The init function.
 *
 * @name init
 * @function
 * @return {undefined}
 */
exports.init = function () {
    this.ws = this.link("_clientConnected").send().data(function (err, data) {
        this.emit("data", err, data);
    }.bind(this));
};

/**
 * wsEmit
 * Emits something from to client to the server.
 *
 * @name wsEmit
 * @function
 * @param {Object} ev The event object.
 * @param {Object} data The data object.
 * @return {undefined}
 */
exports.wsEmit = function (ev, data) {
    this.ws.send(null, data);
};
