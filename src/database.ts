import config from './config/config'
import mongoose, { ConnectionOptions } from 'mongoose'

const connectionOptions: ConnectionOptions = {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
}

mongoose.connect(config.DB.baseName, connectionOptions)

const connection = mongoose.connection

connection.on('open', ()=>{
    console.log('DB connect!!!')
})

connection.on('error', err=>{
    console.log(err)
    process.exit(0)
})