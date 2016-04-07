var stats = {
  dev: 51,
  uid: process.getuid(),
  gid: process.getgid(),
  rdev: 0,
  blksize: 4096
};

var notFsDefaults = {
    stats: stats
};


module.exports = notFsDefaults;