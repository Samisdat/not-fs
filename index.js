var fs = require('fs');

fs.existsSync = function(){
    return 'super';
};
