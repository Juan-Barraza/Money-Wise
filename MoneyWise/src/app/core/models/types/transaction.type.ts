import { TYPES_TRANSACTION } from "../../constants/categories.constants";
import { ICategory } from "./category.type";

export interface IImage {
  id: number;
  url: string;
  filename: string;
  mime_type: string;
  created_at: Date;
}

export interface TransactionRequest {
  category_id: number;
  image_id?: number;
  type: TYPES_TRANSACTION;
  title: string;
  description?: string;
  amount: number;
  date: Date;

}


export interface TransactionResponse {
  id: number;
  type: TYPES_TRANSACTION;
  title: string;
  description?: string;
  amount: number;
  date: Date;
  category: ICategory
  created_at: Date;
  image?: IImage;
}


export interface TransactionPaginated {
  data: TransactionResponse[];
  total: number;
  page: number;
  limit: number;
  total_pages:number;
}

export interface TransactionFilters {
  type?: string;
  category_id?: number;
  search?: string;
  date_from?: string;
  date_to?: string;
  page?: number;
  limit?: number;
}
