import React from 'react';
import Products from './components/Products';
import ProductCreation from './components/ProductCreation.1';

const App = () => {
    return (
        <div className="bg-gray-100 min-h-screen">
            <header className="bg-blue-500 text-white py-4">
                <div className="max-w-4xl mx-auto px-4">
                    <h1 className="text-2xl font-bold">Product App</h1>
                </div>
            </header>
            <div className="max-w-4xl mx-auto px-4 py-8">
                <ProductCreation />
                <Products />
            </div>
        </div>
    );
};

export default App;
