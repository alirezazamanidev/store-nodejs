const { NameSpaceController } = require('../../http/controllers/support/namespace.controller');
const { SupportController } = require('../../http/controllers/support/support.controller');
const { NameSpaceRouter } = require('./namespace.router');

const { RoomRouter } = require('./room.router');

const router=require('express').Router();
router.use('/namespace',NameSpaceRouter);
router.use('/room',RoomRouter);
router.get('/',SupportController.renderChatRoom);
module.exports={
    SupportRouter:router
}