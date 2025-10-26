const express = require('express');
const router = express.Router();
const {getAllUsers} = require ('../controllers/accountsControllers')

// Router lấy toàn bộ user 
router.get('/getALlUser', getAllUsers)

module.exports = router;




