export interface ICreatePropertyInput {
  title: string;
  type?: string;
  category?: string;
  status?: string;
  price?: number;
  location?: string;
  areaSqFt?: number;
  bedrooms?: number;
  bathrooms?: number;
  description?: string;
  features?: string[];
  images?: string[];
  image?: string;
  featured?: boolean;
}

export interface IUpdatePropertyInput extends Partial<ICreatePropertyInput> {}
