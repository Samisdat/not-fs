/*global module */

var files = [
    'grunt/*.js',
];

var eslint = {
    lint:{
        src: files
    },
    lintAndFix:{
        options:{
            fix: true
        },
        src: files    
    }
};



module.exports = eslint;
