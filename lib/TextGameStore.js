var fs = require('fs'),
	path = require('path');
	// ServerModelClass = require('../../models/server_model.js');

file_extension = '.json';
model_folder = path.join('./dal', './text', './json_data', '/models');

/**
    The TextGameStore class is returned by TextPersistenceFactory and follows the IGameStore convention (interface)  
    <pre>

    Domain: None
      
    Invariants:
        INVARIANT: None
    
    Constructor Specification:
    	PRE: None
    	POST: None
    </pre>

    @class TextGameStore
    @constructor
    
	*/
var TextGameStore = (function() {

	function TextGameStore(){
	}

	
	/**
    Returns modelId, the index where the model is stored  
    gameId is optional. If specified, a checkpoint will be added instead of a new model

    @method addModel
    @param {String} modelJson
    @param {int} gameId
    @return {int} The index of the new model 
    
	*/
	TextGameStore.prototype.addModel = function(modelJson, gameId) {
		/* REFACTOR
		var files = fs.readdirSync(model_folder);
		name = ("00"+(files.length - 1)).slice(-4);

		file_name = path.join(model_folder, name + file_extension);

		fs.writeFileSync(file_name, JSON.stringify(modelJson, null, "\t")); 
		*/

		return id;
	}

	/**
    Returns the game model specified by gameId

    @method getModel
    @param {int} gameId
    @return {ServerModel} The game model specified
    
	*/
	TextGameStore.prototype.getModel = function(gameId) {
	 	/* REFACTOR
	 	file_name = getModelFileName(name);

	 	var modelJson = null;
	 	if(fs.existsSync(file_name))
	    {
	    	var modelJson = fs.readFileSync(file_name, 'utf8');
	    }
		*/
       	return modelJson;
	}

	/**
    Removes the model specified by id from the text file

    @method removeModel
    @param {int} id
    @return void
    
	*/
	TextGameStore.prototype.removeModel = function(id) {
		/* REFACTOR
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
		*/
	}

	/**
    Returns a game model from the last checkpoint

    @method getCheckpoint
    @param {int} id
    @return {String} the game model JSON of the last checkpoint
    
	*/
	TextGameStore.prototype.getCheckpoint = function(id)
	{
		var modelJson = null;

		return modelJson;
	}

	/**
    Loads game models into memory from the text file

    @method initialize
    @return {ServerModel[]} An array of game models
    
	*/
	TextGameStore.prototype.initialize = function() {
		/* REFACTOR
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
		*/
		return models
	}

	/**
    Returns the full file path of the given file name

    @method getModelFileName
    @return {String} The full file path of the given file name
    
	*/
	function getModelFileName(name) {
		return path.join(model_folder, name + file_extension);
	}

	return TextGameStore;
})();

exports.TextGameStore = TextGameStore;