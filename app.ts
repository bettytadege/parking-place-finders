import { ParkingProvider } from './node_modules/.prisma/client/index.d';
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import userRoute from './routes/userRoute'
import vehicleRoute from './routes/vehicleRoute'
import addressRoute from './routes/addressRoute'
import bookingRoute from './routes/bookingRoute'
import parkingProviderRoute from './routes/parkingProviderRoute'
import globalErrorHandler from './errorhandler/globalErrorHandler'
const app=express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
//routes
app.use('/api/users',userRoute)
app.use('/api/provider',parkingProviderRoute)
app.use('/api/vehicle',vehicleRoute)
app.use('/api/address',addressRoute)
app.use('/api/booking',bookingRoute)

app.use(globalErrorHandler)
app.get('/' ,(req,res,next)=>{
    res.send('hello server')
})
export default app
