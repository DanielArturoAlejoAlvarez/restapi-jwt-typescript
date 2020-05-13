import express from 'express'
import morgan from 'morgan'
import IndexRouter from './routes/index.routes'
import AuthRouter from './routes/auth.routes'
import UserRouter from './routes/users.routes'

import password from 'passport'
import middlewarePassport from './middlewares/passport'

//initializations
const app = express()

//settings
app.set('port',process.env.PORT || 3000)


//middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false})) 
app.use(morgan('dev'))
app.use(password.initialize())

password.use(middlewarePassport)

//routes 
app.use('/',IndexRouter)
app.use('/auth', AuthRouter)
app.use('/api', UserRouter)

export default app




