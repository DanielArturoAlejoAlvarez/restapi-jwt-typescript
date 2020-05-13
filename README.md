# API REST JWT-Passport(typescript)
## Description

This repository is a Application software with NODEjs, Express, MongoDB, JWT, Passport,etc this application contains an API created with TYPESCRIPT.

## Installation
Using Typescript, Express, Mongoose,etc preferably.

## DataBase
Using MongoDB preferably.

## Apps
Using Postman, Insomnia,etc to feed the api.

## Usage
```html
$ git clone https://github.com/DanielArturoAlejoAlvarez/apirest-jwt-typescript.git [NAME APP] 

$ npm install

$ npm run dev
```
Follow the following steps and you're good to go! Important:


![alt text](https://i.stack.imgur.com/nIxu1.gif)


## Coding

### Routes

```typescript
...
import {Router} from 'express'
import { getUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/user.controllers'
import passport from 'passport'

const router = Router()


router.get('/users', getUsers)
router.get('/users/:id', getUserById)
router.post('/users', passport.authenticate('jwt', {session: false}), createUser)
router.put('/users/:id', passport.authenticate('jwt', {session: false}), updateUser)
router.delete('/users/:id', passport.authenticate('jwt', {session: false}), deleteUser)

export default router
...
```

### Server

```typescript
...
import express from 'express'
import morgan from 'morgan'
import IndexRouter from './routes/index.routes'
import AuthRouter from './routes/auth.routes'
import UserRouter from './routes/users.routes'

import password from 'passport'
import middlewarePassport from './middlewares/passport'

const app = express()

app.set('port',process.env.PORT || 3000)

app.use(express.json())
app.use(express.urlencoded({extended: false})) 
app.use(morgan('dev'))
app.use(password.initialize())

password.use(middlewarePassport)

app.use('/',IndexRouter)
app.use('/auth', AuthRouter)
app.use('/api', UserRouter)

export default app
...
```

### Authentication


```typescript
...
 import { Request,Response } from 'express'
import User, {IUser} from '../models/User'
import jwt from 'jsonwebtoken'
import config from '../config/config'

function createToken(user: IUser) {
    return jwt.sign({id: user.id, email: user.email},config.jwt_secret,{
        expiresIn: 24*60*60
    })
}

export const signUp = async (req: Request,res: Response):Promise<Response>=>{
    if(!req.body.email || !req.body.password) {
        return res.status(400).json({
            msg: 'Please, sending your email and password'
        })
    }
    const user = await User.findOne({email: req.body.email})
    if(user) {
        return res.status(400).json({
            msg: 'User already exists!'
        })
    }
    const newUser = new User(req.body)
    await newUser.save()
    return res.status(201).json(newUser)
}

export const signIn = async (req: Request,res: Response)=>{
    if(!req.body.email || !req.body.password) {
        return res.status(400).json({
            msg: 'Please, sending your email and password'
        })
    }
    const user = await User.findOne({email: req.body.email})
    if(!user) {
        return res.status(400).json({
            msg: 'User does not exists!'
        })
    }
    const isMatch = await user.comparePassword(req.body.password)
    if (isMatch) {
        res.status(200).json({
            token: createToken(user)
        })
    }

    return res.status(400).json({
        msg: 'Email or Password invalid!'
    })
}
...

```
### Controllers

```typescript
...
import { Request,Response } from 'express'
import User from '../models/User'

export const getUsers = async (req: Request,res: Response):Promise<Response>=>{
    const users = await User.find({})
    return res.json(users)
}

export const getUserById = async (req: Request,res:Response):Promise<Response>=>{
    const {id} = req.params 
    const user = await User.findById(id)
    return res.json(user)
}

export const createUser = async (req: Request,res:Response)=>{
    const newUser = new User(req.body)
    await newUser.save()
    return res.status(200).json({
        msg: 'User saved successfully!',
        user: newUser
    })
}

export const updateUser = async (req: Request,res:Response)=>{
    const {id} = req.params 
    const updUser = req.body
    await User.findByIdAndUpdate(id,updUser)
    return res.status(200).json({
        msg: 'User updated successfully!',
        user: updUser
    })
}

export const deleteUser = async (req: Request,res:Response)=>{
    const {id} = req.params 
    await User.findByIdAndRemove(id)
    return res.status(200).json({
        msg: 'User deleted successfully!'
    })
}
...
```

### Model

```typescript
...
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
...
```



## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/DanielArturoAlejoAlvarez/apirest-jwt-typescript. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.


## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
