import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { Filter, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import CarCard from '../components/CarCard';
import FiltersPanel from '../components/FiltersPanel';
import { Car, CarFilters, SortOption } from '../../types/car';

interface ListingsProps {
  cars: Car[];
  favorites: string[];
  compareList: string[];
  onToggleFavorite: (id: string) => void;
  onToggleCompare: (id: string) => void;
}

export default function Listings({ cars, favorites, compareList, onToggleFavorite, onToggleCompare }: ListingsProps) {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState<CarFilters>({});
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [filteredCars, setFilteredCars] = useState<Car[]>(cars);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Apply filters from URL params
  useEffect(() => {
    const brand = searchParams.get('brand');
    const query = searchParams.get('q');
    
    if (brand) {
      setFilters(prev => ({ ...prev, brands: [brand] }));
    }
  }, [searchParams]);

  // Filter and sort cars
  useEffect(() => {
    let result = [...cars];

    // Apply filters
    if (filters.brands && filters.brands.length > 0) {
      result = result.filter(car => filters.brands!.includes(car.brand));
    }
    if (filters.models && filters.models.length > 0) {
      result = result.filter(car => filters.models!.includes(car.model));
    }
    if (filters.priceFrom) {
      result = result.filter(car => car.price >= filters.priceFrom!);
    }
    if (filters.priceTo) {
      result = result.filter(car => car.price <= filters.priceTo!);
    }
    if (filters.yearFrom) {
      result = result.filter(car => car.year >= filters.yearFrom!);
    }
    if (filters.yearTo) {
      result = result.filter(car => car.year <= filters.yearTo!);
    }
    if (filters.mileageFrom) {
      result = result.filter(car => car.mileage >= filters.mileageFrom!);
    }
    if (filters.mileageTo) {
      result = result.filter(car => car.mileage <= filters.mileageTo!);
    }
    if (filters.fuelTypes && filters.fuelTypes.length > 0) {
      result = result.filter(car => filters.fuelTypes!.includes(car.fuel));
    }
    if (filters.transmissions && filters.transmissions.length > 0) {
      result = result.filter(car => filters.transmissions!.includes(car.transmission));
    }
    if (filters.bodyTypes && filters.bodyTypes.length > 0) {
      result = result.filter(car => filters.bodyTypes!.includes(car.bodyType));
    }
    if (filters.locations && filters.locations.length > 0) {
      result = result.filter(car => filters.locations!.includes(car.location));
    }
    if (filters.firstOwner) {
      result = result.filter(car => car.firstOwner);
    }
    if (filters.accidentFree) {
      result = result.filter(car => car.accidentFree);
    }
    if (filters.equipment && filters.equipment.length > 0) {
      result = result.filter(car => 
        filters.equipment!.every(eq => car.equipment.includes(eq))
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        break;
      case 'oldest':
        result.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
        break;
      case 'price_low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'mileage_low':
        result.sort((a, b) => a.mileage - b.mileage);
        break;
      case 'mileage_high':
        result.sort((a, b) => b.mileage - a.mileage);
        break;
      case 'year_new':
        result.sort((a, b) => b.year - a.year);
        break;
      case 'year_old':
        result.sort((a, b) => a.year - b.year);
        break;
    }

    setFilteredCars(result);
  }, [cars, filters, sortBy]);

  const clearFilters = () => {
    setFilters({});
  };

  const activeFiltersCount = Object.values(filters).filter(v => 
    Array.isArray(v) ? v.length > 0 : v !== undefined
  ).length;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl">
          {t('nav.cars')}
          <span className="text-gray-500 text-xl ml-3">
            ({filteredCars.length})
          </span>
        </h1>

        <div className="flex items-center gap-3">
          {/* Mobile Filter Button */}
          <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="md:hidden gap-2">
                <Filter className="w-4 h-4" />
                {t('common.filter')}
                {activeFiltersCount > 0 && (
                  <span className="bg-blue-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full sm:max-w-md overflow-y-auto">
              <SheetHeader>
                <SheetTitle>{t('filters.title')}</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <FiltersPanel filters={filters} onFiltersChange={setFilters} />
              </div>
            </SheetContent>
          </Sheet>

          <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">{t('sort.newest')}</SelectItem>
              <SelectItem value="oldest">{t('sort.oldest')}</SelectItem>
              <SelectItem value="price_low">{t('sort.price_low')}</SelectItem>
              <SelectItem value="price_high">{t('sort.price_high')}</SelectItem>
              <SelectItem value="mileage_low">{t('sort.mileage_low')}</SelectItem>
              <SelectItem value="mileage_high">{t('sort.mileage_high')}</SelectItem>
              <SelectItem value="year_new">{t('sort.year_new')}</SelectItem>
              <SelectItem value="year_old">{t('sort.year_old')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-sm text-gray-600">{t('filters.title')}:</span>
          {filters.brands && filters.brands.map(brand => (
            <Button
              key={brand}
              variant="secondary"
              size="sm"
              onClick={() => setFilters(prev => ({
                ...prev,
                brands: prev.brands?.filter(b => b !== brand)
              }))}
              className="gap-2"
            >
              {brand}
              <X className="w-3 h-3" />
            </Button>
          ))}
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            {t('filters.clear')}
          </Button>
        </div>
      )}

      <div className="flex gap-6">
        {/* Desktop Filters Sidebar */}
        <aside className="hidden md:block w-80 flex-shrink-0">
          <div className="sticky top-20">
            <FiltersPanel filters={filters} onFiltersChange={setFilters} />
          </div>
        </aside>

        {/* Cars Grid */}
        <div className="flex-1">
          {filteredCars.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-500">{t('common.no_results')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCars.map(car => (
                <CarCard
                  key={car.id}
                  car={car}
                  isFavorite={favorites.includes(car.id)}
                  isComparing={compareList.includes(car.id)}
                  onToggleFavorite={() => onToggleFavorite(car.id)}
                  onToggleCompare={() => onToggleCompare(car.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
