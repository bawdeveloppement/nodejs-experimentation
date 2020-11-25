/**
 * @name Data
 * @version 1.0.0
 */

// Dependencies 
var fs = require("fs");
var path = require("path");

// Container for the module (To be exported)
var lib = {};

// Base directory of the data folder
lib.baseDir = path.join(__dirname, '/../.data/');

lib.create = function (dir, file, data, cb) {
    // Open the file for writing
    fs.open(lib.baseDir + dir + '/' + file + '.json', 'wx', function(err, fileDescriptor) {
        if (!err && fileDescriptor) {
            // Convert data to string
            var stringData = JSON.stringify(data);

            // Write to file and close it
            fs.writeFile(fileDescriptor, stringData, function (err){
                if (!err) {
                    fs.close(fileDescriptor, function(err) {
                        if (!err) {
                            cb(false)
                        } else {
                            cb('Error closing new file')
                        }
                    });
                } else {
                    cb('Error writing to new file');
                }
            })
        } else {
            cb('Could not create new file, it may already exist')
        }
    })
}

// Read data from file
lib.read = function (dir, file, cb) {
    fs.readFile(lib.baseDir+dir+'/'+file+'.json', 'utf-8', (err, data) => {
        cb(err, data)
    });
}

/**
 * @description Update data of a file
 * @param {string} dir fooDir
 * @param {string} file foo
 * @param {JSON} data { 'foo': 'bar' }
 * @param {Function} cb 
 */
lib.update = function (dir, file, data, cb) {
    // Open the file for writing
    fs.open(lib.baseDir+dir+'/'+file+'.json', 'r+', (err, fd) => {
        if (!err && fd) {
            let stringData = JSON.stringify(data);
            fs.ftruncate(fd, (err) => {
                if (!err) {
                    // Write to the file and close it
                    fs.writeFile(fd, stringData, (err) => {
                        if (!err) {
                            fs.close(fd, (err) => {
                                if (!err) {
                                    cb(false)
                                } else cb('Error closing existing file');
                            });
                        } else cb('Error writing existing file')
                    })
                }
                else cb('Error truncating file')
            })
        } else {
            cb('could not open the file for updating, it may not exist yet')
        }
    });
}

/**
 * @description Delete a file
 * @param {string} dir The name of the dir
 * @param {string} file Name of the target file
 * @param {Function} cb callback
 */
lib.delete = function (dir, file, cb) {
    fs.unlink(lib.baseDir+dir+'/'+file+'.json', (err) => {
        if (!err) {
            cb(false)
        } else {
            cb('Error deleting file')
        }
    })
}

module.exports = lib;