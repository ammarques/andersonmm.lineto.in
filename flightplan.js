var flightname = "lineto";
var plan = require('flightplan');
var data = new Date();

var pswd = transport.prompt('Enter your password:', { hidden: true });

plan.target('production', {
  host: '80.209.252.64',
  username: 'root',
  password:pswd,
  agent: process.env.SSH_AUTH_SOCK
});

var tmpDir = 'lineto_' + data.getMonth() + data.getDay() + data.getFullYear() + data.getTime();

plan.remote(function(remote) {
	remote.with('cd /var/www/html/', function() {
		remote.failsafe();
		remote.exec('mv lineto ' + tmpDir);
		remote.unsafe();
		remote.exec('git clone -b production https://amarques:kinonotabi@bitbucket.org/ammarques/andersonmm.lineto.in.git /var/www/html/lineto', {user: 'root'});
	});
});