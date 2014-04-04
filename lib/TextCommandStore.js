

var TextCommandStore = (function() {

	function TextCommandStore(){
	}

	TextCommandStore.prototype.addCommand = function(gameId, commandJson){
		this.startTransaction();
		
		//Append command to proper game's command list
		var commandId = null;

		this.endTransaction();

		return commandId;
	}

	TextCommandStore.prototype.getCommands = function(gameId){
		var commands = [];
		//fill commands array with JSON commands from DB for given game

		return commands;
	}

	return TextCommandStore;
})();

exports.TextCommandStore = TextCommandStore;