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

    var user = defaults.user;
    var group = defaults.group;

    var statsDev = defaults.stats.dev;
    var statsRdev = defaults.stats.rdev;
    var statsUid = defaults.stats.uid;
    var statsGid = defaults.stats.gid;
    var statsBlksize = defaults.stats.blksize;

    return{
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
