const { NameSpaceController } = require('../../http/controllers/support/namespace.controller');
const { SupportController } = require('../../http/controllers/support/support.controller');
const { checkLogin, checkAccessLogin } = require('../../http/middlewares/auth');
const { NameSpaceRouter } = require('./namespace.router');

const { RoomRouter } = require('./room.router');

const router=require('express').Router();
router.use('/namespace',NameSpaceRouter);
router.use('/room',RoomRouter);
router.get('/',checkLogin,SupportController.renderChatRoom)
router.get('/login',checkAccessLogin,SupportController.loginForm);
router.post('/login',checkAccessLogin,SupportController.login);
module.exports={
    SupportRouter:router
}