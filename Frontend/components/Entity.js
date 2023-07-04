import { Home, ContentPage, Product, Products, Blog, Post, Search } from "./entities";

const entities = {
  home: Home,
  contentPage: ContentPage,
  product: Product,
  products: Products,
  blog: Blog,
  post: Post,
  search: Search
};

export default function Entity({ view }) {
  const Container = entities[view?.type];

  return <Container view={view} />;
}
