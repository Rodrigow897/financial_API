const express = require('express');
const router = express.Router();
const userRouter = require('./../controllers/userController')

router.get('/', userRouter.getUsers)
router.post('/', userRouter.createUser)
router.patch('/:id', userRouter.patchUser)

module.exports = router;