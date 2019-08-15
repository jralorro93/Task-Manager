const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("Password can't include the word password");
      }
    }
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be a positive number");
      }
    }
  },
  tokens: [{
    token: {
      type: String,
      required:true
    }
  }]
})

//Virtual Property, is a relationship between user and task.
userSchema.virtual('tasks', {
  ref: 'Task',
  //Relationship between task and owner.
  //_id is the local field b/c _id of the owner belongs in the database
  localField: '_id',
  foreignField: 'owner'
})

// _.methods.nameOfInstanceMethod generates an instance method
userSchema.methods.generateAuthToken = async function () {
  const user = this
  //In token, we need to change the value of the _id key to a string, because that is what json is expecting
  const token = jwt.sign({ _id: user._id.toString() }, 'thisIsTokenSecret')
  //Concats jwt token to user
  user.tokens = user.tokens.concat({token})
  console.log(token)
  await user.save()

  //Return value = token
  return token
}

//Hides private data, such as password and tokens array
userSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()

  delete userObject.password
  delete userObject.tokens

  return userObject
}

// _.statics.nameOfClassMethod generates a class method
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({email})

  if (!user) {
    throw new Error('Unable to login')
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    throw new Error('Unable to login')
  }
  return user
}


//Has the plain text password before saving
userSchema.pre('save', async function (next) {
  const user = this

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }

  next()
})

const User = mongoose.model("User", userSchema);

module.exports = User;