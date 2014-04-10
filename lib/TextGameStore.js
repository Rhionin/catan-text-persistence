var fs = require('fs'),
	path = require('path');

file_extension = '.json';
games_file = path.resolve(path.join('../data', '/games' + file_extension));

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
	TextGameStore.prototype.addGame = function(gameJson) {
		var id = getNextGameId();
		this.updateGame(gameJson, id);
		return id;
	};

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
		console.log("\nINITIALIZING DATA STORE");
		var gamesFile = require(games_file);
		var gamesList = gamesFile.games;
		return JSON.stringify(gamesList);
	}

	function getNextGameId() {
		var gamesFile = getGamesFile();
//
		var nextId = gamesFile.nextId++;
		fs.writeFileSync(games_file, JSON.stringify(gamesFile, null, '\t'));
		
		return nextId;
	}

	function getGamesFile() {
		if(!fs.existsSync(games_file))
		{
			var gamesFile = {};
			gamesFile.nextId = 0;
			gamesFile.games = [];
			fs.writeFileSync(games_file, JSON.stringify(gamesFile, null, '\t'));
		}

		var listJson = fs.readFileSync(games_file, 'utf8');
		var gamesFile = JSON.parse(listJson);
		return gamesFile;
	}

	function writeGameList(gameList) {
		var gamesFile = getGamesFile();
		gamesFile.games = gameList;
		fs.writeFileSync(games_file, JSON.stringify(gamesFile, null, '\t'));
	}

	return TextGameStore;
})();

exports.TextGameStore = TextGameStore;