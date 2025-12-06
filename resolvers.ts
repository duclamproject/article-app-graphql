import { get } from "http";
import Article from "./models/article.model";
import Category from "./models/category.model";

export const resolvers = {
  Query: {
    hello: () => "Hello, world!",
    getListArticle: async () => {
      return await Article.find({ deleted: false });
    },
    getArticle: async (_, args) => {
      const { id } = args;
      return await Article.findOne({
        _id: id,
        deleted: false,
      });
    },
    getListCategory: async () => {
      const categories = await Category.find({
        deleted: false,
      });
      return categories;
    },
    getCategory: async (_, args) => {
      const { id } = args;
      const category = await Category.findOne({
        _id: id,
        deleted: false,
      });
      return category;
    },
  },
  Article: {
    category: async (article) => {
      const categoryId = article.categoryId;
      return await Category.findOne({ _id: categoryId });
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
    // Category
    createCategory: async (_, args) => {
      const { category } = args;
      const record = new Category(category);
      await record.save();
      return record;
    },
    updateCategory: async (_, args) => {
      const { id, category } = args;
      await Category.updateOne(
        {
          _id: id,
        },
        category
      );
      const record = await Category.findOne({ _id: id });
      return record;
    },
    deleteCategory: async (_, args) => {
      const { id } = args;
      await Category.updateOne(
        {
          _id: id,
        },
        { deleted: true, deletedAt: new Date() }
      );
      return "Đã xóa";
    },
  },
};
