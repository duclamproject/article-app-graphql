import Article from "./models/article.model";

export const resolvers = {
  Query: {
    hello: () => "Hello, world!",
    getListArticle: async () => {
      return await Article.find({ deleted: false });
    },
  },
};
