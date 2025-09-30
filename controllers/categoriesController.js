const pool = require('../dataBase/db')

const createCategories = async(req, res) =>{
    const {name} = req.body
    try {
        const response = await pool.query('INSERT INTO tb_categories (name) VALUES ($1) RETURNING *', [name])
        res.status(200).json(response.rows[0])

        } catch (err) {
        console.error('could not create category', err)
        res.status(500).json({error: 'could not create category'})
    }
}

const getCategories = async(_, res) => {
    try {
        const response = await pool.query('SELECT * FROM tb_categories')
        res.status(200).json(response.rows)
    } catch (err) {
        console.error('error searching categories', err)
        res.status(500).json({error: 'error searching categories'})
    }
}

const updateCategories = async(req, res) => {
    const {id} = req.params
    const {name} = req.body
    try {

        if (!name) {
            return res.status(400).json({ error: 'all fields are mandatory'})
        }

        const response = await pool.query('UPDATE tb_categories SET name = $1 WHERE id = $2 RETURNING *', [name, id])

        if (response.rowCount === 0) {
            return res.status(404).json({ error: 'category not found'})
        }

        res.status(200).json(response.rows[0])
    } catch (err) {
        console.error('could not update category', err)
        res.status(500).json({error: 'could not update category'})
    }
}

const deleteCategories = async(req, res) => {
    const {id} = req.params
    try {
        const response = await pool.query('DELETE FROM tb_categories WHERE id = $1', [id])

        if (response.rowCount === 0) {
            return res.status(400).jason({ error: 'category not found'})
        }

        res.status(200).json({ message: 'category deleted successfully'})
    } catch (err) {
        console.error('could not delete category', err)
        res.status(500).json({error: 'could not delete category'})
    }
}




module.exports = {
    createCategories,
    getCategories,
    updateCategories,
    deleteCategories
}