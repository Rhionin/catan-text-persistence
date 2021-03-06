/**
    A factory for the text based DAO classes
    <pre>

    Domain:
        commands {TextCommandStore}
        game {TextGameStore}
        user {TextUserStore}

    Invariants:
        INVARIANT: none

    Constructor Specification:
        PRE: none
        POST: none
    </pre>

    @class Textfactory
    @constructor    
*/

var _ = require("underscore"),
	rmdir = require('rimraf'),
	path = require('path'),
	fs = require('fs-extra'),
	commands = require("./lib/TextCommandStore"),
	game = require("./lib/TextGameStore"),
	user = require("./lib/TextUserStore");

var commandStore = new commands.TextCommandStore();
var gameStore = new game.TextGameStore();
var userStore = new user.TextUserStore();

var dataFolder = path.resolve(__dirname + '/data');

_.extend(exports, {
	dataFolder: dataFolder,

	/**
	 * [returns an instance of the text persistence command DAO]
	 * <pre>

	    Domain: None
	      
	    Invariants:
	        INVARIANT: None
	    
	    	PRE: None
	    	POST: a valid commandStore is returned
	    </pre>
	 * @method getCommandStore
	 * @return {TextCommandStore}
	 */
	getCommandStore: function()
	{
		return commandStore;
	},
	/**
	 * [returns an instance of the text persistence game DAO]
	 *
	 * 	    Domain: None
	      
	    Invariants:
	        INVARIANT: None
	    
	    	PRE: None
	    	POST: a valid gameStore is returned
	    </pre>
	 * @method getGameStore
	 * @return {TextGameStore}
	 */
	getGameStore: function()
	{
		return gameStore;
	},
	/**
	 * [returns an instance of the text persistence user DAO]
	 *
	 * 	    Domain: None
	      
	    Invariants:
	        INVARIANT: None
	    
	    	PRE: None
	    	POST: a valid userStore is returned
	    </pre>
	 * @method getUserStore
	 * @return {TextUserStore}
	 */
	getUserStore: function()
	{
		return userStore;
	},
	/**
	 * [wipes all data from the text persistence store]
	 *
	 * 	    Domain: None
	      
	    Invariants:
	        INVARIANT: None
	    
	    	PRE: None
	    	POST: All persistent user, command and game data is erased.
	    </pre>
	 * @method clean
	 */
 	clean: function(done)
	{
		rmdir(dataFolder, function(err) {
			if(err)
			{
				console.log(err);
			}
			else
			{
				console.log("Persistent text data cleared");
				fs.mkdir(dataFolder);
			}

			done();
		});
	}
});