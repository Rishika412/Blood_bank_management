import React, { forwardRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Heart, AlertCircle, CheckCircle2, User, Phone, Mail, MapPin } from 'lucide-react';
import type { Donor } from '../types';
import { Dialog } from '@headlessui/react';
import Confetti from 'react-confetti';
import axios from 'axios';
import { DropletIcon, HeartHandshakeIcon } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const donorSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  age: z.number().min(18, 'Must be at least 18 years old').max(65, 'Must be under 65 years old'),
  gender: z.enum(['male', 'female', 'other']),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
  phone: z.string().min(10, 'Invalid phone number'),
  email: z.string().email('Invalid email address'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  ageConfirmation: z.literal(true, {
    errorMap: () => ({ message: 'You must be 18 or older to register' }),
  }),
  medicalQuestions: z.object({
    recentIllness: z.boolean(),
    heartCondition: z.boolean(),
    bloodPressure: z.boolean(),
    diabetes: z.boolean(),
    hepatitis: z.boolean(),
    hiv: z.boolean(),
    medication: z.boolean(),
    surgery: z.boolean(),
    pregnancy: z.boolean(),
    vaccination: z.boolean(),
  }),
});

const FormField = forwardRef<HTMLInputElement, {
  label: string;
  error?: { message?: string };
  icon?: React.ReactNode;
  [key: string]: any;
}>(({ label, error, icon, ...props }, ref) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-1 relative rounded-md shadow-sm">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={`block w-full rounded-md ${icon ? 'pl-10' : 'pl-3'} pr-3 py-2 border-gray-300 focus:ring-red-500 focus:border-red-500 ${
            error ? 'border-red-300' : ''
          }`}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error.message}</p>
      )}
    </div>
  );
});

FormField.displayName = 'FormField';

export default function DonorRegistration() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Donor>({
    resolver: zodResolver(donorSchema),
  });
  const navigate = useNavigate();

  const [showConfetti, setShowConfetti] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);

  const onSubmit = async (data: Donor) => {
    try {
      const response = await axios.post('https://blood-bank-management-reot.onrender.com/api/donors/register', data);
      console.log('Donor registered successfully:', response.data);
      setShowConfetti(true);
      setIsOpen(true);
      setTimeout(() => setShowConfetti(false), 5000);
      alert('Registration successful!');
    } catch (error) {
      console.error('Error registering donor:', error);
      alert('Registration failed. Please try again.');
    }
  };

  const medicalQuestions = [
    { id: 'recentIllness', question: 'Have you had any illness in the past 6 months?' },
    { id: 'heartCondition', question: 'Do you have any heart conditions?' },
    { id: 'bloodPressure', question: 'Do you have high/low blood pressure?' },
    { id: 'diabetes', question: 'Do you have diabetes?' },
    { id: 'hepatitis', question: 'Have you ever had hepatitis?' },
    { id: 'hiv', question: 'Have you been tested for HIV?' },
    { id: 'medication', question: 'Are you currently taking any medication?' },
    { id: 'surgery', question: 'Have you had surgery in the last 6 months?' },
    { id: 'pregnancy', question: 'For females: Are you pregnant or have been pregnant in the last 6 months?' },
    { id: 'vaccination', question: 'Have you received any vaccinations in the last month?' },
  ];


  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-red-50 rounded-lg p-8 mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Heart className="h-12 w-12 text-red-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Donor Registration</h1>
            <p className="text-gray-600">Join our community of life-savers</p>
          </div>
        </div>
        <img
          src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=1200&q=80"
          alt="Blood Donation"
          className="w-full h-48 object-cover rounded-lg mb-8"
        />
      </div>

      {showConfetti && <Confetti numberOfPieces={300} recycle={false} />} 
      
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {
            step === 1 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <User className="h-5 w-5 text-red-600" />
            Personal Information
          </h2>
          
         
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Full Name"
                error={errors.name}
                icon={<User className="h-5 w-5 text-gray-400" />}
                {...register('name')}
              />
              
              <FormField
                label="Age"
                type="number"
                error={errors.age}
                icon={<User className="h-5 w-5 text-gray-400" />}
                {...register('age', { valueAsNumber: true })}
              />
  
              <div>
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                <select
                  {...register('gender')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && (
                  <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>
                )}
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-700">Blood Group</label>
                <select
                  {...register('bloodGroup')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                >
                  {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((group) => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
                {errors.bloodGroup && (
                  <p className="mt-1 text-sm text-red-600">{errors.bloodGroup.message}</p>
                )}
              </div>
  
              <FormField
                label="Phone Number"
                type="tel"
                error={errors.phone}
                icon={<Phone className="h-5 w-5 text-gray-400" />}
                {...register('phone')}
              />
  
              <FormField
                label="Email"
                type="email"
                error={errors.email}
                icon={<Mail className="h-5 w-5 text-gray-400" />}
                {...register('email')}
              />
  
              <FormField
                label="Address"
                error={errors.address}
                icon={<MapPin className="h-5 w-5 text-gray-400" />}
                {...register('address')}
              />
  
              <FormField
                label="City"
                error={errors.city}
                icon={<MapPin className="h-5 w-5 text-gray-400" />}
                {...register('city')}
              />
  
              <FormField
                label="State"
                error={errors.state}
                icon={<MapPin className="h-5 w-5 text-gray-400" />}
                {...register('state')}
              />

            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="bg-red-600 text-white px-6 py-2 rounded-lg"
              >
                Next
              </button>
            </div>
            </div>
        </div>
         )
        }

        {
          step === 2 && (
            <>
            <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-600" />
            Medical Questionnaire
          </h2>
          
          <div className="space-y-4">
            {medicalQuestions.map((q) => (
              <div key={q.id} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg">
                <input
                  type="checkbox"
                  {...register(`medicalQuestions.${q.id}`)}
                  className="mt-1 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label className="text-gray-700">{q.question}</label>
              </div>
            ))}
          </div>
        </div>
          

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-red-600" />
            Confirmation
          </h2>
          
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              {...register('ageConfirmation')}
              className="mt-1 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
            />
            <div>
              <label className="text-gray-700">
                I confirm that I am 18 years or older and all the information provided is accurate.
              </label>
              {errors.ageConfirmation && (
                <p className="mt-1 text-sm text-red-600">{errors.ageConfirmation.message}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 flex items-center gap-2"
          >
            <Heart className="h-5 w-5" />
            Register as Donor
          </button>   
        </div>
        </>

)
}
      </form>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-sm text-center transform transition-all scale-95 animate-fadeIn">
        
        {/* Blood Drop Icon */}
        <div className="flex justify-center">
          <DropletIcon className="text-red-600 w-16 h-16" />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-4">Thank You for Registering!</h2>
        <p className="text-gray-600 mt-2">Your contribution can save lives. Let's make a difference together.</p>

        {/* Call to action */}
        <div className="flex flex-col mt-6 gap-3">
          <button 
            className="bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium transition flex items-center justify-center gap-2"
            onClick={() => {
              setIsOpen(false);
              navigate('/'); // Navigate to home
            }}
          >
            <HeartHandshakeIcon className="w-5 h-5" /> Find Blood Donation Camps
          </button>
          
          <button 
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-medium transition"
            onClick={() => {
              setIsOpen(false);
              navigate('/'); // Navigate to home
            }}
          >
            Close
          </button>
        </div>
      </div>
    </Dialog>
    </div>
  );
}