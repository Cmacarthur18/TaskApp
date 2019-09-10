const mongoose = require('mongoose') //model
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')
//const userSchema = new mongoose.Schema()

const userSchema= new mongoose.Schema( {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required:true,
        unique:true, // makes emails unique for users
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new error('Email is invalid')
            }
        }
    },
    age:{
        type: Number,
        default:0,
        validate(value){
            if(value < 0){
                throw new Error('Age must be a positive number')
            }
        }
    },
    password:{
        type: String,
        required:true,
        trim:true,
        minlength: 7,
        validate(value){
             if(value.toLowerCase().includes('password')){
                throw new Error( 'password can not be password, please enter a new one!')
            }
        } 
    },
    tokens: [{
        token:{
            type: String,
            required: true
        }
    }],
    avatar:{
        type:Buffer
    }
},{
    timestamps:true
})

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.toJSON = function(){ //methods for ont he actual model
    const user = this
    const userObject = user.toObject()


    delete userObject.password //hides login password and token
    delete userObject.tokens
    delete userObject.avatar
    return userObject
}

userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET)

    user.tokens = user.tokens.concat({token})
    await user.save()//saving tokens to the database

    return token

}

userSchema.statics.findByCredentials = async (email,password) => {
    const user = await User.findOne({ email})

    if(!user){
        throw new Error('Unable to log in')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        throw new Error('Unable to login')
    }
    return user
}

// hash plain text pass before saving
userSchema.pre('save', async function(next) {
    const user = this // this user

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

//delete user tasks when user is removed

userSchema.pre('remove', async function(next){
    const user = this
    await Task.deleteMany({ owenr: user._id})
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User // allows us to let other files use it