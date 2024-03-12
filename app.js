require('dotenv').config()
const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser')
const connectDb = require('./utils/db');
const authRouter = require('./routes/authRoutes');
const blogRouter = require('./routes/blogRoutes')


const app = express();
connectDb()

app.use(express.json());
app.use(cors({
  origin:process.env.ORIGIN,
  credentials:true
}))
app.use(cookieParser())
app.use("/uploads",express.static('./uploads'))
app.use('/api/auth', authRouter);
app.use('/api/blogs', blogRouter);




const PORT = process.env.PORT || 3000;

app.get("/",(req,res)=>{
  res.send("Hello world !")
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
