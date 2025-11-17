const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const authRoutes = require('./routes/auth.route')
const inventoryRoutes = require('./routes/inventory.route')

dotenv.config()

const app = express()
const PORT = process.env.PORT


app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors())

app.use('/api/auth',authRoutes)
app.use('/api/inventories',inventoryRoutes)
app.use('/api/products',productRoutes)

app.listen(PORT,()=>{
    console.log(`Server is listening on Port : ${{PORT}}`)
})
