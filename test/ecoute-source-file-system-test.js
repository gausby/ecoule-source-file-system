/*jslint maxlen:140*/
/* global require */
'use strict';

var buster = require('buster'),
    Ecoute = require('ecoute'),
    Source = require('../lib/ecoute-source-file-system')
;

var assert = buster.assertions.assert;
var refute = buster.assertions.refute;


buster.testCase('A file system source', {
    'should implement a refresh function': function () {
        var test = new Source();

        assert.isFunction(test.refresh);
    },
    'should implement an initialize function': function () {
        var test = new Source();

        assert.isFunction(test.initialize);
    }
});

buster.testCase('refresh', {
    'should fetch the data from the files specified by the glob pattern': function (done) {
        var test = new Source({
            'pattern': 'test/assets/foo.txt'
        });

        test.refresh(function(err, data) {
            refute.exception(function() {
                throw err;
            });
            done();
        });
    },
    'should store the data of a file in a Buffer': function (done) {
        var test = new Source({
            'pattern': 'test/assets/foo.txt'
        });

        test.refresh(function(err, data) {
            assert.isTrue(data[0].raw instanceof Buffer);
            done();
        });
    },
    'should stat the files and save the result in a key called stat': function (done) {
        var test = new Source({
            'pattern': 'test/assets/foo.txt'
        });

        test.refresh(function(err, data) {
            assert.defined(data[0].stats);
            assert.defined(data[0].stats.mtime);
            done();
        });
    }
});

buster.testCase('initialization', {
    'should call its callback method at some point': function (done) {
        var test = new Source({});

        test.initialize(function(err) {
            assert.defined(err);
            done();
        });
    },
    '// should check if the source is readable': function (done) {}
});
