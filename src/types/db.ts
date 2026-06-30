// src/types/db.ts

export type UserRole = 'user' | 'admin';

export interface IUser {
  id: string;
  name: string;
  email: string;
  password?: string; // Optional because we omit it when returning user objects
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export type PropertyStatus = 'available' | 'pending' | 'sold' | 'rented';

export interface IPropertyFeatures {
  bedrooms: number;
  bathrooms: number;
  areaSqFt: number;
  parkingSpaces?: number;
  hasPool?: boolean;
  hasGarden?: boolean;
  yearBuilt?: number;
}

export interface IProperty {
  id: string;
  title: string;
  slug: string; // URL-safe slug for SEO paths
  description: string;
  price: number;
  location: {
    address: string;
    city: string;
    state?: string;
    zipCode?: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  features: IPropertyFeatures;
  status: PropertyStatus;
  images: string[]; // URLs of property images
  createdAt: Date;
  updatedAt: Date;
}

export type InquiryStatus = 'pending' | 'reviewed' | 'contacted' | 'resolved';

export interface IInquiry {
  id: string;
  userId: string; // Foreign key / Reference
  propertyId: string; // Foreign key / Reference
  message: string;
  status: InquiryStatus;
  createdAt: Date;
  updatedAt: Date;
  
  // Populated fields (optional representation)
  user?: Partial<IUser>;
  property?: Partial<IProperty>;
}
