import mongoose from "mongoose";
import bcrypt from "bcrypt";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        trim:true
    },
    phone : {type:String,default : null},
    userName: { type: String, default: '' ,unique:true,lowercase:true,trim:true,index:true}, // Default value to avoid null
    fullName: { type : String , default : null,trim:true},
    password: { type: String , required:true },
    TwoFAEnabled: {type:Boolean,default : false},
    templates : {type : []}
}, { timestamps: true });

// To use Aggregation Pipeline within User Model
userSchema.plugin(mongooseAggregatePaginate);

// Generate Hash Password Before Save in Database
userSchema.pre("save",async function (next){
    if(!this.isModified("password")){
        return next();
    }

    this.password = await bcrypt.hash(this.password,10);
    next();
});

// Create Custom mongoose Method for password Checking

userSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password,this.password);
}

export const userModel =  mongoose.model('users', userSchema);
