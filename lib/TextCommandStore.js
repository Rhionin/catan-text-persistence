var fs = require('fs'),
	path = require('path');

file_extension = '.json';
commands_file_path = path.resolve(path.join(__dirname, '..', 'data', 'commands' + file_extension));

/**
    The TextCommandStore class provides access to the Commands portion of a document storage object.
    <pre>

    Author: Team 10    

    Domain:
		file: A handle to the file
        
    Invariants:
        INVARIANT: TextCommandStore can always access (read and write) to the file

    Constructor Specification:
        PRE: A file exists and is readable and writeable at the provided location
        POST: TextCommandStore has a handler to the Commands portion of the file-based database
    </pre>

    @class TextCommandStore
    @constructor
*/
var TextCommandStore = (function() {

	function TextCommandStore()
	{
		// ensure the file exists and init it if not
		if (!fs.existsSync(commands_file_path))
		{
			fs.openSync(commands_file_path, 'w');
			fs.writeFileSync(commands_file_path, JSON.stringify({
				games: {}
			}, null, '\t'));
		}
	}

	/**
	Adds a command to the provided game's command list.
	<pre>
		PRE: gameId is a valid game in the database.
		POST: The command list for the specified game now has commandJson appended to the end.
	</pre>
	@method addCommand
	@param {Number} gameId The game id to be appended to in the database
	@param {String} commandJson The JSON representation of the command to add.
	@return {Number} Returns the id of the command after being added to the database
	*/
	TextCommandStore.prototype.addCommand = function(gameId, commandJson){
		var commands = getGameCommands(gameId);
		commands.push(commandJson);
		var index = commands.length - 1;
		
		// save this stuff
		writeCommandList(commands, gameId);

		return index;
	};

	/**
	Gets and returns all the commands for the specified game.
	<pre>
		PRE: gameId is a valid game ID in the database
		POST: The database has not been modified.
		POST: An array of that game's commands is returned.
	</pre>
	@method getCommands
	@param {Number} gameId Determines which game's commands should be returned from the database
	@return {List<String>} Returns an array of JSON-encoded commands.
	*/
	TextCommandStore.prototype.getCommands = function(gameId){
		var commands = getGameCommands(gameId);
		return commands;
	};

	function getGameCommands(gameId)
	{
		var commandsFile = getCommandsFile();
		var game = commandsFile[gameId];
		return (game && game.commands) || [];
	}

	function getCommandsFile() {
		var commandsFile = {};

		if(!fs.existsSync(commands_file_path))
		{
			commandsFile.games = {};
			fs.writeFileSync(commands_file_path, JSON.stringify(commandsFile, null, '\t'));
		}

		var fileContents = fs.readFileSync(commands_file_path, 'utf8');
		commandsFile = JSON.parse(fileContents);
		return commandsFile;
	}

	function writeCommandList(commands, gameId) {
		var commandsFile = getCommandsFile();
		commandsFile.games[gameId] = commands;
		fs.writeFileSync(commands_file_path, JSON.stringify(commandsFile, null, '\t'));
	}

	return TextCommandStore;
})();

exports.TextCommandStore = TextCommandStore;