var fs = require('fs');
var path = require('path');
var process = require('process');

var traverse = function(directory, installationDir) {
	fs.readdir(directory, function(err, files) {

		if( err ) {
			console.error("Could not list the directory: ", err);
			process.exit(1);
		}

		files.forEach(function(file, index) {

			var filename = path.join(directory, file);

			fs.stat(filename, function(error, stat) {

				if (error) {
					console.error("Error stating file: ", error);
					return;
				}

				if(stat.isFile()) {

					console.log("'%s' is a file.", filename);

					if( !file.startsWith('.') && ( file.endsWith('.otf') || file.endsWith('.ttf') ) )
						fs.createReadStream(filename).pipe(fs.createWriteStream(path.join(installationDir, file)));

				} else if(stat.isDirectory()) {

					console.log("'%s' is a directory.", filename);
					if( !file.startsWith('.') ) traverse(filename, installationDir);

				}

			});

		});

	});
};

exports.traverse = traverse;
