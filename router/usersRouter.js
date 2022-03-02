const router = require('express').Router();
const { usersController } = require('../controller');
const { authToken } = require('../helper/authToken');

router.get('/', usersController.getAllData);
router.get('/match', usersController.getDataMatch);
router.post('/find', usersController.getDataWithBody);
router.post('/filter', usersController.getDataFilter);
router.post('/add', authToken, usersController.addData);
router.patch('/edit/:id', authToken, usersController.editData);
router.delete('/delete/:id', authToken, usersController.deleteData);

module.exports = router;
