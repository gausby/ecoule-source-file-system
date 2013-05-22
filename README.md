File System Source for Écoute
=============================

An [Écoute][ecoute-core] source module that reads data stored on a file system.

[ecoute-core]: https://github.com/gausby/ecoute

This project includes the following third party modules:

  * The files are found using the [Glob][node-glob]-module by [Isaac Z. Schlueter][isaacs].

The creators of these modules does not have anything to do with the File System Source for Écoute-project besides that, please direct all the issues and bugs to the right channels. The bugtracker for this project is located here: [File System Source for Écoute Issue tracker][bugtracker].

[node-glob]: https://github.com/isaacs/node-glob
[isaacs]: https://github.com/isaacs


## Usage
This is a Source module for the Écoute-engine, and should be included in the source section of an Écoute-configuration.

    var Ecoute = require('ecoute'),
        fsSource = require('ecoute-source-file-system');

    var myEcoute({
        sources: [
            fsSource({
                // configration
            })
        ]
        // ...
    });


### Configuration
The configuration passed to the file system source is an object with the following keys.

  * `title` The title of the source used internally in Écoute.

  * `pattern` A glob pattern.

Further configuration parameters has been planed, and the names of these configuration keys could change in a future release.


## Development
After cloning the project you will have to run `npm install` in the project root. This will install the various grunt plugins and other dependencies.


### QA tools
The QA tools rely on the [Grunt](http://gruntjs.com) task runner. To run any of these tools, you will need the grunt-cli installed globally on your system. This is easily done by typing the following in a terminal.

    $ npm install grunt-cli -g

The unit tests will need the [Buster](http://busterjs.org/) unit test framework.

    $ npm install -g buster

These two commands will install the buster and grunt commands on your system. These can be removed by typing `npm uninstall buster -g` and `npm uninstall grunt-cli -g`.


#### Unit Tests
The test suit can be run by typing the following in the project root.

    $ npm test

When developing you want to run the script watcher. Navigate to the project root and type the following in your terminal.

    $ grunt watch:scripts

This will run the jshint and tests each time a file has been modified.


#### API Documentation
The project uses YUIDocs that can be generated by running `grunt docs`. This will create a site with documentation in a folder called `docs/` in the project root which can be served on port 8888 by typing `grunt connect:docs`. If you want to generate docs on file modification you can run `grunt watch:docs`.


## License
The MIT License (MIT)

Copyright (c) 2013 Martin Gausby

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[bugtracker]: https://github.com/gausby/ecoute-source-file-system/issues