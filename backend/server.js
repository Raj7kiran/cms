import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

import userRoutes from './routes/userRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import dpRoutes from './routes/dpRoutes.js'
import serviceRoutes from './routes/serviceRoutes.js'


const app = express();

//this is for body parser
app.use(express.json())

if(process.env.NODE_ENV === 'development'){
	app.use(morgan('dev'))
}


dotenv.config();
connectDB()

app.use('/users', userRoutes)
app.use('/admin', adminRoutes)
app.use('/drop', dpRoutes)
app.use('/service', serviceRoutes)


const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))


if(process.env.NODE_ENV === 'production'){
	app.use(express.static(path.join(__dirname, '/frontend/build')))

	app.get('*', (req,res) => 
		res.sendFile(path.resolve(__dirname, 'frontend','build', 'index.html')))
} else {
	app.get('/', (req,res) => {
		res.send('API running....');
	})
}

app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode in port ${PORT}`));