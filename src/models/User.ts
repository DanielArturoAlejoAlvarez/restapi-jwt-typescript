import { model,Schema,Document } from 'mongoose'
import bcrypt from 'bcrypt'

export interface IUser extends Document {
    displayName: string;
    email: string;
    password: string;
    avatar: string;
    role: string;
    status: boolean;
    comparePassword: (password: string)=>Promise<boolean>;
}

const UserSchema = new Schema({
    displayName: {
        type: String,
        required: false
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true,
        maxlength: 512
    },
    role: {
        type: String,
        enum: ['SUPERADMIN','ADMIN','USER'],
        default: 'USER'
    },
    status: {
        type: Boolean,
        default: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
})

UserSchema.pre<IUser>('save',async function(next){
    const user = this
    if(!user.isModified('password')) return next()

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(user.password, salt)
    user.password = hash
})

UserSchema.methods.comparePassword = async function(password: string):Promise<Boolean> {
    return await bcrypt.compare(password, this.password)
} 


export default model<IUser>('User', UserSchema)