const createHttpError = require("http-errors");
const { ConverSationModel } = require("../../../models/conversation");
const Controller = require("../controller");
const { StatusCodes: HttpStatus } = require("http-status-codes");

const path = require("path");
class RoomController extends Controller {
  async addRoom(req, res, next) {
    try {
      const { name, description, filename, fileUploadPath, namespace } =
        req.body;
        await this.findcoversartionByEndpoint(namespace);
      await this.findRoomByName(name);
      const image = path.join(fileUploadPath, filename).replace(/\\/g, "/");
      const room = { name, description, image };
      console.log(room);
      const UpdateconversationResult = await ConverSationModel.updateOne(
        { endpoint: namespace },
        { $push: {rooms:room} }
      );
      if (UpdateconversationResult.modifiedCount == 0)
        throw createHttpError.InternalServerError();
      return res.status(HttpStatus.CREATED).json({
        data: {
          statusCode: HttpStatus.CREATED,
          message: "room has been  created!",
        },
      });
    } catch (err) {
      next(err);
    }
  }
  async getListOfRooms(req, res, next) {
    try {
      const conversation = await ConverSationModel.find({}, { rooms: 1 });
      return res.status(HttpStatus.OK).json({
        data: {
          statusCode: HttpStatus.OK,
          rooms: conversation.rooms,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async findRoomByName(name) {
    const conversation = await ConverSationModel.findOne({
      "rooms.name": name,
    });
    if (conversation)
      throw createHttpError.BadRequest("The room has already exist!");
  }
  async findcoversartionByEndpoint(endpoint) {
    const conversation = await ConverSationModel.findOne({ endpoint });
    if (!conversation)
      throw createHttpError.NotFound("The conversation  not found !");
    return conversation;
  }
}

module.exports = {
  RoomController: new RoomController(),
};
