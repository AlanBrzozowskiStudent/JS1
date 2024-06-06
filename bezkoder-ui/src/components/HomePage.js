import React, { useState } from 'react';
import AdsList from './AdsList'; // Załóżmy, że ten komponent już istnieje
import axios from 'axios';

const HomePage = () => {

  return (
    <div>
      <h1>Strona główna</h1>
      <AdsList/>
    </div>
  );
};

export default HomePage;
