'use strict';

var fs   = require('fs');
var path = require('path');

var GitUtils = function(options) {
  this.project = options.project;
};

GitUtils.prototype.hash = function() {
  var rootPath       = this.project.root;
  var gitPath        = path.join(rootPath, '.git');
  var headFilePath   = path.join(gitPath, 'HEAD');

  try {
    if (fs.existsSync(headFilePath)) {
      var branchSHA;
      var headFile = fs.readFileSync(headFilePath, {encoding: 'utf8'});
      var refPath = headFile.split(' ')[1];

      if (refPath) {
        var branchPath = path.join(gitPath, refPath.trim());
        branchSHA  = fs.readFileSync(branchPath);
        return branchSHA.toString().slice(0, 10);
      }
    }
  } catch (err) {
    console.error(err.stack);
  }
};

GitUtils.prototype.branch = function() {
  var rootPath       = this.project.root;
  var gitPath        = path.join(rootPath, '.git');
  var headFilePath   = path.join(gitPath, 'HEAD');

  try {
    if (fs.existsSync(headFilePath)) {
      var headFile = fs.readFileSync(headFilePath, {encoding: 'utf8'});
      var parts = headFile.split('/');

      if (parts.length > 1) {
        var branchName = parts.slice(-1)[0].trim();

        return branchName;
      }
    }
  } catch (err) {
    console.error(err.stack);
  }
};

module.exports = GitUtils;
