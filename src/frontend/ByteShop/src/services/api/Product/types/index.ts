interface IProduct {
  id?: number;
  sku?: string;
  name?: string;
  description?: string;
  price?: number;
  costPrice?: number;
  brand?: string;
  weight?: number;
  height?: number;
  length?: number;
  width?: number;
  warranty?: number;
  stock?: number;
}

export interface IProductGet extends IProduct {
  mainImageUrl?: string;
  secondaryImageUrl?: Array<string> | null;
  category?: {
    id: number;
    name: string;
    parentCategoryId?: number;
  };
  pagination?: {
    actualPage: number;
    itemsPerPage: number;
    itemsTotal: number;
    totalPage: number;
  } | null;
  createdOn?: Date;
}

export interface IResponseProduct {
  content: IProductGet[];
  productId?: number;
  pagination?: {
    actualPage: number;
    itemsPerPage: number;
    itemsTotal: number;
    totalPage: number;
  };
}

export interface IImgsJson {
  id?: string;
  base64: string;
  extension: string;
}

export interface IProductPost extends IProduct {
  categoryId: number;
  mainImageBase64: IImgsJson;
  secondaryImagesBase64: IImgsJson[];
}
