var fs = require('fs'),
	path = require('path');

file_extension = '.json';
data_folder = path.join('./dal', './text', './json_data');
users_file_path = path.join(data_folder, 'users' + file_extension);

var TextUserStore = (function() {

	function TextUserStore(){
	}

	TextUserStore.prototype.addUser = function(userName, password){
		if(!this.canAddUser(userName))
			throw Error("User " + userName + " already exists.");

		var userList = this.getUserList();
		var userId = getNextUserId();
		userList.push({name:userName, password:password, playerID:userId});

		writeUserList(userList);

		return userId;
	}

	TextUserStore.prototype.deleteUser = function(id){
		userList = this.getUserList();
		//delete user
	}

	TextUserStore.prototype.getUserByName = function(name){
		var userList = this.getUserList();
		for (var index in userList)
		{
			var user = userList[index];
			if(user.name == name)
			{
				return user;
			}
		}

		return null;
	}

	TextUserStore.prototype.getUserList = function() {
		var usersFile = getUsersFile();
		return usersFile.users;
	}

	TextUserStore.prototype.canAddUser = function(user){
		var user = this.getUserByName(user);
		return (user == null);
	}

	function getNextUserId() {
		var usersFile = getUsersFile();

		var nextId = usersFile.nextId++;
		fs.writeFileSync(users_file_path, JSON.stringify(usersFile, null, '\t'));
		
		return nextId;
	}

	function getUsersFile() {
		if(!fs.existsSync(users_file_path))
		{
			var usersFile = {};
			usersFile.nextId = 0;
			usersFile.users = [];
			fs.writeFileSync(users_file_path, JSON.stringify(usersFile, null, '\t'));
		}

		var listJson = fs.readFileSync(users_file_path, 'utf8');
		var usersFile = JSON.parse(listJson);
		return usersFile;
	}

	function writeUserList(userList) {
		var usersFile = getUsersFile();
		usersFile.users = userList;
		fs.writeFileSync(users_file_path, JSON.stringify(usersFile, null, '\t'));
	}

	return TextUserStore;
})();

exports.TextUserStore = TextUserStore;