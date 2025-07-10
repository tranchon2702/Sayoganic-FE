import React from 'react';

export interface Category {
  id: string;
  _id?: string; // Thêm _id để tương thích với backend
  name: string;
  slug: string;
  description: string;
  image?: string;
}

export interface NewsCategory {
  id: string;
  _id?: string; // Thêm _id để tương thích với backend
  name: string;
  slug: string;
}

export interface Product {
  id: string;
  _id?: string; // Thêm _id để tương thích với backend
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: Category;
  rating?: number;
  reviewCount?: number;
  stock?: number;
  isNewProduct?: boolean;
  isHot?: boolean;
  isFeatured?: boolean;
  description?: string;
  features?: string[];
  specifications?: Record<string, string>;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: Category | string;
}

export interface NewsItem {
  id: string;
  _id?: string; // Thêm _id để tương thích với backend
  title: string;
  excerpt: string;
  content: string;
  image?: string;
  publishedAt: string;
  createdAt?: string; // Thêm createdAt để tương thích với backend
  author: string;
  category: string | NewsCategory;
  categoryName?: string; // Thêm categoryName để lưu tên danh mục
  slug: string;
}

export interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  comment: string;
  avatar: string;
}

export interface BannerSlide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  cta: string;
  link: string;
}

export interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}
