/* global require module Buffer */
'use strict';

var glob = require('glob'),
    fs = require('fs'),
    path = require('path'),
    eachBatch = require('operandi').eachBatch,
    serial = require('operandi').serial
;

function Source (config) {
    this.title = config.title || 'Untitled File System Source';
    this.pattern = config.pattern;
    this.concurrentReads = config.concurrentReads || 5;
}


Source.prototype.initialize = function(done) {
    var err,
        that = this
    ;

    if (! this.pattern) {
        done(new Error('No file pattern provided'));
    }

    done();
};


Source.prototype.refresh = function(done) {
    var data = [],
        that = this
    ;

    function callback (err) {
        return done(err, data);
    }

    serial.call(this, [
        function (done) {
            glob(this.pattern, function(err, files) {
                that.files = files;

                if (files.length === 0) {
                    err = new Error('File not found: ' + that.file);
                }

                done(err);
            });
        },
        function (done) {
            eachBatch(this.files, function(file, key, done) {
                var result = {
                    file: file[key],
                    extname: path.extname(file[key]),
                    raw: []
                };

                serial([
                    // get file stats
                    function(done) {
                        fs.stat(file[key], function(err, stats) {
                            if (err) {
                                return done(err);
                            }

                            result.stats = stats;

                            return done();
                        });
                    },
                    // get raw data
                    function(done) {
                        var stream = fs.createReadStream(file[key]);

                        stream.on('data', function(data) {
                            result.raw.push(data);
                        });

                        stream.on('error', function(err) {
                            return done(err);
                        });

                        stream.on('close', function() {
                            result.raw = Buffer.concat(result.raw);
                            data.push(result);
                            return done();
                        });
                    }
                ], done);

            }, this.concurrentReads, done);
        }
    ], callback);

};


module.exports = function (options) {
    return (new Source(options || {}));
};
