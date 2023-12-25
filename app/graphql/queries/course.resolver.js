const { GraphQLList } = require("graphql");
const { CourseModel } = require("../../models/course");
const { CourseType } = require("../typeDefs/course.type");

const CourseResolver = {
  type: new GraphQLList(CourseType),
  resolve: async () => {
    const courses=await CourseModel.find({}).populate([{path:'teacher'},{path:'category'}]);
    return courses;
  },
};
module.exports = {
  CourseResolver,
};
