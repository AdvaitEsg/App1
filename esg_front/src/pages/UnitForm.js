import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Units = () => {
  const [units, setUnits] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [name, setName] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [operationalLocation, setOperationalLocation] = useState('');
  const [primaryActivity, setPrimaryActivity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [unitsRes, companiesRes] = await Promise.all([
          axios.get('/api/units/'),
          axios.get('/api/companies/')
        ]);
        setUnits(unitsRes.data);
        setCompanies(companiesRes.data);
      } catch (err) {
        setError('Failed to load data. Please try again.');
        console.error('Fetch error:', err);
      }
    };
    fetchData();
  }, []);

  const addUnit = async (e) => {
    e.preventDefault();
    if (!name || !companyId || !operationalLocation || !primaryActivity) {
      setError('Please fill all required fields');
      return;
    }
    setLoading(true);
    try {
      await axios.post('/api/units/', { 
        name, 
        company: companyId,
        operational_location: operationalLocation,
        primary_activity: primaryActivity,
      });
      const unitsRes = await axios.get('/api/units/');
      setUnits(unitsRes.data);
      setName('');
      setCompanyId('');
      setOperationalLocation('');
      setPrimaryActivity('');
      setError('');
    } catch (err) {
      if (err.response) {
        console.error('POST error:', err.response.data);
        setError(err.response.data.detail || JSON.stringify(err.response.data));
      } else {
        console.error('POST error:', err);
        setError('Unknown error');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Business Units</h1>
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      <form onSubmit={addUnit} className="mb-4 space-x-2">
        <input
          type="text"
          placeholder="Unit name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2"
          required
        />
        <select 
          value={companyId} 
          onChange={(e) => setCompanyId(e.target.value)}
          className="border p-2"
          required
        >
          <option value="">Select Company</option>
          {companies.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Operational Location"
          value={operationalLocation}
          onChange={(e) => setOperationalLocation(e.target.value)}
          className="border p-2"
          required
        />
        <input
          type="text"
          placeholder="Primary Activity"
          value={primaryActivity}
          onChange={(e) => setPrimaryActivity(e.target.value)}
          className="border p-2"
          required
        />
        <button 
          type="submit" 
          className="bg-green-500 text-white px-4 py-2"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Unit'}
        </button>
      </form>
      <ul className="list-disc pl-5">
        {units.map((u) => (
          <li key={u.id} className="mb-2">
            <span className="font-medium">{u.name}</span> - 
            {u.company?.name || 'No company assigned'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Units;

