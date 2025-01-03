import React, { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';

const AthleteSignupForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    sport: '',
    school: '',
    league: '',
    position: '',
    experience: '',
    instagram: '',
    twitter: '',
    tiktok: '',
    address: '',
  });

  const formatPhoneNumber = (phone) => {
    // Remove all non-digit characters
    const digitsOnly = phone.replace(/\D/g, '');
    
    // If the number already starts with 1 and has 11 digits, use as is
    // If it's 10 digits, add 1 at the start
    // Otherwise, return the original cleaned number with 1 prepended
    if (digitsOnly.length === 10) {
      return `1${digitsOnly}`;
    } else if (digitsOnly.length === 11 && digitsOnly.startsWith('1')) {
      return digitsOnly;
    } else {
      // For any other case, we'll still format it but this might need validation
      return `1${digitsOnly.slice(-10)}`;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const scriptUrl = "https://script.google.com/macros/s/AKfycbyj8W6jKgF9Z52cY3SNcSFtWGN7fmT7vwYqOaHmN-PQJpP-1b8BEIh1TL5ORMzK8XwT/exec";
    
    const formPayload = new URLSearchParams();
    
    // Format the data with phone number formatting
    const formattedData = {
      ...formData,
      phone: formatPhoneNumber(formData.phone)
    };
    
    Object.entries(formattedData).forEach(([key, value]) => {
      formPayload.append(key, value);
    });
    
    try {
      const response = await fetch(scriptUrl, {
        method: 'POST',
        body: formPayload,
      });
  
      if (response.ok) {
        alert('Success! Your registration has been recorded.');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          dateOfBirth: '',
          sport: '',
          school: '',
          league: '',
          position: '',
          experience: '',
          instagram: '',
          twitter: '',
          tiktok: '',
          address: '',
        });
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      alert('Error submitting form.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    const addressInput = document.getElementById('address-input');
    const schoolInput = document.getElementById('school-input');

    if (window.google) {
      const addressAutocomplete = new window.google.maps.places.Autocomplete(addressInput, {
        types: ['address']
      });
      const schoolAutocomplete = new window.google.maps.places.Autocomplete(schoolInput, {
        types: ['establishment']
      });

      addressAutocomplete.addListener('place_changed', () => {
        const place = addressAutocomplete.getPlace();
        setFormData(prev => ({
          ...prev,
          address: place.formatted_address || ''
        }));
      });

      schoolAutocomplete.addListener('place_changed', () => {
        const place = schoolAutocomplete.getPlace();
        setFormData(prev => ({
          ...prev,
          school: place.name || ''
        }));
      });
    }
  }, []);

  // Add keyframes for progress bar animation
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes progressBar {
        0% { width: 0%; }
        50% { width: 100%; }
        100% { width: 0%; }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const inputStyle = "w-full p-2 rounded-lg bg-gray-800/50 border border-gray-700/50 text-white placeholder-gray-400 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 backdrop-blur-sm transition-all duration-200";
  const labelStyle = "block text-sm font-medium text-gray-300 mb-1";
  const sectionStyle = "rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 backdrop-blur-sm border border-gray-700/30";
  const sectionHeaderStyle = "text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-300";

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-6">
      <div className="max-w-2xl mx-auto rounded-3xl bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm p-8 shadow-2xl border border-gray-800/50" 
           style={{
             boxShadow: `
               0 0 40px 0 rgba(0,0,0,0.3),
               inset 0 0 80px 0 rgba(0,0,0,0.2),
               0 0 4px 2px rgba(100,149,237,0.1)
             `
           }}>
        
        <h1 className="text-3xl font-bold mb-6 text-white text-center bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
          Athlete Registration
        </h1>
        
        <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-blue-900/30 to-blue-800/30 border border-blue-500/30 backdrop-blur-sm">
          <AlertCircle className="h-4 w-4 inline-block mr-2 text-blue-400" />
          <span className="text-blue-100">
            <strong>Important:</strong> One of our team members will contact you within 24 hours.
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className={sectionStyle}>
            <h2 className={sectionHeaderStyle}>Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelStyle}>First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className={inputStyle}
                />
              </div>
              <div>
                <label className={labelStyle}>Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className={inputStyle}
                />
              </div>
              <div>
                <label className={labelStyle}>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={inputStyle}
                />
              </div>
              <div>
                <label className={labelStyle}>Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className={inputStyle}
                />
              </div>
              <div>
                <label className={labelStyle}>Date of Birth *</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                  className={inputStyle}
                />
              </div>
              <div>
                <label className={labelStyle}>Address *</label>
                <input
                  id="address-input"
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  placeholder="Start typing to search..."
                  className={inputStyle}
                />
              </div>
            </div>
          </div>

          {/* Athletic Information */}
          <div className={sectionStyle}>
            <h2 className={sectionHeaderStyle}>Athletic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelStyle}>Sport *</label>
                <input
                  type="text"
                  name="sport"
                  value={formData.sport}
                  onChange={handleChange}
                  required
                  className={inputStyle}
                />
              </div>
              <div>
                <label className={labelStyle}>School/Team *</label>
                <input
                  id="school-input"
                  type="text"
                  name="school"
                  value={formData.school}
                  onChange={handleChange}
                  required
                  placeholder="Search for your school..."
                  className={inputStyle}
                />
              </div>
              <div>
                <label className={labelStyle}>Conference</label>
                <input
                  type="text"
                  name="league"
                  value={formData.league}
                  onChange={handleChange}
                  className={inputStyle}
                />
              </div>
              <div>
                <label className={labelStyle}>Position</label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className={inputStyle}
                />
              </div>
              <div className="md:col-span-2">
                <label className={labelStyle}>Experience (years)</label>
                <input
                  type="number"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  min="0"
                  className={inputStyle}
                />
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className={sectionStyle}>
            <h2 className={sectionHeaderStyle}>Social Media</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className={labelStyle}>Instagram</label>
                <input
                  type="text"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleChange}
                  placeholder="@username"
                  className={inputStyle}
                />
              </div>
              <div>
                <label className={labelStyle}>Twitter</label>
                <input
                  type="text"
                  name="twitter"
                  value={formData.twitter}
                  onChange={handleChange}
                  placeholder="@username"
                  className={inputStyle}
                />
              </div>
              <div>
                <label className={labelStyle}>TikTok</label>
                <input
                  type="text"
                  name="tiktok"
                  value={formData.tiktok}
                  onChange={handleChange}
                  placeholder="@username"
                  className={inputStyle}
                />
              </div>
            </div>
          </div>

          {isSubmitting && (
            <div className="mb-4">
              <div className="w-full bg-gray-700/30 rounded-full h-2 mb-1">
                <div className="bg-blue-500 h-2 rounded-full animate-[progressBar_2s_ease-in-out_infinite]"></div>
              </div>
              <p className="text-sm text-gray-400 text-center">Submitting your registration...</p>
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium
                       hover:from-blue-500 hover:to-blue-600 transition-all duration-200 transform hover:scale-105
                       border border-blue-500/30 backdrop-blur-sm"
              style={{
                opacity: isSubmitting ? 0.7 : 1,
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                boxShadow: `
                  0 0 20px 0 rgba(37,99,235,0.3),
                  inset 0 0 20px 0 rgba(37,99,235,0.2)
                `
              }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AthleteSignupForm;
