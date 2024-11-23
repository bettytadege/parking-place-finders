import app from './app'
import dotenv from 'dotenv'
dotenv.config({path:'./.env'})

const PORT=process.env.PORT || 4000
app.listen(PORT ,()=>{
    console.log(`server is running on ${PORT}....`)
})
