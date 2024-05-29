const path = require('path');
const glob = require('glob');
const uglifyjs = require('uglify-js');



















const fs = require('fs');
const ftp = require('ftp');

const ftpConfig = {
    host: 'ftp.cartmade.com',
    port: 21, // Default FTP port
    user: 'cartmade',
    password: '6@wyxSLWC]M?'
};




var files = glob.sync('./../js/**/*.js');

var files = files.map((file) => {
  return './' + file;
});

function readFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

async function concatenateFiles(filePaths) {

  const filePath = `./prod/bundled.js`;
  try {
    const fileContents = await Promise.all(filePaths.map(filePath => readFile(filePath)));
    const concatenatedContent = fileContents.join('\n');
    fs.writeFile(filePath, concatenatedContent, 'utf8', (error) => {
      if (error) {
        console.error('Error writing file:', error);
      } else {
       console.log('Files concatenated successfully!');
			const originalCode = fs.readFileSync('./prod/bundled.js', 'utf8');

			const minifiedCode = uglifyjs.minify(originalCode, { compress: true, mangle: false });

			// fs.writeFileSync(filePath, minifiedCode.code, 'utf8');


      const fileToUpload = filePath; // Replace with the path to your file
      const remoteFilePath = '/apps.cartmade.com/arjun/rudys/index.js'; // Replace with the path on the FTP server

      const client = new ftp();

      client.on('ready', () => {
          client.put(fileToUpload, remoteFilePath, (err) => {
              if (err) {
                  console.error('Error uploading file:', err);
              } else {
                  console.log('File uploaded successfully');
              }
              client.end(); // Close the FTP connection
          });
      });

      client.connect(ftpConfig);


      }
    });
  } catch (error) {
    console.error('Error reading file:', error);
  }
}

concatenateFiles(files);