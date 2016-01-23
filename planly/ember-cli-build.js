/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

 app.import('bower_components/Materialize/dist/css/materialize.css');
 app.import('bower_components/Materialize/dist/js/materialize.js');
 app.import('bower_components/Materialize/dist/font/roboto/Roboto-Regular.eot');
 app.import('bower_components/Materialize/dist/font/roboto/Roboto-Regular.ttf');
 app.import('bower_components/Materialize/dist/font/roboto/Roboto-Regular.woff');
 app.import('bower_components/Materialize/dist/font/roboto/Roboto-Regular.woff2');
 app.import('bower_components/Materialize/dist/font/roboto/Roboto-Bold.eot');
 app.import('bower_components/Materialize/dist/font/roboto/Roboto-Bold.ttf');
 app.import('bower_components/Materialize/dist/font/roboto/Roboto-Bold.woff');
 app.import('bower_components/Materialize/dist/font/roboto/Roboto-Bold.woff2');
 app.import('bower_components/Materialize/dist/font/roboto/Roboto-Light.eot');
 app.import('bower_components/Materialize/dist/font/roboto/Roboto-Light.ttf');
 app.import('bower_components/Materialize/dist/font/roboto/Roboto-Light.woff');
 app.import('bower_components/Materialize/dist/font/roboto/Roboto-Light.woff2');
 app.import('bower_components/Materialize/dist/font/roboto/Roboto-Thin.eot');
 app.import('bower_components/Materialize/dist/font/roboto/Roboto-Thin.ttf');
 app.import('bower_components/Materialize/dist/font/roboto/Roboto-Thin.woff');
 app.import('bower_components/Materialize/dist/font/roboto/Roboto-Thin.woff2');
 

 app.import('bower_components/Materialize/dist/font/material-design-icons/Material-Design-Icons.eot');
 app.import('bower_components/Materialize/dist/font/material-design-icons/Material-Design-Icons.svg');
 app.import('bower_components/Materialize/dist/font/material-design-icons/Material-Design-Icons.ttf');
 app.import('bower_components/Materialize/dist/font/material-design-icons/Material-Design-Icons.woff');
 app.import('bower_components/Materialize/dist/font/material-design-icons/Material-Design-Icons.woff2');
 
  return app.toTree();
};
