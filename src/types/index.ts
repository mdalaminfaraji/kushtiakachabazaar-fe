export interface Image {
  url: string;
}

export interface ChildCategory {
  documentId: string;
  name: string;
  name_bn: string;
  slug: string;
  image?: Image;
}

export interface SubCategory {
  documentId: string;
  name: string;
  name_bn: string;
  slug: string;
  image?: Image;
  childCategories?: ChildCategory[];
}

export interface Category {
  documentId: string;
  name: string;
  name_bn: string;
  slug: string;
  image?: Image;
  subCategories?: SubCategory[];
}

export interface Product {
  documentId: string;
  name: string;
  name_bn: string;
  slug: string;
  price: number;
  discountPrice?: number;
  unit: string;
  description: string;
  description_bn: string;
  inStock: boolean;
  stock: number;
  isPopular: boolean;
  isFlashSale: boolean;
  flashSaleEndDate?: string;
  image?: Image;
  images?: Image[];
  category?: Category;
  subCategory?: SubCategory;
  childCategory?: ChildCategory;
}
