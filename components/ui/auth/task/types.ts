// types.ts
import { ReactElement } from 'react';

export type ViewType = 'vip' | 'summary' | 'preview' | 'grab' | 'result';

export interface VipTier {
  level: string;
  commission: string;
  orders: number;
  requirement: number;
  logo: ReactElement;
  color: string;
  bgColor: string;
}

export interface Product {
  id: number;
  name: string;
  brand: string;
  price: string;
  refund: string;
  commission: string;
  image: string;
  tv: string;
  category: string;
}

export interface ProductImages {
  tv: string;
  speaker: string;
  headphones: string;
  tvGif: string;
  speakerGif: string;
  headphonesGif: string;
}