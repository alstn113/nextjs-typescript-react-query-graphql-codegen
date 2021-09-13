export interface IPerson {
  id: string;
  name: string;
  age: number;
}

export interface IReview {
  id: string;
  title: string;
  body: string;
  rating: number;
  categories?: ICategory[];
}

export interface ICategory {
  id: string;
  name: string;
  reviews: IReview[];
}
