import { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Heart, Scale, Phone, MessageCircle, Share2, MapPin, Fuel, Gauge, Calendar } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Car } from '../../types/car';

interface CarDetailsProps {
  cars: Car[];
  favorites: string[];
  compareList: string[];
  onToggleFavorite: (id: string) => void;
  onToggleCompare: (id: string) => void;
}

export default function CarDetails({ cars, favorites, compareList, onToggleFavorite, onToggleCompare }: CarDetailsProps) {
  const { id } = useParams();
  const { t } = useTranslation();
  const [currentImage, setCurrentImage] = useState(0);
  
  const car = cars.find(c => c.id === id);

  if (!car) {
    return <Navigate to="/cars" replace />;
  }

  const isFavorite = favorites.includes(car.id);
  const isComparing = compareList.includes(car.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Image Gallery */}
          <div className="mb-6">
            <div className="rounded-lg overflow-hidden bg-gray-200 mb-4">
              <img
                src={car.images[currentImage]}
                alt={`${car.brand} ${car.model}`}
                className="w-full h-96 object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {car.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImage(idx)}
                  className={`rounded overflow-hidden ${
                    currentImage === idx ? 'ring-2 ring-blue-600' : ''
                  }`}
                >
                  <img src={img} alt="" className="w-full h-20 object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details Tabs */}
          <Tabs defaultValue="description" className="mb-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">{t('car.description')}</TabsTrigger>
              <TabsTrigger value="specifications">{t('car.specifications')}</TabsTrigger>
              <TabsTrigger value="equipment">{t('car.equipment')}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-gray-700 whitespace-pre-line">{car.description}</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="specifications" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <dl className="grid grid-cols-2 gap-4">
                    <div>
                      <dt className="text-sm text-gray-500">{t('filters.brand')}</dt>
                      <dd className="mt-1">{car.brand}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">{t('filters.model')}</dt>
                      <dd className="mt-1">{car.model}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">{t('filters.year')}</dt>
                      <dd className="mt-1">{car.year}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">{t('filters.mileage')}</dt>
                      <dd className="mt-1">{car.mileage.toLocaleString()} km</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">{t('filters.fuel')}</dt>
                      <dd className="mt-1">{t(`fuel_types.${car.fuel}`)}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">{t('filters.transmission')}</dt>
                      <dd className="mt-1">{t(`transmission_types.${car.transmission}`)}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">{t('filters.body_type')}</dt>
                      <dd className="mt-1">{t(`body_types.${car.bodyType}`)}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">{t('filters.drive')}</dt>
                      <dd className="mt-1">{t(`drive_types.${car.drive}`)}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">{t('filters.engine_size')}</dt>
                      <dd className="mt-1">{car.engineSize}L</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">{t('filters.power')}</dt>
                      <dd className="mt-1">{car.power} HP</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">{t('filters.color')}</dt>
                      <dd className="mt-1 capitalize">{car.color}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">{t('filters.doors')}</dt>
                      <dd className="mt-1">{car.doors}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="equipment" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-2 gap-3">
                    {car.equipment.map(eq => (
                      <div key={eq} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span>{t(`equipment.${eq}`)}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-20 space-y-4">
            {/* Price Card */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-3xl text-blue-600 mb-1">
                      {car.price.toLocaleString()} ден
                    </h2>
                    <p className="text-gray-500">€{car.priceEur.toLocaleString()}</p>
                  </div>
                  {car.featured && <Badge>Featured</Badge>}
                </div>
              </CardHeader>
              <CardContent>
                <h3 className="text-2xl mb-4">{car.brand} {car.model}</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Calendar className="w-5 h-5" />
                    <span>{car.year}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Gauge className="w-5 h-5" />
                    <span>{car.mileage.toLocaleString()} km</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Fuel className="w-5 h-5" />
                    <span>{t(`fuel_types.${car.fuel}`)}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <MapPin className="w-5 h-5" />
                    <span>{car.location}</span>
                  </div>
                </div>

                <div className="flex gap-2 mb-4">
                  <Button
                    variant={isFavorite ? 'default' : 'outline'}
                    className="flex-1 gap-2"
                    onClick={() => onToggleFavorite(car.id)}
                  >
                    <Heart className={isFavorite ? 'fill-current' : ''} />
                    {isFavorite ? t('car.remove_from_favorites') : t('car.add_to_favorites')}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => onToggleCompare(car.id)}
                    disabled={compareList.length >= 3 && !isComparing}
                  >
                    <Scale />
                  </Button>
                  <Button variant="outline">
                    <Share2 />
                  </Button>
                </div>

                <Button className="w-full gap-2 mb-2">
                  <Phone className="w-4 h-4" />
                  {t('car.call')}
                </Button>
                <Button variant="outline" className="w-full gap-2">
                  <MessageCircle className="w-4 h-4" />
                  {t('car.message')}
                </Button>
              </CardContent>
            </Card>

            {/* Seller Info */}
            <Card>
              <CardHeader>
                <CardTitle>{t('car.seller')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-medium">{car.seller.name}</p>
                  <Badge variant="outline">{car.seller.type === 'dealer' ? 'Dealer' : 'Private'}</Badge>
                  <Button variant="outline" className="w-full mt-4">
                    {t('car.view_phone')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
