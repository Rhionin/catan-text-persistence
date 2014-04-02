var fs = require('fs'),
	path = require('path'),
	ServerModelClass = require('../../models/server_model.js');

file_extension = '.json';
model_folder = path.join('./dal', './text', './json_data', '/models');

var TextGameStore = (function() {

	function TextGameStore(){
	}

	TextGameStore.prototype.addModel = function(model) {
		var modelJson = model.toJSON();
		var files = fs.readdirSync(model_folder);
		name = ("00"+(files.length - 1)).slice(-4);

		file_name = path.join(model_folder, name + file_extension);

		fs.writeFileSync(file_name, JSON.stringify(modelJson, null, "\t")); 
	}

	TextGameStore.prototype.getModel = function(name) {
	 	file_name = getModelFileName(name);

	 	var model = null;
	 	if(fs.existsSync(file_name))
	    {
	    	var modelJson = fs.readFileSync(file_name, 'utf8');
	    	model = new ServerModelClass.ServerModel();
	    	model.fromJSON(modelJson);
	    }

       	return model;
	}

	TextGameStore.prototype.removeModel = function(name) {
		file_name = getModelFileName(name);
		fs.exists(file_name, function(exists) {
			if (exists)
			{
				fs.unlink(file_name);
				console.log("File deleted: " + file_name);
			}
			else
			{
				console.log("File not found: " + file_name);
			}
		});
	}

	TextGameStore.prototype.initialize = function() {
		console.log("\nINITIALIZING DATA STORE");
		var models = [];
		files = fs.readdirSync(model_folder);

		var filesLoaded = [];
		files.forEach(function(file_name) {

			// skip system files
			if (file_name.substr(0, 1) == '.')
			{
				return;
			}

			filesLoaded.push(file_name);
			file_path = path.resolve(model_folder, file_name);
			name = path.basename(file_name, file_extension);
			modelJson = require(file_path);
			model = new ServerModelClass.ServerModel();
			model.fromJSON(modelJson);
			model.title = modelJson.title;
			models.push(model);
		});

		console.log("Model files loaded:", filesLoaded);

		return models
	}

	function getModelFileName(name) {
		return path.join(model_folder, name + file_extension);
	}

	return TextGameStore;
})();

exports.TextGameStore = TextGameStore;