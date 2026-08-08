export interface ICreateBlogInput {
  title: string;
  excerpt?: string;
  content?: string;
  image?: string;
  category?: string;
  author?: string;
}

export interface IUpdateBlogInput extends Partial<ICreateBlogInput> {}
