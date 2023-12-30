const express = require("express");
const http = require("http");
const path = require("path");
const mongoose = require("mongoose");
const createErrors = require("http-errors");
const { AllRoutes } = require("./routes/router");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const morgan = require("morgan");
const cors = require("cors");
const ExpressEjsLayouts = require("express-ejs-layouts");
const { config } = require("dotenv");
const { initialSocket } = require("./utils/init_socket.io");
const { socketHandler } = require("./socket.io");
const session=require('express-session');
const cookieParser=require('cookie-parser');
const { SECRET_COOKIE_KEY } = require("./utils/constans");
config();
module.exports = class Application {
  #app = express();
  #PORT;
  #DB_URI;
  constructor(PORT, DB_URI) {
    this.#PORT = PORT;
    this.#DB_URI = DB_URI;
    this.configApplication();
    this.Init_TemplateEngine();
    this.Init_Client_Seasion();
    this.createServer();
    this.connectToMongoDb();
    this.createRoutes();
    this.errorHandling();
    this.Init_redis();
  }

  configApplication() {
    this.#app.use(cors());
    this.#app.use(morgan("dev"));
    this.#app.use(express.json());
    this.#app.use(express.urlencoded({ extended: true }));
    this.#app.use(express.static(path.join(__dirname, "..", "public")));
    this.#app.use(
      "/api-doc",
      swaggerUi.serve,
      swaggerUi.setup(
        swaggerJsDoc({
          swaggerDefinition: {
            openapi: "3.0.0",
            info: {
              title: "Store Api Document",
              description: "This store Api document. ",
              version: "2.0.0",
            },
            servers: [
              {
                url: "http://localhost:3000",
              },
              {
                url: "http://localhost:4000",
              },
            ],
            components: {
              securitySchemes: {
                BearerAuth: {
                  type: "http",
                  scheme: "bearer",
                  bearerFormat: "JWT",
                },
              },
            },
            security: [{ BearerAuth: [] }],
          },

          apis: ["./app/routes/**/*.js"],
        }),
        { explorer: true }
      )
    );
  }
  createServer() {
    const server = http.createServer(this.#app);
    const io = initialSocket(server);
    socketHandler(io);
    server.listen(this.#PORT, () => {
      console.log(`run > http://localhost:${this.#PORT}`);
    });
  }
  connectToMongoDb() {
    mongoose
      .connect(this.#DB_URI)
      .then(() => console.log("Connected to Db!"))
      .catch((err) => console.log("faild to connected Db!"));

    mongoose.connection.on("connected", () => {
      console.log("Mongoose connected to Db!");
    });
    mongoose.connection.on("disconnected", () => {
      console.log("Mongoose disConnected to Db!");
    });

    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      process.exit(0);
    });
  }
  Init_redis() {
    require("./utils/init_redis");
  }
  Init_TemplateEngine() {
    this.#app.use(ExpressEjsLayouts);
    this.#app.set("view engine", "ejs");
    this.#app.set("views", "resource/views");
    this.#app.set("layout extractStyles", true);
    this.#app.set("layout extractScripts", true);
    this.#app.set("layout", "./layouts/master");
  }
  Init_Client_Seasion(){

    this.#app.use(cookieParser(SECRET_COOKIE_KEY));
    this.#app.use(session({
      secret:SECRET_COOKIE_KEY,
      resave:true,
      saveUninitialized:true,
      cookie:{
        secure:true
      }
    }))
  }

  createRoutes() {
    this.#app.use(AllRoutes);
    
  }
  errorHandling() {
    this.#app.use((req, res, next) => {
      next(createErrors.NotFound("آدرس مورد نطر یافت نشد!"));
    });

    this.#app.use((err, req, res, next) => {
      const serverError = createErrors.InternalServerError();
      const statusCode = err.status ?? serverError.status;
      const message = err.message ?? serverError.message;
      return res.status(statusCode).json({
        errors: {
          statusCode,
          message,
        },
      });
    });
  }
};
