import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Heart, Scale, Fuel, Gauge, Calendar, MapPin } from 'lucide-react';
import { Card, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Car } from '../../types/car';

interface CarCardProps {
  car: Car;
  isFavorite?: boolean;
  isComparing?: boolean;
  onToggleFavorite?: () => void;
  onToggleCompare?: () => void;
}

export default function CarCard({ car, isFavorite, isComparing, onToggleFavorite, onToggleCompare }: CarCardProps) {
  const { t } = useTranslation();

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <Link to={`/cars/${car.id}`}>
        <div className="relative h-48 bg-gray-200">
          <img
            src={car.images[0]}
            alt={`${car.brand} ${car.model}`}
            className="w-full h-full object-cover"
          />
          {car.featured && (
            <Badge className="absolute top-2 left-2">Featured</Badge>
          )}
        </div>
      </Link>

      <CardContent className="p-4">
        <Link to={`/cars/${car.id}`}>
          <h3 className="text-xl mb-2 hover:text-blue-600 transition-colors">
            {car.brand} {car.model}
          </h3>
        </Link>

        <div className="space-y-2 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {car.year}
            </div>
            <div className="flex items-center gap-1">
              <Gauge className="w-4 h-4" />
              {car.mileage.toLocaleString()} km
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Fuel className="w-4 h-4" />
              {t(`fuel_types.${car.fuel}`)}
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {car.location}
            </div>
          </div>
        </div>

        <div className="text-2xl text-blue-600 mb-2">
          {car.price.toLocaleString()} ден
        </div>
        <div className="text-sm text-gray-500">
          €{car.priceEur.toLocaleString()}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-2">
        {onToggleFavorite && (
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleFavorite}
            className={isFavorite ? 'text-red-600' : ''}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </Button>
        )}
        {onToggleCompare && (
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleCompare}
            className={isComparing ? 'text-blue-600' : ''}
          >
            <Scale className="w-4 h-4" />
          </Button>
        )}
        <Link to={`/cars/${car.id}`} className="flex-1">
          <Button variant="default" size="sm" className="w-full">
            {t('car.details')}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
