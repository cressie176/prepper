var assert = require('chai').assert
var semver = require('semver')
var Logger = require('../..').Logger
var Repo = require('../..').Repo
var Pkg = require('../../').decorators.Pkg
var json = require('../../package.json')

describe('Package Decorator', function() {

    var repo = new Repo()
    var decorator = new Pkg(json)
    var logger = new Logger()

    beforeEach(function() {
        logger.on('message', decorator.decorate)
        decorator.on('message', repo.store)
    })

    afterEach(function() {
        repo.clear()
        decorator.removeAllListeners()
        logger.removeAllListeners()
    })

    it('should decorate events with details from package json', function() {
        logger.debug('meh')

        var events = repo.list()
        assert.equal(repo.count(), 1)
        assert.equal(events[0].level, 'debug')
        assert.equal(events[0].message, 'meh')
        assert.equal(events[0].package.name, 'ernie')
        assert.ok(semver.valid(events[0].package.version))
    })
})