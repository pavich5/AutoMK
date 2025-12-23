import { useTranslation } from 'react-i18next';
import { Heart } from 'lucide-react';
import CarCard from '../components/CarCard';
import { Car } from '../../types/car';

interface FavoritesProps {
  cars: Car[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export default function Favorites({ cars, favorites, onToggleFavorite }: FavoritesProps) {
  const { t } = useTranslation();

  const favoriteCars = cars.filter(car => favorites.includes(car.id));

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl mb-8">{t('favorites.title')}</h1>

      {favoriteCars.length === 0 ? (
        <div className="text-center py-20">
          <Heart className="w-24 h-24 mx-auto mb-4 text-gray-300" />
          <h2 className="text-2xl text-gray-500 mb-2">{t('favorites.empty')}</h2>
          <p className="text-gray-400">{t('favorites.empty_subtitle')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoriteCars.map(car => (
            <CarCard
              key={car.id}
              car={car}
              isFavorite={true}
              onToggleFavorite={() => onToggleFavorite(car.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
