import { IProperty, IInquiry, IUser } from '../types/db';

export const mapPrismaUserToIUser = (u: any): IUser => {
  return {
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role as any,
    createdAt: u.createdAt,
    updatedAt: u.updatedAt
  };
};

export const mapPrismaPropertyToIProperty = (p: any): IProperty => {
  return {
    id: p.id,
    title: p.title,
    slug: p.slug,
    description: p.description,
    price: Number(p.price),
    location: {
      address: p.address,
      city: p.city,
      state: p.state || undefined,
      zipCode: p.zipCode || undefined,
      coordinates:
        p.latitude !== null && p.longitude !== null
          ? {
              lat: p.latitude,
              lng: p.longitude,
            }
          : undefined,
    },
    features: {
      bedrooms: p.bedrooms,
      bathrooms: p.bathrooms,
      areaSqFt: p.areaSqFt,
      parkingSpaces: p.parkingSpaces,
      hasPool: p.hasPool,
      hasGarden: p.hasGarden,
      yearBuilt: p.yearBuilt || undefined,
    },
    status: p.status as any,
    images: p.images,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt,
  };
};

export const mapPrismaInquiryToIInquiry = (i: any): IInquiry => {
  return {
    id: i.id,
    userId: i.userId,
    propertyId: i.propertyId,
    message: i.message,
    status: i.status as any,
    createdAt: i.createdAt,
    updatedAt: i.updatedAt,
    user: i.user ? mapPrismaUserToIUser(i.user) : undefined,
    property: i.property ? mapPrismaPropertyToIProperty(i.property) : undefined,
  };
};
