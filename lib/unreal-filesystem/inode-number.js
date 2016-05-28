'use strict';

var inodeNumber = (function() {

    var index = 0;

    return function(){
        index += 1;
        return (index - 1);
    };
});

module.exports = inodeNumber;
