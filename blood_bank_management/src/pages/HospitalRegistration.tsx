import React, { forwardRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Building2, Phone, Mail, MapPin, Droplet, User, HeartHandshake } from 'lucide-react';
import type { Hospital } from '../types';
import { useNavigate } from 'react-router-dom';
import { Dialog } from '@headlessui/react';

const hospitalSchema = z.object({
  name: z.string().min(2, 'Hospital name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Invalid phone number'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  unit: z.string(),
  blood_group: z.string(),
  contactPerson: z.string().min(2, 'Contact person name is required'),
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
      {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
    </div>
  );
});

FormField.displayName = 'FormField';

export default function HospitalRegistration() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Hospital>({
    resolver: zodResolver(hospitalSchema),
  });

  const onSubmit = async (data: Hospital) => {
    try {
      const response = await fetch('http://localhost:5001/api/hospitals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to register hospital');
      }

      toast.success('Hospital registered successfully!', { position: 'top-right' });
      reset();
      setIsOpen(true);
    } catch (error: any) {
      toast.error(error.message || 'Something went wrong!', { position: 'top-right' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <ToastContainer />  {/* Add this line to enable toasts */}
      
      <div className="bg-red-50 rounded-lg p-8 mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Building2 className="h-12 w-12 text-red-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Hospital Registration</h1>
            <p className="text-gray-600">Join our network of healthcare providers</p>
          </div>
        </div>
        <img
          src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80"
          alt="Hospital Building"
          className="w-full h-48 object-cover rounded-lg mb-8"
        />
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Building2 className="h-5 w-5 text-red-600" />
            Hospital Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label="Hospital Name"
              error={errors.name}
              icon={<Building2 className="h-5 w-5 text-gray-400" />}
              {...register('name')}
            />

            <FormField
              label="Contact Person"
              error={errors.contactPerson}
              icon={<User className="h-5 w-5 text-gray-400" />}
              {...register('contactPerson')}
            />

            <FormField
              label="Email"
              type="email"
              error={errors.email}
              icon={<Mail className="h-5 w-5 text-gray-400" />}
              {...register('email')}
            />

            <FormField
              label="Phone Number"
              type="tel"
              error={errors.phone}
              icon={<Phone className="h-5 w-5 text-gray-400" />}
              {...register('phone')}
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

            <FormField
              label="Blood Group"
              error={errors.blood_group}
              icon={<Droplet className="h-5 w-5 text-gray-400" />}
              {...register('blood_group')}
            />

            <FormField
              label="Units"
              error={errors.unit}
              icon={<Droplet className="h-5 w-5 text-gray-400" />}
              {...register('unit')}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 flex items-center gap-2"
          >
            <Building2 className="h-5 w-5" />
            Register Hospital
          </button>
        </div>
      </form>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-sm text-center transform transition-all scale-95 animate-fadeIn">
          
          {/* Blood Drop Icon */}
          <div className="flex justify-center">
            <Droplet className="text-red-600 w-16 h-16" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-4">Thank You for Registering!</h2>
          <p className="text-gray-600 mt-2">Your contribution can save lives. Let's make a difference together.</p>

          {/* Call to action */}
          <div className="flex flex-col mt-6 gap-3">
            <button 
              className="bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium flex items-center justify-center gap-2"
              onClick={() => {
                setIsOpen(false);
                navigate('/'); 
              }}
            >
              <HeartHandshake className="w-5 h-5" /> Find Blood Donation Camps
            </button>
            
            <button 
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-medium"
              onClick={() => {
                setIsOpen(false);
                navigate('/'); 
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
