const pool = require('../dataBase/db')

const getUsers = async(_, res) => {
    try {
        const response = await pool.query('SELECT * FROM tb_users')
        res.status(200).json(response.rows)
    } catch (err) {
        console.error('error searching user', err)
        res.status(500).json({error: 'error searching user'})
    }
}

const createUser = async(req, res) => {
    const {name, email, password} = req.body
    try {

          if (!name || !email || !password) {
            return res.status(400).json({ error: 'all fields are mandatory'})
        }

        const response = await pool.query('INSERT INTO tb_users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
            [name, email, password]
        )
        res.status(200).json(response.rows[0])
    } catch (err) {
        console.error('could not create user', err)
        res.status(500).json({error: 'could not create user'})
    }
}

const patchUser = async(req, res) => {
    const {id} = req.params
    const {name, email} = req.body
    try {
        if (!name || !email) {
            return res.status(400).json({ error: 'all fields are mandatory'})
        }
        const response = await pool.query('UPDATE tb_users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
            [name, email, id]
        )
        res.status(200).json(response.rows[0])
    } catch (err) {
        console.error('could not update user', err)
        res.status(500).json({error: 'could not update user'})
    }
}

module.exports = {
    getUsers,
    createUser,
    patchUser
};