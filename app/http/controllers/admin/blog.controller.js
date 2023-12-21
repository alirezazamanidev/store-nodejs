const Controller = require("../controller");

class BlogController extends Controller{

    async createBlog(req,res,next){
        try {
            
        } catch (error) {
            next(error);
        }
    }
    async getListOfBlogs(req,res,next){
        try {
            res.status(200).json({
                data:{
                    statusCode:200,
                    blogs:[]
                }
            })
        } catch (error) {
            next(error);
        }
    }
}


module.exports={
    BlogController:new BlogController()
}