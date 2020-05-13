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