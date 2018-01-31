var fs = require('fs');

function renameFile( tempFile, filePath, fileName ) {
  return new Promise( function (resolve, reject) {
    fs.rename(tempFile, filePath + fileName, function (err) {
      if (err) {
        reject(err);
        console.error(err);
        return;
      }
      resolve(filePath + fileName);
    })
  });
}

module.exports = function save(tempFile, filePath, fileName) {
  return new Promise(function (resolve, reject) {
    var stats;

    try {
      stats = fs.lstatSync( filePath );

      if ( stats && stats.isDirectory() ) {
        resolve( renameFile(tempFile, filePath, fileName) );
      } else {
        reject( new Error('Error: ' + JSON.stringify(stats)) );
      }

    } catch (e) {

      fs.mkdir(filePath, function (err) {
        if (err) {
          reject(err);
          console.error(err);
          return;
        }

        resolve( renameFile(tempFile, filePath, fileName) );
      })
    }

  });
};


