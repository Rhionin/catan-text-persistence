var _ = require('underscore'),
	fs = require('fs-extra'),
	assert = require('assert'),
	TextGameStore = require('../lib/TextGameStore.js');

describe("Text Game Store", function() {
	var gameFilePath = "./test/tmp_games.json";

	var sampleId;
	var sampleTitle;
	var sampleModel;
	var sampleGame;

	var gameStore;

	beforeEach(function(done) {
		gameStore = new TextGameStore.TextGameStore(gameFilePath);

		sampleId = 0;
		sampleTitle = "Test Game";
		sampleModel = {some:"stuff", goes:"here"};
		sampleGame = {id:sampleId, title:sampleTitle, model:sampleModel};

		done();
	});

	afterEach(function(done) {
		fs.unlink(gameFilePath, done);
	});

	it('adds, gets and removes a game', function(done) {
		gameStore.addGame(sampleGame, function(id){
			assert.equal(id, sampleId, "getGame: incorrect id. Expected '" + sampleId + "', got '" + id + "'");
			
			gameStore.getGame(id, true, function(game){
				assert.equal(game.id, id, "getGame: incorrect id. Expected '" + id + "', got '" + game.id + "'");
				assert.equal(game.title, sampleTitle, "getGame: incorrect title. Expected '" + sampleTitle + "', got '" + game.title + "'");
				assert.deepEqual(game.model.some, "stuff", "getGame: incorrect model contents.\nExpected: " + sampleModel + "\nActual: " + game.model);
				
				gameStore.removeGame(id, function(changes) {
					assert.equal(changes, 1, "removeGame: Expected 1 change, got " + changes);
					done();
				});
			});
		});
	});

	it('updates a game in the database', function(done) {
		var updatedTitle = "Updated Title";
		var updatedModel = {some:"Updated some field", goes:"Updated goes field"};
		var updatedGame = {id:sampleId, title:updatedTitle, model:updatedModel};

		gameStore.addGame(sampleGame, function(id){

			gameStore.updateGame(updatedGame, function(changes){
				assert.equal(changes, 1, "updateGame: Expected 1 change, got " + changes);

				gameStore.getGame(id, true, function(game){
					assert.equal(game.id, sampleId, "getGame: incorrect id");
					assert.equal(game.title, updatedTitle, "getGame: incorrect title");
					assert.deepEqual(game.model, updatedModel, "getGame: incorrect model");

					done();
				});
			});
		});
	});
/*
	it('adds a checkpoint', function(done) {

		var gameStore = new TextGameStore.TextGameStore(database, tableName, checkpointTable);

		gameStore.addGame({id:0,title:"hello",model:sampleModel}, function(id){
			gameStore.addCheckpoint(id, {id:0,title:"checkpoint1",model:sampleModel}, function(checkpointId){

				assert.equal(typeof checkpointId, "number");

				gameStore.removeGame(id, function(){
					gameStore.close();
					done();	
				});
			});
		});

	});

	it('gets a checkpoint', function(done) {

		var gameStore = new TextGameStore.TextGameStore(database, tableName, checkpointTable);

		gameStore.addGame({id:0,title:"hello",model:sampleModel}, function(id){
			gameStore.addCheckpoint(id, {id:0,title:"checkpoint1",model:sampleModel}, function(checkid){
				gameStore.addCheckpoint(id, {id:0,title:"checkpoint2",model:sampleModel}, function(checkid2){
					gameStore.getCheckpoint(id, function(checkpoint){
						assert.equal(checkpoint.title, "checkpoint2");
						gameStore.removeGame(id, function(){
							gameStore.close();
							done();	
						});
					});
				});
			});
		});

	});

	it('initializes with no games', function(done) {

		var gameStore = new TextGameStore.TextGameStore(database, tableName, checkpointTable);
		gameStore.setLogging(false);

		gameStore.initialize(function(models){

			assert.equal(models.length, 0);
			gameStore.close();
			done();
		});

	});

	it('initializes with games', function(done) {

		var gameStore = new TextGameStore.TextGameStore(database, tableName, checkpointTable);
		gameStore.setLogging(false);

		gameStore.addGame({id:0,title:"Game1",model:sampleModel}, function(id){

			var id1 = id;

			gameStore.addGame({id:1,title:"Game2",model:sampleModel}, function(id){

				var id2 = id;

				gameStore.initialize(function(models){

					assert.equal(models.length, 2);
					assert.equal(models[0].title, "Game1");
					assert.equal(models[1].title, "Game2");

					gameStore.removeGame(id1, function(){
						gameStore.removeGame(id2, function(){
							gameStore.close();
							done();
						});
					});

				});
			});
		});
	});*/
});
