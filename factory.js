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

    @class Deck
    @constructor    
*/

var _ = require("underscore"),
	commands = require("./lib/TextCommandStore"),
	game = require("./lib/TextGameStore"),
	user = require("./lib/TextUserStore");

var commandStore = new commands.TextCommandStore();
var gameStore = new game.TextGameStore();
var userStore = new user.TextUserStore();

_.extend(exports, {
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
	}
});