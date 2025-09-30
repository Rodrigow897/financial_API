const express = require('express')
const app = express()
const PORT = 3000
const userRouter = require('./routers/userRouter')
const categoriesRouter = require('./routers/categoriesRouter')


app.use(express.json())

app.get('/', (req, res) => {
    res.send('Welcome to the API financial management');
});

app.use('/users', userRouter)
app.use('/categories', categoriesRouter)


app.listen(PORT, ()=>{
    console.log('server runing...')
})