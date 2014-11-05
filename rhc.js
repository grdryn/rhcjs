module.exports = function(params){
  return new rhc(params);
}

function rhc(params){
  if (!params.username || !params.password){
    throw new Error('Username and password are required');
  }
  
  this.username = params.username;
  this.password = params.password;
  this.domain = params.domain || getDomain(params.username);
  this.target = params.target || 'openshift.redhat.com';
  
  if (!this.domain){
    throw new Error('Error - could not determine domain. Specify using domain param.');
  }
  
  this.app = require('./lib/app')(this);
  this.ssh = require('./lib/ssh')(this);
}

rhc.prototype.apps = require('./lib/apps.js');


function getDomain(username){
  var rex = /.+@([^.]+).+/,
  match = username.match(rex);
  if (match.length === 2){
    return match[1];
  }
};