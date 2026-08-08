export interface ICreateSlideInput {
  title: string;
  subtitle?: string;
  image?: string;
  badge?: string;
  link?: string;
  active?: boolean;
  order?: number;
}

export interface IUpdateSlideInput extends Partial<ICreateSlideInput> {}
