import express from 'express';
import mongoose from 'mongoose';
import routes from './routes/index.js';
import 'dotenv/config'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use('/customer',routes)

mongoose.connect(process.env.DB_URL,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
.then(result => {
    console.log('Connected with Database...');
})
.catch(err => {
    console.log(" database connection error");
    console.log(err)
})

app.listen(PORT, () => {
    console.log(`Server is listning on port ${PORT}`)
})