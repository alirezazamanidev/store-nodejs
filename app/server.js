const express = require("express");
const http = require("http");
const path = require("path");
const mongoose = require("mongoose");
module.exports= class Application {
  #app = express();
  #PORT;
  #DB_URI;
  constructor(PORT, DB_URI) {
    this.#PORT = PORT;
    this.#DB_URI = DB_URI;
    this.configApplication();
    this.createServer();
    this.connectToMongoDb();
    this.createRoutes();
    this.errorHandling();
  }

  configApplication() {
    this.#app.use(express.json());
    this.#app.use(express.urlencoded({ extended: true }));
    this.#app.use(express.static(path.join(__dirname + ".." + "public")));
  }
  createServer() {
    http.createServer(this.#app).listen(this.#PORT, () => {
      console.log(`run > http://localhost:${this.#PORT}`);
    });
  }
  connectToMongoDb() {
    mongoose
      .connect(this.#DB_URI)
      .then(() => console.log("Connected to Db!"))
      .catch((err) => console.log("faild to connected Db!"));
  }
  createRoutes() {}
  errorHandling() {
    this.#app.use((req, res, next) => {
      return res.status(404).json({
        statusCode: 404,
        message: "آدرس مورد نطر یافت نشد!",
      });
    });

    this.#app.use((err,req,res,next)=>{
        const statusCode=err.status ?? 500;
        const message=err.message ?? 'InternalServerError!';
        return res.status(statusCode).json({
            statusCode,
            message
        })
    })
  }
}
