import Article from "../models/article.model";
import Category from "../models/category.model";

export const resolversArticle = {
  Query: {
    getListArticle: async (_, args) => {
      const {
        sortKey,
        sortValue,
        currentPage,
        limitItem,
        filterKey,
        filterValue,
        keyword,
      } = args;
      const find = { deleted: false };
      // Sort
      const sort = {};
      if (sortKey && sortValue) {
        sort[sortKey] = sortValue;
      }
      // Pagination
      const skip = (parseInt(currentPage) - 1) * parseInt(limitItem);
      // filter
      if (filterKey && filterValue) {
        find[filterKey] = filterValue;
      }
      // Search
      if (keyword) {
        const keywordRegex = new RegExp(keyword, "i");
        find["title"] = keywordRegex;
      }
      const articles = await Article.find(find).sort(sort).skip(skip);
      return articles;
    },
    getArticle: async (_, args) => {
      const { id } = args;
      return await Article.findOne({
        _id: id,
        deleted: false,
      });
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
  },
};
