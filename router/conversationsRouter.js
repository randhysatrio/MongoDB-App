const router = require('express').Router();
const { conversationsController } = require('../controller');

router.get('/:id', conversationsController.getConversation);
router.post('/', conversationsController.postConversation);

module.exports = router;
