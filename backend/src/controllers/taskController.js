const Task = require('../models/Task')

exports.getTasks = async (req,res,next) => {
    try {
        const tasks = await Task.find({user: req.user.id});
        res.status(200).json(tasks)
    } catch (error) {
        next(error)
    }
}

exports.createTask = async(req,res,next) => {
    try {
        if(!req.body.title){
            res.status(400)
            throw new Error('Please add a text field')
        }
        const task = await Task.create({
            title: req.body.title,
            user: req.user.id
        })
        res.status(200).json(task)
    } catch (error) {
        next(error)
    }
}

exports.deleteTask = async(req,res,next) => {
    try {
        const task = await Task.findById(req.params.id)
        if(!task){
            res.status(404)
            throw new Error('Task not found')
        }

        if(req.user.role !== 'admin'){
            res.stauts(401)
            throw new Error('User not authorised to delete')
        }

        await task.deleteOne()
        res.status(200).json({id:req.params.id})
    } catch (error) {
        next(error)
    }
}