export interface User {
  id: string;
  email: string;
  role: 'donor' | 'hospital' | 'admin';
}

export interface Donor {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  bloodGroup: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  lastDonation?: Date;
  ageConfirmation: boolean;
  medicalQuestions: {
    recentIllness: boolean;
    heartCondition: boolean;
    bloodPressure: boolean;
    diabetes: boolean;
    hepatitis: boolean;
    hiv: boolean;
    medication: boolean;
    surgery: boolean;
    pregnancy: boolean;
    vaccination: boolean;
  };
}

export interface Hospital {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  contactPerson: string;
  approved: boolean;
  unit : string;
  blood_group : string;
  bloodStock: BloodStock;
}

export interface BloodStock {
  'A+': number;
  'A-': number;
  'B+': number;
  'B-': number;
  'AB+': number;
  'AB-': number;
  'O+': number;
  'O-': number;
}