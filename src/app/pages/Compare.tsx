import { useTranslation } from 'react-i18next';
import { Scale, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Car } from '../../types/car';

interface CompareProps {
  cars: Car[];
  compareList: string[];
  onRemove: (id: string) => void;
}

export default function Compare({ cars, compareList, onRemove }: CompareProps) {
  const { t } = useTranslation();

  const compareCars = cars.filter(car => compareList.includes(car.id));

  if (compareCars.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl mb-8">{t('compare.title')}</h1>
        <div className="text-center py-20">
          <Scale className="w-24 h-24 mx-auto mb-4 text-gray-300" />
          <h2 className="text-2xl text-gray-500 mb-2">{t('compare.empty')}</h2>
          <p className="text-gray-400">{t('compare.empty_subtitle')}</p>
        </div>
      </div>
    );
  }

  const specs = [
    { key: 'brand', label: t('filters.brand') },
    { key: 'model', label: t('filters.model') },
    { key: 'year', label: t('filters.year'), format: (v: number) => v.toString() },
    { key: 'price', label: t('filters.price'), format: (v: number) => `${v.toLocaleString()} ден` },
    { key: 'mileage', label: t('filters.mileage'), format: (v: number) => `${v.toLocaleString()} km` },
    { key: 'fuel', label: t('filters.fuel'), format: (v: string) => t(`fuel_types.${v}`) },
    { key: 'transmission', label: t('filters.transmission'), format: (v: string) => t(`transmission_types.${v}`) },
    { key: 'bodyType', label: t('filters.body_type'), format: (v: string) => t(`body_types.${v}`) },
    { key: 'engineSize', label: t('filters.engine_size'), format: (v: number) => `${v}L` },
    { key: 'power', label: t('filters.power'), format: (v: number) => `${v} HP` },
    { key: 'drive', label: t('filters.drive'), format: (v: string) => t(`drive_types.${v}`) },
    { key: 'doors', label: t('filters.doors'), format: (v: number) => v.toString() },
    { key: 'seats', label: t('filters.seats'), format: (v: number) => v.toString() },
    { key: 'color', label: t('filters.color'), format: (v: string) => v },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl mb-8">{t('compare.title')}</h1>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="bg-gray-100 p-4 text-left border">&nbsp;</th>
              {compareCars.map(car => (
                <th key={car.id} className="bg-white p-4 border min-w-[280px]">
                  <div className="relative">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-0 right-0"
                      onClick={() => onRemove(car.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                    <img
                      src={car.images[0]}
                      alt={`${car.brand} ${car.model}`}
                      className="w-full h-40 object-cover rounded mb-3"
                    />
                    <h3 className="text-xl">{car.brand} {car.model}</h3>
                    <p className="text-2xl text-blue-600 mt-2">
                      {car.price.toLocaleString()} ден
                    </p>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {specs.map(spec => (
              <tr key={spec.key} className="border">
                <td className="bg-gray-50 p-4 border font-medium">
                  {spec.label}
                </td>
                {compareCars.map(car => {
                  const value = (car as any)[spec.key];
                  const displayValue = spec.format ? spec.format(value) : value;
                  
                  // Highlight best values
                  let isHighlight = false;
                  if (spec.key === 'price') {
                    isHighlight = value === Math.min(...compareCars.map(c => c.price));
                  } else if (spec.key === 'mileage') {
                    isHighlight = value === Math.min(...compareCars.map(c => c.mileage));
                  } else if (spec.key === 'year') {
                    isHighlight = value === Math.max(...compareCars.map(c => c.year));
                  } else if (spec.key === 'power') {
                    isHighlight = value === Math.max(...compareCars.map(c => c.power));
                  }

                  return (
                    <td
                      key={car.id}
                      className={`p-4 border ${
                        isHighlight ? 'bg-green-50 font-medium' : ''
                      }`}
                    >
                      {displayValue}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
