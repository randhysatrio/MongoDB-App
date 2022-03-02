const router = require('express').Router();
const { messagesController } = require('../controller');

router.post('/', messagesController.postMessage);
router.get('/:id', messagesController.getMessage);

module.exports = router;
