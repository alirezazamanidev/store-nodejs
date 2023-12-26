const { ConverSationModel } = require("../models/conversation");

module.exports= class NamespaceSocketHandeler {
    #io
    constructor(io){
        this.#io=io;
        
    }
    initConnection(){
        this.#io.on('connection',async(socket)=>{
            const namespaces=await ConverSationModel.find({},{title:1.,endpoint:1}).sort({_id:-1});
            socket.emit('namespacesList',namespaces);
        })
    }
}