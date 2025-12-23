import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Listings from './pages/Listings';
import CarDetails from './pages/CarDetails';
import SellCar from './pages/SellCar';
import Favorites from './pages/Favorites';
import Compare from './pages/Compare';
import { Car } from '../types/car';
import { MOCK_CARS } from '../data/cars.mock';

export default function App() {
  const [cars, setCars] = useState<Car[]>(MOCK_CARS);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [compareList, setCompareList] = useState<string[]>([]);

  const toggleFavorite = (carId: string) => {
    setFavorites(prev => 
      prev.includes(carId) 
        ? prev.filter(id => id !== carId)
        : [...prev, carId]
    );
  };

  const toggleCompare = (carId: string) => {
    setCompareList(prev => {
      if (prev.includes(carId)) {
        return prev.filter(id => id !== carId);
      }
      if (prev.length >= 3) {
        return prev;
      }
      return [...prev, carId];
    });
  };

  const addCar = (car: Car) => {
    setCars(prev => [car, ...prev]);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/cars" 
              element={
                <Listings 
                  cars={cars}
                  favorites={favorites}
                  compareList={compareList}
                  onToggleFavorite={toggleFavorite}
                  onToggleCompare={toggleCompare}
                />
              } 
            />
            <Route 
              path="/cars/:id" 
              element={
                <CarDetails 
                  cars={cars}
                  favorites={favorites}
                  compareList={compareList}
                  onToggleFavorite={toggleFavorite}
                  onToggleCompare={toggleCompare}
                />
              } 
            />
            <Route path="/sell" element={<SellCar onAddCar={addCar} />} />
            <Route 
              path="/favorites" 
              element={
                <Favorites 
                  cars={cars}
                  favorites={favorites}
                  onToggleFavorite={toggleFavorite}
                />
              } 
            />
            <Route 
              path="/compare" 
              element={
                <Compare 
                  cars={cars}
                  compareList={compareList}
                  onRemove={(id) => setCompareList(prev => prev.filter(cId => cId !== id))}
                />
              } 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
