const AuthenticationController = require('./controllers/AuthenticationController')
const ResumeController = require('./controllers/ResumeController')
const { authSessionRoute} = require('./controllers/sessionController')
var router = require("express").Router();

module.exports=(app) => {
    router.post('/register', AuthenticationController.register)
    router.post('/login', AuthenticationController.login)
    router.get('/users', AuthenticationController.getAllUsers)
    router.get('/user/:id', AuthenticationController.getuser)
    router.delete('/user/:id', AuthenticationController.deleteUser)
    router.patch('/user', AuthenticationController.updateUser)

    router.post('/saveResume', ResumeController.saveResume)

    app.use("/", router)
}
