import { Category } from "./category";
import { Product } from "./product";

export interface GetResponseProducts {
    content: Product[];
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  }