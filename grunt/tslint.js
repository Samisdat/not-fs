module.exports = function(grunt){

    'use strict';

    var files = [
        'typescript/src/**/*.ts',
    ];

    var options = {
        configuration: 'tslint.json',
        force: false,
        fix: false
    };

    var fix = grunt.option('fix');
    if(true === fix){
        options.fix = true;
    }

    var tslint = {
        lint: {
            src: files,
            options: options
        }
    };

    return tslint;
};
