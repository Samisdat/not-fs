module.exports = function (grunt) {

    'use strict';

    var clean = {
        'coverage': [
            'coverage/',
        ],
        'coverage-unmapped': [
            'coverage/lcov-report/dist'
        ]
    };

    return clean;
};
