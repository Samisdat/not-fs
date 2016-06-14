'use strict';

var defaultOptions = {
    user: process.getuid(),
    group: process.getgid(),   
    stats:{
        dev: 51,
        rdev: 0,
        uid: process.getuid(),
        gid: process.getgid(),
        blksize: 4096        
    } 
};

var options = (function(defaults) {

    var user;
    var group;

    var statsDev;
    var statsRdev;
    var statsUid;
    var statsGid;
    var statsBlksize;

    var setDefaults = function(){

        user = defaults.user;
        group = defaults.group;

        statsDev = defaults.stats.dev;
        statsRdev = defaults.stats.rdev;
        statsUid = defaults.stats.uid;
        statsGid = defaults.stats.gid;
        statsBlksize = defaults.stats.blksize;

    };

    setDefaults();

    return{
        setDefaults:setDefaults, 
        getUser(){
            return user;
        },
        setUser(_user){
            user = _user;
        },
        getGroup(){
            return group;
        },
        setGroup(_group){
            group = _group;
        },
        getStatsDev(){
            return statsDev;
        },
        setStatsDev(_dev){
            statsDev = _dev;
        },
        getStatsRdev(){
            return statsRdev;
        },
        setStatsRdev(_rdev){
            statsRdev = _rdev;
        },
        getStatsUid(){
            return statsUid;
        },
        setStatsUid(_uid){
            statsUid = _uid;
        },
        getStatsGid(){
            return statsGid;
        },
        setStatsGid(_gid){
            statsGid = _gid;
        },
        getStatsBlksize(){
            return statsBlksize;
        },
        setStatsBlksize(_blksize){
            statsBlksize = _blksize;
        }
    };
})(defaultOptions);

module.exports = options;
