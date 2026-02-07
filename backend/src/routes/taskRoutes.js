const express =require('express')
const router = express.Router()
const { getTasks, createTask, deleteTask } = require('../controllers/taskController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.use(protect);

router.route('/')
    .get(getTasks)
    .post(createTask)

router.route('/:id')
    .delete(adminOnly,deleteTask)

module.exports = router;