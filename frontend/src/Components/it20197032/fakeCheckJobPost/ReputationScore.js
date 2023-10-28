import React, { useState } from 'react';

const ReputationCalculator = () => {
  const [companyName, setCompanyName] = useState('');
  const [rating, setRating] = useState(null);
  const [reputationScore, setReputationScore] = useState(null);
  const [error, setError] = useState(null);

  const calculateReputationScore = () => {
    const apiKey = 'AIzaSyB5z0b68aGnk09gWTiwlP7YsaZ7OCx4okE';

    fetch(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${companyName}&inputtype=textquery&fields=rating&key=${apiKey}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const fetchedRating = data.candidates[0]?.rating || 0;
        const calculatedScore = (fetchedRating / 5) * 100;

        setRating(fetchedRating);
        setReputationScore(calculatedScore);
        setError(null);
      })
      .catch(error => {
        console.error('Error fetching data from Google Places API', error);
        setError('Error fetching data from Google Places API');
      });
  };

  return (
    <div>
      <label htmlFor="companyName">Enter Company Name: </label>
      <input
        type="text"
        id="companyName"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
      />
      <button onClick={calculateReputationScore}>Calculate</button>

      {error && <p>{error}</p>}

      {rating !== null && reputationScore !== null && (
        <div>
          <p>Rating: {rating}</p>
          <p>Reputation Score: {reputationScore}</p>
        </div>
      )}
    </div>
  );
};

export default ReputationCalculator;
