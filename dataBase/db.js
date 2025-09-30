const {Pool} = require('pg')

const pool = new Pool({
    user: 'postgres',
    database: 'financial_management',
    password: 'Messi10*',
    host: 'localhost',
    port: 5432
})

pool.connect()
.then(console.log('db connected...'))
.catch(err => console.log('failed connection...', err))

module.exports = pool