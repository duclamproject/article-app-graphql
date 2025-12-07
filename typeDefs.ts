import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Article {
    id: ID
    title: String
    avatar: String
    description: String
    category: Category
  }
  type Category {
    id: ID
    title: String
    avatar: String
    description: String
  }

  input ArticleInput {
    title: String
    avatar: String
    description: String
    categoryId: String
  }
  input CategoryInput {
    title: String
    avatar: String
  }

  type Query {
    hello: String
    # Article
    getListArticle: [Article]
    getArticle(id: ID): Article
    # Category
    getListCategory: [Category]
    getCategory(id: ID): Category
  }

  type Mutation {
    # Article
    createArticle(article: ArticleInput): Article
    updateArticle(id: ID, article: ArticleInput): Article
    deleteArticle(id: ID): String
    # Category
    createCategory(category: CategoryInput): Category
    updateCategory(id: ID, category: CategoryInput): Category
    deleteCategory(id: ID): String
  }
`;
