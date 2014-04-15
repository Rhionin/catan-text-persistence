var assert = require("assert"),
	fs = require('fs-extra'),
	rmdir = require('rimraf'),
	factory = require('../factory'),
	commandDAO = require("../lib/TextCommandStore"),
	gameDAO = require("../lib/TextGameStore"),
	userDAO = require("../lib/TextUserStore");

describe("Factory module", function() {

	it("gets Game DAO", function() {
		var DAO = factory.getGameStore();
		assert.ok( (DAO instanceof gameDAO.TextGameStore),
			"Game DAO should be a " + typeof gameDAO.TextGameStore + ", but is a " + typeof DAO);
	});

	it("gets User DAO", function() {
		var DAO = factory.getUserStore();
		assert.ok( (DAO instanceof userDAO.TextUserStore),
			"User DAO should be a " + typeof userDAO.TextUserStore + ", but is a " + typeof DAO);
	});

	it("gets Command DAO", function() {
		var DAO = factory.getCommandStore();
		assert.ok( (DAO instanceof commandDAO.TextCommandStore),
			"Command DAO should be a " + typeof commandDAO.TextCommandStore + ", but is a " + typeof DAO);
	});
});