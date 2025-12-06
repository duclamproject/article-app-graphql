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
  Mutation: {
    createArticle: async (_, args) => {
      const { article } = args;
      const record = new Article(article);
      await record.save();
      return record;
    },
    updateArticle: async (_, args) => {
      const { id, article } = args;
      await Article.updateOne(
        {
          _id: id,
        },
        article
      );
      const record = await Article.findOne({ _id: id });
      return record;
    },
    deleteArticle: async (_, args) => {
      const { id } = args;
      await Article.updateOne(
        {
          _id: id,
        },
        {
          deleted: true,
          deletedAt: new Date(),
        }
      );
      return "Đã xóa";
    },
  },
};
