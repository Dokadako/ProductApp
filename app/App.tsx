"use client"
import React from 'react';
import Products from './components/Products';
import ProductCreation from './components/ProductCreation.1';

const App = () => {
    return (
        <div>
        <h1>Olx na minimalkax</h1>
        <ProductCreation />
        <Products />
    </div>
    );
};

export default App;
