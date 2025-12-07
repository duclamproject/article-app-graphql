import { gql } from "apollo-server-express";

export const typeDefsArticle = gql`
  type Article {
    id: ID
    title: String
    avatar: String
    description: String
    category: Category
  }

  input ArticleInput {
    title: String
    avatar: String
    description: String
    categoryId: String
  }

  type Query {
    getListArticle(
      sortKey: String
      sortValue: String
      currentPage: Int = 1
      limitItem: Int = 2
      filterKey: String
      filterValue: String
      keyword: String
    ): [Article]
    getArticle(id: ID): Article
  }

  type Mutation {
    createArticle(article: ArticleInput): Article
    updateArticle(id: ID, article: ArticleInput): Article
    deleteArticle(id: ID): String
  }
`;
