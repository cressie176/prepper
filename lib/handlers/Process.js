var EventEmitter = require('events').EventEmitter
var util = require('util')
var merge = require('lodash.merge')

function Process() {

    var self = this

    this.handle = function(event) {
        self.emit('message', merge({}, { process: { title: process.title, version: process.version, pid: process.pid, memory: process.memoryUsage() }}, event))
    }

    EventEmitter.call(this);
}

util.inherits(Process, EventEmitter)

module.exports = Process