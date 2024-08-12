import express from 'express';
import mongoose from 'mongoose';


const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use('/customer',routes)

mongoose.connect(process.env.DB_URL,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
.then(result => {
    console.log('Connected...');
})
.catch(err => {
    console.log(" database connection error");
})

app.listen(PORT, () => {
    console.log(`Server is listning on port ${PORT}`)
})