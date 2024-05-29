/**

This file watches any changes made in  the files inside 
the folder './src'

Whenever the file change is detected, all the files are bundled 
automatically,  no any manual intervention is necessary

script: node watcher.js

*/

const chokidar = require('chokidar');

const { spawn } = require('child_process');

const watcher = chokidar.watch('./../js/**/*.js'); // your javascript folder

watcher.on('change', (path) => {
  //console.log(`File changed: ${path}`);
  runMainFile();
});

function runMainFile() {
  const childProcess = spawn('node', ['bundle.js']);

  childProcess.stdout.on('data', (data) => {
    console.log(`Output: ${data}`);
  });

  childProcess.stderr.on('data', (data) => {
    console.error(`Error: ${data}`);
  });

  childProcess.on('close', (code) => {
    console.log(`Child process exited with code ${code}`);
  });
}