const { graphqlSchema } = require("../graphql/index.resolver");

function graphqlConfig(req,res){
    return{
        schema:graphqlSchema,
        graphiql:true,
        context:{req,res}
    }
}

module.exports={
    graphqlConfig
}