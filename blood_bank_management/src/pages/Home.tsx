import React from 'react';
import { Link } from 'react-router-dom';
import { Droplet, Heart, Guitar as Hospital, Search, Clock, Award, MapPin, Bell } from 'lucide-react';

export default function Home() {
  const bloodTypes = ['A+', 'B+', 'O+', 'AB+', 'A-', 'B-', 'O-', 'AB-'];
  const emergencyContacts = [
    { city: 'New York', number: '1-800-RED-CROSS' },
    { city: 'Los Angeles', number: '1-888-BLOOD-NOW' },
    { city: 'Chicago', number: '1-877-DONATE-BLOOD' },
  ];

  return (
    <div className="space-y-12">
      <section className="relative bg-red-600 text-white rounded-2xl p-12 overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-5xl font-bold mb-6">
            Save Lives Through Blood Donation
          </h1>
          <p className="text-xl max-w-2xl mb-8 text-red-100">
            Connect blood donors with those in need through our innovative blood management system.
            Every donation can save up to three lives.
          </p>
          <div className="flex gap-4">
            <Link
              to="/donor-registration"
              className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors"
            >
              Become a Donor
            </Link>
            <Link
              to="#"
              onClick={() => window.location.href = 'https://www.redcrossblood.org/donate-blood/blood-types.html'}
              className="bg-red-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-800 transition-colors"
            >
              Find Blood
            </Link>

          </div>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 bg-red-500 transform skew-x-12 translate-x-1/2" />
      </section>

      <section className="grid md:grid-cols-3 gap-8">
        <FeatureCard
          icon={<Clock className="h-12 w-12 text-red-600" />}
          title="Quick Response"
          description="Get immediate access to blood donors in your area during emergencies."
          link={`https://www.google.com/maps/search/blood donor+near+me`}
          linkText="Search Now"
        />
        <FeatureCard
          icon={<Award className="h-12 w-12 text-red-600" />}
          title="Verified Hospitals"
          description="All hospitals in our network are verified and certified."
          link="/hospital-registration"
          linkText="Join Network"
        />
       <FeatureCard
        icon={<MapPin className="h-12 w-12 text-red-600" />}
        title="Location Based"
        description="Find donors and hospitals near you with our location-based search."
        link={`https://www.google.com/maps/search/hospitals+near+me`}
        linkText="Find Nearby"
      />

      </section>

      <section className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Blood Types</h2>
          <div className="grid grid-cols-4 gap-4">
            {bloodTypes.map((type) => (
              <div key={type} className="bg-red-50 p-4 rounded-lg text-center">
                <span className="text-2xl font-bold text-red-600">{type}</span>
                <p className="text-sm text-gray-600 mt-1">Available</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Updates</h2>
          <div className="space-y-4">
            <Update
              icon={<Bell className="h-5 w-5 text-blue-500" />}
              title="Blood Drive Event"
              description="Join our upcoming blood drive event this weekend."
              time="2 hours ago"
            />
            <Update
              icon={<Heart className="h-5 w-5 text-red-500" />}
              title="Emergency Request"
              description="Urgent need for O- blood type in City Hospital."
              time="5 hours ago"
            />
            <Update
              icon={<Hospital className="h-5 w-5 text-green-500" />}
              title="New Hospital Added"
              description="Memorial Healthcare joined our network."
              time="1 day ago"
            />
          </div>
        </div>
      </section>

      <section className="bg-red-50 rounded-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Emergency Contacts</h2>
            <p className="text-gray-600">24/7 blood bank emergency contact numbers</p>
          </div>
          <Heart className="h-16 w-16 text-red-600" />
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {emergencyContacts.map((contact) => (
            <div key={contact.city} className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold text-gray-900">{contact.city}</h3>
              <p className="text-red-600 font-bold">{contact.number}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description, link, linkText }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  linkText: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <Link
        to={link}
        className="inline-block bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
      >
        {linkText}
      </Link>
    </div>
  );
}

function Update({ icon, title, description, time }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  time: string;
}) {
  return (
    <div className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
      <div className="flex-shrink-0">
        <div className="bg-gray-100 p-2 rounded-full">{icon}</div>
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600">{description}</p>
        <span className="text-sm text-gray-500">{time}</span>
      </div>
    </div>
  );
}