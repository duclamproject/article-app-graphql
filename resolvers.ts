import { get } from "http";
import Article from "./models/article.model";

export const resolvers = {
  Query: {
    hello: () => "Hello, world!",
    getListArticle: async () => {
      return await Article.find({ deleted: false });
    },
    getArticleById: async (_, args) => {
      const { id } = args;
      return await Article.findOne({
        _id: id,
        deleted: false,
      });
    },
  },
};
