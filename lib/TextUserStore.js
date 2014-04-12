var _ = require('underscore'),
	fs = require('fs'),
	path = require('path');

file_extension = '.json';
users_file_path = path.resolve(path.join(__dirname, '..', 'data', 'users' + file_extension));

/**
    The TextUserStore class provides access to the Users portion of a document storage object.
    <pre>

    Author: Team 10    

    Domain:
		file: A handle to the file
        
    Invariants:
        INVARIANT: TextUserStore can always access (read and write) to the file

    Constructor Specification:
        PRE: A file exists and is readable and writeable at the provided location
        POST: TextUserStore has a handler to the Users portion of the file-based database
    </pre>

    @class RDBUserStore
    @constructor
*/
var TextUserStore = (function() {

	function TextUserStore(){
	}

	/**
	Adds a user to the database and returns the user's unique ID.
    <pre>
        PRE: The userName doesn't exist already in the database
		PRE: userName is a valid user name as defined in the specs
        PRE: password is a valid password as defined in the specs.
        POST: There is exactly one more user object represented in the database
        POST: The user has been added to the database with his or her corresponding password
        POST: The user's unique ID in the database is returned.
    </pre>
    @method addUser
	@param {String} userName The user name of the user to be added to the database
	@param {String} password The raw string value of the password.
	@return {Number}  Return the unique ID of the user just added.
    */
	TextUserStore.prototype.addUser = function(userName, password, callback){

		var that = this;
		this.canAddUser(userName, function(canAddUser) {

			if (!canAddUser)
				throw Error("User " + userName + " already exists.");

			that.getUserList(function(userList) {

				var userId = getNextUserId();
				userList.push({name:userName, password:password, playerID:userId});

				writeUserList(userList);

				callback(userId);
			});
		});
	};

	/**
	Deletes a user from the database.
    <pre>
        PRE: The 'id' is found in the database
        POST: The database contains exactly one less User entry than before.
        POST: The user with 'id' no longer is in the database.
    </pre>
    @method deleteUser
	@param {Number} id The unique ID of the user to delete from the database
    */
	TextUserStore.prototype.deleteUser = function(id, callback){
		this.getUserList(function(userList) {
			var updatedList = _.without(userList,  _.findWhere(userList, {playerID: id}));
			writeUserList(updatedList);

			var removedCt = (userList.length - updatedList.length);
			callback(removedCt);
		});
	};

	/**
	Returns the JSON representation of a user from the database with a given username
    <pre>
        PRE: 'name' is a valid user name in the database
        POST: Returns exactly 1 result that matches the name
    </pre>
    @method getUserByName
	@param {String} name The user name of the user you are retrieving
    @return {String} Returns the JSON representation of that user.
    */
	TextUserStore.prototype.getUserByName = function(name, callback){
		this.getUserList(function(userList) {
			var user = _.find(userList, function(user) {
				return user.name == name;
			});

			callback(user);
		});
	};

	/**
	Returns JSON representation of all of the users from the database
	<pre>
		PRE: None
		POST: Returns all users from the database
	</pre>
	@method getUserList
	*/
	TextUserStore.prototype.getUserList = function(callback) {
		var usersFile = getUsersFile();
		callback(usersFile.users);
	};

	/**
	Determines and returns whether a given username can be added to the database
	<pre>
		PRE: None
		POST: Returns true iff the user can be added to the database (the user name doesn't already exist)
	</pre>
	@method canAddUser
	@param {String} user The user name to look for in the database
	@return {Boolean} Returns whether or not the user can be added to the database
	*/
	TextUserStore.prototype.canAddUser = function(user, callback){
		
		this.getUserByName(user, function(user) {
			callback(user === undefined);
		});
	};

	/**
	Determines and returns the next available unique Id
	<pre>
		PRE: None
		POST: Always returns the next number to be used as an ID
	</pre>
	@method getNextUserId
	@return {Number} Returns the next available unique, numerical ID
	*/
	function getNextUserId() {
		var usersFile = getUsersFile();

		var nextId = usersFile.nextId++;
		fs.writeFileSync(users_file_path, JSON.stringify(usersFile, null, '\t'));
		
		return nextId;
	}

	/** 
	Gets and returns an object representation of the file containing the Users information
	<pre>
		PRE: A valid path file has been set
		POST: A valid object from that file is returned.
	</pre>
	@method getUsersFile
	@return {String} Returns the JSON representation of the file database.
	*/
	function getUsersFile() {
		var usersFile = {};

		if(!fs.existsSync(users_file_path))
		{
			usersFile.nextId = 0;
			usersFile.users = [];
			fs.writeFileSync(users_file_path, JSON.stringify(usersFile, null, '\t'));
		}

		var listJson = fs.readFileSync(users_file_path, 'utf8');
		usersFile = JSON.parse(listJson);
		return usersFile;
	}

	/**
	Saves the database by writing out the userList to the file.
	<pre>
		PRE: None
		POST: The users in the database has been replaced with userList
	</pre>
	@method writeUserList
	@param {String} userList The JSON representation of a list of users to be saved to the database.
	*/
	function writeUserList(userList) {
		var usersFile = getUsersFile();
		usersFile.users = userList;
		fs.writeFileSync(users_file_path, JSON.stringify(usersFile, null, '\t'));
	}

	return TextUserStore;
})();

exports.TextUserStore = TextUserStore;