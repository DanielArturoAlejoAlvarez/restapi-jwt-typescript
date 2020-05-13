export default {
    jwt_secret: process.env.JWT_SECRET || 'jwtsecretdefault',
    DB: {
        baseName: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/apirestjwttypescript_db',
        user: process.env.MONGO_USER,
        password: process.env.MONGO_PASSWORD 
    }
}