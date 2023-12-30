const { ConverSationModel } = require("../models/conversation");

module.exports = class NamespaceSocketHandeler {
  #io;
  constructor(io) {
    this.#io = io;
  }
  initConnection() {
    this.#io.on("connection", async (socket) => {
      const namespaces = await ConverSationModel.find(
        {},
        { title: 1, endpoint: 1 }
      ).sort({ _id: -1 });
      socket.emit("namespacesList", namespaces);
    });
  }
  async createNamespscesConnection() {
    const namespaces = await ConverSationModel.find(
      {},
      { title: 1, endpoint: 1, rooms: 1 }
    ).sort({ _id: -1 });
    for (const namespace of namespaces) {
      this.#io.of(`/${namespace.endpoint}`).on("connection", async (socket) => {
        const conversation = await ConverSationModel.findOne(
          { endpoint: namespace.endpoint },
          { rooms: 1 }
        ).sort({ _id: -1 });
        socket.on("joinRoom", async roomName => {
            const lastRoom = Array.from(socket.rooms)[1]
            if(lastRoom){
                socket.leave(lastRoom)
                await this.getCountOfOnlineUsers(namespace.endpoint, roomName)
            }
            socket.join(roomName);
            await this.getCountOfOnlineUsers(namespace.endpoint, roomName)
            const roomInfo = conversation.rooms.find(item => item.name == roomName)
            socket.emit("roomInfo", roomInfo)
         
            socket.on("disconnect", async () => {
                await this.getCountOfOnlineUsers(namespace.endpoint, roomName)
            })
        })
        socket.emit("roomList", conversation.rooms);
        
      });
    }
  }
  async getCountOfOnlineUsers(endpoint, roomName) {
    const onlineUsers = await this.#io
      .of(`/${endpoint}`)
      .in(roomName)
      .allSockets();
    this.#io
      .of(`/${endpoint}`)
      .in(roomName)
      .emit("countOfOnlineUsers", Array.from(onlineUsers).length);
  }
};
