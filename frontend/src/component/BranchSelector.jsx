import React, { useEffect, useState } from 'react';
import branch from './data/branch.json';
import { useNavigate } from 'react-router';

const BranchSelector = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [branches, setBranches] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    setCountries(branch.countries);
  }, []);

  const handleCountryChange = (e) => {
    const selected = e.target.value;
    setSelectedCountry(selected);
    setSelectedState('');
    setSelectedCity('');
    setSelectedBranch('');
    setCities([]);
    setBranches([]);

    const countryObj = branch.countries.find(
      (country) => country.country_name === selected
    );
    setStates(countryObj ? countryObj.states : []);
  };

  const handleStateChange = (e) => {
    const selected = e.target.value;
    setSelectedState(selected);
    setSelectedCity('');
    setSelectedBranch('');
    setBranches([]);

    const stateObj = states.find((state) => state.state_name === selected);
    setCities(stateObj ? stateObj.cities : []);
  };

  const handleCityChange = (e) => {
    const selected = e.target.value;
    setSelectedCity(selected);
    setSelectedBranch('');

    const cityObj = cities.find((city) => city.city_name === selected);
    setBranches(cityObj ? cityObj.branches : []);
  };

  const handleBranchChange = (e) => {
    setSelectedBranch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCountry && selectedState && selectedCity && selectedBranch) {
      // dispatch(addBranchInfo({ State: selectedState, City: selectedCity, Branch: selectedBranch }));
      const state = selectedState.split(" ").join("_")      
      const city = selectedCity.split(" ").join("_")      
      const Branch = selectedBranch.split(" ").join("_")      

      navigate(`/boi/${state}/${city}/${Branch}/dashboard`);
      // navigate('/dashboard');
    } else {
      alert('Please select all options before proceeding.');
    }
  };

  return (
    <div className='mx-[30%] rounded w-full h-full'>
      <form 
        onSubmit={handleSubmit}
        className='bg-white shadow-2xl rounded mt-20 w-[500px] h-[450px] p-12 space-y-4'
      >
        <div className='text-blue-700 text-4xl font-bold text-center mb-7'>
          Select Branch
        </div>

        <select 
          name="country"
          value={selectedCountry}
          required
          onChange={handleCountryChange}
          className="w-full p-2 hover:border-blue-700 shadow border rounded"
        >
          <option value="">Select Country</option>
          {countries.map((c, idx) => (
            <option key={idx} value={c.country_name}>
              {c.country_name}
            </option>
          ))}
        </select>

        <select
          name="state"
          value={selectedState}
          required
          onChange={handleStateChange}
          disabled={!states.length}
          className="w-full p-2 hover:border-blue-700 shadow border rounded"
        >
          <option value="">Select State</option>
          {states.map((s, idx) => (
            <option key={idx} value={s.state_name}>
              {s.state_name}
            </option>
          ))}
        </select>

        <select
          name="city"
          value={selectedCity}
          required
          onChange={handleCityChange}
          disabled={!cities.length}
          className="w-full p-2 border hover:border-blue-700 shadow rounded"
        >
          <option value="">Select City</option>
          {cities.map((c, idx) => (
            <option key={idx} value={c.city_name}>
              {c.city_name}
            </option>
          ))}
        </select>

        <select
          name="branch"
          value={selectedBranch}
          required
          onChange={handleBranchChange}
          disabled={!branches.length}
          className="w-full p-2 hover:border-blue-700 shadow border rounded"
        >
          <option value="">Select Branch</option>
          {branches.map((b, idx) => (
            <option key={idx} value={b.branch_name}>
              {b.branch_name} - {b.ifsc}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="text-white-500 w-full mt-7 hover:border-blue-700 shadow bg-blue-700 px-10 py-2 rounded hover:underline font-medium"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default BranchSelector;
