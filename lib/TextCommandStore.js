
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

	function TextCommandStore(){
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
		this.startTransaction();
		
		//Append command to proper game's command list
		var commandId = null;

		return commandId;
	}

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
		var commands = [];
		//fill commands array with JSON commands from DB for given game

		return commands;
	}

	return TextCommandStore;
})();

exports.TextCommandStore = TextCommandStore;