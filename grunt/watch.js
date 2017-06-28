module.exports = function (grunt) {

    var watch = {
        test: {
            files: [
                'typescript/dist/**/*.js',
            ],
            tasks: [
                'mochaTest:watch'
            ],
            options: {
                nospawn: true
            }
        }

    };
    return watch;
};
