const express = require('express')
const app = express()
const PORT = 3000
const userRouter = require('./routers/userRouter')
const categoriesRouter = require('./routers/categoriesRouter')
const transactionsRouter = require('./routers/transactionsRouter')



app.use(express.json())

app.get('/', (req, res) => {
    res.send('Welcome to the API financial management');
});

app.use('/users', userRouter)
app.use('/categories', categoriesRouter)
app.use('/transactions', transactionsRouter)



app.listen(PORT, ()=>{
    console.log('server runing...')
})