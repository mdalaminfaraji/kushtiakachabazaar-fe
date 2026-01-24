/**
 * Strapi API Response Types
 * These types match the Strapi v5 API response structure
 */

// Base Strapi response wrapper
export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Base Strapi entity
export interface StrapiEntity<T> {
  id: number;
  attributes: T;
}

// Category attributes
export interface CategoryAttributes {
  name: string;
  name_bn: string;
  slug: string;
  image?: {
    data: StrapiEntity<MediaAttributes> | null;
  };
  subCategories?: {
    data: StrapiEntity<SubCategoryAttributes>[];
  };
  products?: {
    data: StrapiEntity<ProductAttributes>[];
  };
  createdAt: string;
  updatedAt: string;
}

// SubCategory attributes
export interface SubCategoryAttributes {
  name: string;
  name_bn: string;
  slug: string;
  image?: {
    data: StrapiEntity<MediaAttributes> | null;
  };
  category?: {
    data: StrapiEntity<CategoryAttributes> | null;
  };
  childCategories?: {
    data: StrapiEntity<ChildCategoryAttributes>[];
  };
  products?: {
    data: StrapiEntity<ProductAttributes>[];
  };
  createdAt: string;
  updatedAt: string;
}

// ChildCategory attributes
export interface ChildCategoryAttributes {
  name: string;
  name_bn: string;
  slug: string;
  image?: {
    data: StrapiEntity<MediaAttributes> | null;
  };
  subCategory?: {
    data: StrapiEntity<SubCategoryAttributes> | null;
  };
  products?: {
    data: StrapiEntity<ProductAttributes>[];
  };
  createdAt: string;
  updatedAt: string;
}

// Product attributes
export interface ProductAttributes {
  name: string;
  name_bn: string;
  slug: string;
  image: {
    data: StrapiEntity<MediaAttributes> | null;
  };
  images?: {
    data: StrapiEntity<MediaAttributes>[];
  };
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
  category?: {
    data: StrapiEntity<CategoryAttributes> | null;
  };
  subCategory?: {
    data: StrapiEntity<SubCategoryAttributes> | null;
  };
  childCategory?: {
    data: StrapiEntity<ChildCategoryAttributes> | null;
  };
  brand?: {
    data: StrapiEntity<BrandAttributes> | null;
  };
  reviews?: {
    data: StrapiEntity<ReviewAttributes>[];
  };
  createdAt: string;
  updatedAt: string;
}

// Media attributes
export interface MediaAttributes {
  name: string;
  alternativeText?: string;
  caption?: string;
  width: number;
  height: number;
  formats?: {
    thumbnail?: MediaFormat;
    small?: MediaFormat;
    medium?: MediaFormat;
    large?: MediaFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: string;
  provider: string;
  createdAt: string;
  updatedAt: string;
}

export interface MediaFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  url: string;
}

// Brand attributes (if you have brand content type)
export interface BrandAttributes {
  name: string;
  slug: string;
  logo?: {
    data: StrapiEntity<MediaAttributes> | null;
  };
  createdAt: string;
  updatedAt: string;
}

// Review attributes (if you have review content type)
export interface ReviewAttributes {
  rating: number;
  comment: string;
  user?: any; // Define based on your user structure
  product?: {
    data: StrapiEntity<ProductAttributes> | null;
  };
  createdAt: string;
  updatedAt: string;
}

// Helper function to transform Strapi response to frontend format
export function transformCategory(strapiCategory: StrapiEntity<CategoryAttributes>) {
  return {
    id: strapiCategory.id.toString(),
    name: strapiCategory.attributes.name,
    name_bn: strapiCategory.attributes.name_bn,
    slug: strapiCategory.attributes.slug,
    image: strapiCategory.attributes.image?.data?.attributes.url || '',
    subCategories: strapiCategory.attributes.subCategories?.data.map(transformSubCategory) || [],
  };
}

export function transformSubCategory(strapiSubCategory: StrapiEntity<SubCategoryAttributes>) {
  return {
    id: strapiSubCategory.id.toString(),
    name: strapiSubCategory.attributes.name,
    name_bn: strapiSubCategory.attributes.name_bn,
    slug: strapiSubCategory.attributes.slug,
    image: strapiSubCategory.attributes.image?.data?.attributes.url || '',
    parentId: strapiSubCategory.attributes.category?.data?.id.toString() || '',
    categories: strapiSubCategory.attributes.childCategories?.data.map(transformChildCategory) || [],
  };
}

export function transformChildCategory(strapiChildCategory: StrapiEntity<ChildCategoryAttributes>) {
  return {
    id: strapiChildCategory.id.toString(),
    name: strapiChildCategory.attributes.name,
    name_bn: strapiChildCategory.attributes.name_bn,
    slug: strapiChildCategory.attributes.slug,
    image: strapiChildCategory.attributes.image?.data?.attributes.url || '',
    parentId: strapiChildCategory.attributes.subCategory?.data?.id.toString() || '',
  };
}

export function transformProduct(strapiProduct: StrapiEntity<ProductAttributes>) {
  return {
    id: strapiProduct.id.toString(),
    name: strapiProduct.attributes.name,
    name_bn: strapiProduct.attributes.name_bn,
    slug: strapiProduct.attributes.slug,
    image: strapiProduct.attributes.image?.data?.attributes.url || '',
    images: strapiProduct.attributes.images?.data.map(img => img.attributes.url) || [],
    price: strapiProduct.attributes.price,
    discountPrice: strapiProduct.attributes.discountPrice,
    unit: strapiProduct.attributes.unit,
    description: strapiProduct.attributes.description,
    description_bn: strapiProduct.attributes.description_bn,
    categoryId: strapiProduct.attributes.category?.data?.id.toString() || '',
    subCategoryId: strapiProduct.attributes.subCategory?.data?.id.toString() || '',
    childCategoryId: strapiProduct.attributes.childCategory?.data?.id.toString(),
    inStock: strapiProduct.attributes.inStock,
    isPopular: strapiProduct.attributes.isPopular,
    isFlashSale: strapiProduct.attributes.isFlashSale,
    flashSaleEndDate: strapiProduct.attributes.flashSaleEndDate,
  };
}

// API helper functions
export const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export async function fetchCategories() {
  const response = await fetch(
    `${STRAPI_URL}/api/categories?populate[subCategories][populate][childCategories]=*&populate[image]=*&populate[subCategories][populate][image]=*&populate[subCategories][populate][childCategories][populate][image]=*`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  
  const data: StrapiResponse<StrapiEntity<CategoryAttributes>[]> = await response.json();
  return data.data.map(transformCategory);
}

export async function fetchProducts(filters?: {
  categorySlug?: string;
  subCategorySlug?: string;
  childCategorySlug?: string;
  isFlashSale?: boolean;
  isPopular?: boolean;
}) {
  let url = `${STRAPI_URL}/api/products?populate=*`;
  
  if (filters?.categorySlug) {
    url += `&filters[category][slug][$eq]=${filters.categorySlug}`;
  }
  
  if (filters?.subCategorySlug) {
    url += `&filters[subCategory][slug][$eq]=${filters.subCategorySlug}`;
  }
  
  if (filters?.childCategorySlug) {
    url += `&filters[childCategory][slug][$eq]=${filters.childCategorySlug}`;
  }
  
  if (filters?.isFlashSale !== undefined) {
    url += `&filters[isFlashSale][$eq]=${filters.isFlashSale}`;
  }
  
  if (filters?.isPopular !== undefined) {
    url += `&filters[isPopular][$eq]=${filters.isPopular}`;
  }
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  
  const data: StrapiResponse<StrapiEntity<ProductAttributes>[]> = await response.json();
  return data.data.map(transformProduct);
}

export async function fetchProductBySlug(slug: string) {
  const response = await fetch(
    `${STRAPI_URL}/api/products?filters[slug][$eq]=${slug}&populate=*`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }
  
  const data: StrapiResponse<StrapiEntity<ProductAttributes>[]> = await response.json();
  
  if (data.data.length === 0) {
    return null;
  }
  
  return transformProduct(data.data[0]);
}
