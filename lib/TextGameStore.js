var _ = require('underscore'),
	fs = require('fs'),
	path = require('path');

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

	var file_extension = '.json';
	var games_file = path.resolve(path.join(__dirname, '..', 'data', '/games' + file_extension));

	function TextGameStore(file_path){
		games_file = (file_path ? path.resolve(file_path) : games_file);
	}

	/**
    Returns gameId

    @method addGame
    @param {String} gameJson
    @return {int} The id of the new game 
    
	*/
	TextGameStore.prototype.addGame = function(gameJson, callback) {
		var id = getNextGameId();
		var gameData = {
			"id": id,
			"title": gameJson.title,
			"checkpoints": [gameJson.model]
		};
		writeGame(gameData, id);

		callback(id);
	};

	/**
    Replaces the latest checkpoint of the game specified by gameId

    @method updateGame
    @param {String} gameJson
    @param {int} gameId
    @return {int} the gameId
    
	*/
	TextGameStore.prototype.updateGame = function(gameJson, callback) {
		var gamesFile = getGamesFile();
		var games = gamesFile.games;
		var id = gameJson.id;
		var game = games[id];

		var lastIndex = game.checkpoints.length - 1;
		game.checkpoints[lastIndex] = gameJson.model;			

		writeGameList(games);

		callback(id);
	};

	/**
    Returns the game specified by gameId

    @method getGame
    @param {int} gameId
    @param {boolean} getOriginalModel returns first checkpoint if true, otherwise returns latest checkpoint
    @return {string} JSON representation of the game
    
	*/
	TextGameStore.prototype.getGame = function(gameId, getOriginalModel, callback) {
		var gamesFile = getGamesFile();
		var gameData = gamesFile.games[gameId];

		var checkpointIndex = ( getOriginalModel ? 0 : gameData.checkpoints.length - 1);
		var gameJson = {
			"id": gameData.id,
			"title": gameData.title,
			"model": gameData.checkpoints[checkpointIndex]
		};

		callback(gameJson);
	};

	/**
    Removes the game specified by id from the text file

    @method removeGame
    @param {int} id
    @return void
    
	*/
	TextGameStore.prototype.removeGame = function(id, callback) {
		writeGame(null, id);
		callback(1);
	};

	/**
    Sets a new checkpoint for the given gameId

    @method getCheckpoint
    @param {int} gameId
    @return {int} the checkpoint index for the given gameId
    
	*/
	TextGameStore.prototype.addCheckpoint = function(gameId) {
		var index = null;

		return index;
	};

	/**
    Loads games into memory from the text file

    @method initialize
    @return {string} JSON representing an array of games 
    
	*/
	TextGameStore.prototype.initialize = function(callback) {
		console.log("\nINITIALIZING DATA STORE");
		var gamesFile = require(games_file);
		var gamesList = gamesFile.games;
		
		var that = this;
		var resultList = [];
		_.each(gamesList, function(game) {
			var checkpointGame = that.getGame(game.id);
			resultList[game.id] = checkpointGame;
		});

		callback(resultList);
	};

	function getNextGameId() {
		var gamesFile = getGamesFile();
		var nextId = gamesFile.nextId++;
		fs.writeFileSync(games_file, JSON.stringify(gamesFile, null, '\t'));
		
		return nextId;
	}

	function getGamesFile() {
		var gamesFile = {};

		if(!fs.existsSync(games_file))
		{
			gamesFile.nextId = 0;
			gamesFile.games = [];
			fs.writeFileSync(games_file, JSON.stringify(gamesFile, null, '\t'));
		}

		var listJson = fs.readFileSync(games_file, 'utf8');
		gamesFile = JSON.parse(listJson);
		return gamesFile;
	}

	function writeGameList(gameList) {
		var gamesFile = getGamesFile();
		gamesFile.games = gameList;
		fs.writeFileSync(games_file, JSON.stringify(gamesFile, null, '\t'));
	}

	function writeGame(gameData, gameId)
	{
		var gamesFile = getGamesFile();
		var gameList = gamesFile.games;
		gameList[gameId] = gameData;
		writeGameList(gameList);
	}

	return TextGameStore;
})();

exports.TextGameStore = TextGameStore;