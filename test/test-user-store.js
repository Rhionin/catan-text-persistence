var assert = require('assert');
var TextUserStore = require('../lib/TextUserStore.js');
var fs = require('fs');
var _ = require('underscore');

describe("Text User Store", function() {
	var name = "TestUser";
	var password = "Password";
	var userFilePath = "./test/tmp_users.json";
	var userStore;

	beforeEach(function(done) {
		userStore = new TextUserStore.TextUserStore(userFilePath);
		done();
	});

	afterEach(function(done) {
		fs.unlink(userFilePath, done);
	});

	it('Add/Get/Delete a user', function(done) {
		userStore.addUser(name, password, function(id){
			userStore.getUserByName(name, function(user){

				assert.equal(user.name, name, "GetUserByName: incorrect name. Expected '" + name + "', got '" + user.name + "'");
				assert.equal(user.password, password, "GetUserByName: incorrect password. Expected '" + password + "', got '" + user.password + "'");
				userStore.deleteUser(id, function(changes){
					assert.equal(changes, 1, "DeleteUser: Expected 1 change, got " + changes);
					done();
				});
			});
		});
	});
});
