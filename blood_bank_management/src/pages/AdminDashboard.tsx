import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Users,
  Droplet,
  Activity,
  AlertCircle,
  AlertTriangle,
  ThumbsUp,
  TrendingUp,
} from 'lucide-react';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'donors' | 'hospitals'>('donors');
  const [donors, setDonors] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [bloodGroups, setBloodGroups] = useState([]);
  const [stats, setStats] = useState({
    totalDonors: 0,
    totalBloodUnits: 0,
  });

  useEffect(() => {
    fetchDonors();
    fetchHospitals();
  }, []);

  useEffect(() => {
    if (donors.length > 0) {
      calculateBloodGroups(donors);
    }
  }, [donors]);

  const fetchDonors = async () => {
    try {
      const response = await axios.get('https://blood-bank-management-reot.onrender.com/api/donors/all');
      console.log("***********" , response.data)
      setDonors(response.data);
    } catch (error) {
      console.error('Error fetching donors:', error);
    }
  };

  const fetchHospitals = async () => {
    try {
      const response = await axios.get('https://blood-bank-management-reot.onrender.com/api/hospitals');
      
      setHospitals(response.data);
    } catch (error) {
      console.error('Error fetching hospitals:', error);
    }
  };

  const calculateBloodGroups = (donors) => {
    const bloodData = {
      'A+': { count: 0, minRequired: 5 },
      'A-': { count: 0, minRequired: 5 },
      'B+': { count: 0, minRequired: 5 },
      'B-': { count: 0, minRequired: 5 },
      'O+': { count: 0, minRequired: 10 },
      'O-': { count: 0, minRequired: 8 },
      'AB+': { count: 0, minRequired: 5 },
      'AB-': { count: 0, minRequired: 5 },
    };

    donors.forEach((donor) => {
      if (bloodData[donor.bloodGroup]) {
        bloodData[donor.bloodGroup].count++;
      }
    });

    const updatedBloodGroups = Object.keys(bloodData).map((type) => {
      const data = bloodData[type];
      let status = 'normal';

      if (data.count === 0) status = 'critical';
      else if (data.count < data.minRequired) status = 'low';
      else if (data.count > data.minRequired * 2) status = 'excess';

      return {
        type,
        count: data.count,
        status,
        minRequired: data.minRequired,
      };
    });

    setBloodGroups(updatedBloodGroups);

    setStats({
      totalDonors: donors.length,
      totalBloodUnits: donors.length * 2,
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'critical':
        return 'bg-red-50 border-red-200';
      case 'low':
        return 'bg-orange-50 border-orange-200';
      case 'normal':
        return 'bg-green-50 border-green-200';
      case 'excess':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'critical':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'low':
        return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case 'normal':
        return <ThumbsUp className="h-5 w-5 text-green-500" />;
      case 'excess':
        return <TrendingUp className="h-5 w-5 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Activity className="h-8 w-8 text-red-600" />
            Blood Bank Dashboard
          </h1>
        </div>
      </header>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Donors', value: stats.totalDonors, icon: Users, color: 'text-blue-600' },
          { label: 'Total Blood Units (ml)', value: stats.totalBloodUnits, icon: Droplet, color: 'text-red-600' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-semibold">{stat.value}</p>
              </div>
              <stat.icon className={`h-10 w-10 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Blood Group Availability */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        {bloodGroups.map((group) => (
          <div key={group.type} className={`rounded-lg border-2 p-4 ${getStatusColor(group.status)}`}>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold">{group.type}</h3>
                <p className="text-sm">
                  Available: <span className="font-bold">{group.count}</span> units
                </p>
              </div>
              {getStatusIcon(group.status)}
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-6">
        {['donors', 'hospitals'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as 'donors' | 'hospitals')}
            className={`px-4 py-2 font-medium border-b-2 ${
              activeTab === tab
                ? 'border-red-500 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab === 'donors' ? 'Donor List' : 'Hospital List'}
          </button>
        ))}
      </div>

      {/* Donor List */}
      {activeTab === 'donors' && (
        <div className="max-w-7xl mx-auto px-4 overflow-x-auto">
          <table className="w-full border-collapse shadow-md rounded-lg">
            <thead className="bg-red-100 text-gray-700">
              <tr>
                <th className="p-4 text-left font-semibold">Name</th>
                <th className="p-4 text-left font-semibold">age</th>
                <th className="p-4 text-left font-semibold">Blood Group</th>
                <th className="p-4 text-left font-semibold">Gender</th>
                <th className="p-4 text-left font-semibold">Phone</th>
                <th className="p-4 text-left font-semibold">City</th>
              </tr>
            </thead>
            <tbody>
              {donors.map((donor) => (
                <tr key={donor._id} className="hover:bg-gray-100 border-b">
                  <td className="p-4">{donor.name}</td>
                  <td className="p-4">{donor.age}</td>
                  <td className="p-4">{donor.bloodGroup}</td>
                  <td className="p-4">{donor.gender}</td>
                  <td className="p-4">{donor.phone}</td>
                  <td className="p-4">{donor.city}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Hospital List */}
      {activeTab === 'hospitals' && (
        <div className="max-w-7xl mx-auto px-4 overflow-x-auto">
          <table className="w-full border-collapse shadow-md rounded-lg">
            <thead className="bg-blue-100 text-gray-700">
              <tr>
                <th className="p-4 text-left font-semibold">Name</th>
                <th className="p-4 text-left font-semibold">Email</th>
                <th className="p-4 text-left font-semibold">Phone</th>
                <th className="p-4 text-left font-semibold">Contact Person</th>
              </tr>
            </thead>
            <tbody>
              {hospitals.map((hospital) => (
                <tr key={hospital._id} className="hover:bg-gray-100 border-b">
                  <td className="p-4">{hospital.name}</td>
                  <td className="p-4">{hospital.email}</td>
                  <td className="p-4">{hospital.phone}</td>
                  <td className="p-4">{hospital.contactPerson}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
