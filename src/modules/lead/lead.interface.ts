export interface ICreateLeadInput {
  name?: string;
  email?: string;
  phone?: string;
  phoneNumber?: string;
  message?: string;
  propertyId?: string;
}

export interface IUpdateLeadInput {
  status?: string;
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}
