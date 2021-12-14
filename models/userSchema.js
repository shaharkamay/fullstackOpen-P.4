const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	name: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true,
	},
	blogs: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Blog",
		}
	],

});

UserSchema.set("toJSON", {
	transform: (_, returnedObject) => {
		returnedObject.id = (returnedObject._id.toString());
		delete returnedObject._id;
		delete returnedObject.__v;
		delete returnedObject.password;
	},
});

const User = mongoose.model('User', UserSchema);
module.exports = User;