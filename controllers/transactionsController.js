const pool = require('../dataBase/db')

const createTransactions = async(req, res) => {
    const {name, value, date, type, id_users, id_categories} = req.body
    try {
        if (!name || !value || !date || !type || !id_users || !id_categories) {
            return res.status(400).json({ error: 'all fields are mandatory'})
        }
        const response = await pool.query('INSERT INTO tb_transactions (name, value, date, type, id_users, id_categories) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [name, value, date, type, id_users, id_categories]
        )
        res.status(200).json(response.rows[0])
    } catch (err) {
        console.error('could not create transaction', err)
        res.status(500).json({error: 'could not create transaction'})
    }
}

const getTransactions = async(_, res) => {
    try {
        const response = await pool.query('SELECT * FROM tb_transactions')
        res.status(200).json(response.rows)
    } catch (err) {
        console.error('error searching transactions', err)
        res.status(500).json({error: 'error searching transactions'})
    }
}

const patchTransactions = async(req, res) => {
    const {id} = req.params
    const {name} = req.body
    try {

        if (!name) {
            return res.status(400).json({ error: 'all fields are mandatory'})
        }

        const response = await pool.query('UPDATE tb_transactions SET name = $1 WHERE id = $2 RETURNING *',
            [name, id]
        )

        if (response.rowCount === 0) {
            return res.status(404).json({ error: 'transaction not found'})
        }

        res.status(200).json(response.rows[0])
    }catch (err) {
        console.error('could not update transaction', err)
        res.status(500).json({error: 'could not update transaction'})
    }
}

const deleteTransactions = async(req, res) => {
    const {id} = req.params
    try {
        const response = await pool.query('DELETE FROM tb_transactions WHERE id = $1', [id])

        if (response.rowCount === 0) {
            return res.status(400).json({ error: 'transaction not found'})
        }

        res.status(200).json({ message: 'transaction deleted successfully'})
    }catch (err) {
        console.error('could not delete transaction', err)
        res.status(500).json({error: 'could not delete transaction'})
    }
}

module.exports = {
    createTransactions,
    getTransactions,
    patchTransactions,
    deleteTransactions
}