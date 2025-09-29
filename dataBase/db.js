const {Pool} = require('pg')

const pool = new Pool({
    user: 'postgres',
    database: 'financial_management',
    password: '',
    host: 'localhost',
    port: 5432
})

pool.connect()
.then(console.log('Server runing...'))
.catch(err => console.log('failed connection...', err))

module.exports = pool