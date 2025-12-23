import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import CarCard from '../components/CarCard';
import { MOCK_CARS, BRANDS } from '../../data/cars.mock';

export default function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');

  const featuredCars = MOCK_CARS.filter(car => car.featured);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.append('q', searchQuery);
    if (selectedBrand) params.append('brand', selectedBrand);
    navigate(`/cars?${params.toString()}`);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl mb-4">
              {t('home.hero_title')}
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              {t('home.hero_subtitle')}
            </p>

            {/* Search Bar */}
            <div className="bg-white p-4 rounded-lg shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Input
                  placeholder={t('home.search_placeholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="col-span-1 md:col-span-2"
                />
                <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('filters.brand')} />
                  </SelectTrigger>
                  <SelectContent>
                    {BRANDS.map(brand => (
                      <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={handleSearch}
                className="w-full mt-3 gap-2"
                size="lg"
              >
                <Search className="w-5 h-5" />
                {t('common.search')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cars */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl">{t('home.featured_cars')}</h2>
          <Link to="/cars">
            <Button variant="outline" className="gap-2">
              {t('home.view_all')}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredCars.map(car => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl mb-4">{t('home.sell_cta')}</h2>
          <Link to="/sell">
            <Button size="lg" className="mt-4">
              {t('nav.sell')}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
