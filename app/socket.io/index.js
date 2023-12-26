const NamespaceSocketHandeler = require("./namespace.socket")

module.exports={
    socketHandler:(io)=>{
       new NamespaceSocketHandeler(io).initConnection();
       new NamespaceSocketHandeler(io).createNamespscesConnection();

    }
}