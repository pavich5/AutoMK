import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';
import { Button } from './ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { CarFilters, FuelType, TransmissionType, BodyType } from '../../types/car';
import { BRANDS, CITIES, EQUIPMENT_OPTIONS } from '../../data/cars.mock';

interface FiltersPanelProps {
  filters: CarFilters;
  onFiltersChange: (filters: CarFilters) => void;
}

export default function FiltersPanel({ filters, onFiltersChange }: FiltersPanelProps) {
  const { t } = useTranslation();

  const toggleArrayFilter = <K extends keyof CarFilters>(
    key: K,
    value: any
  ) => {
    const currentArray = (filters[key] || []) as any[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(v => v !== value)
      : [...currentArray, value];
    
    onFiltersChange({ ...filters, [key]: newArray });
  };

  const updateFilter = <K extends keyof CarFilters>(key: K, value: CarFilters[K]) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearAll = () => {
    onFiltersChange({});
  };

  const fuelTypes: FuelType[] = ['petrol', 'diesel', 'hybrid', 'electric', 'lpg'];
  const transmissionTypes: TransmissionType[] = ['manual', 'automatic', 'semi_automatic'];
  const bodyTypes: BodyType[] = ['sedan', 'suv', 'hatchback', 'coupe', 'wagon', 'van', 'convertible', 'pickup'];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{t('filters.title')}</CardTitle>
          <Button variant="ghost" size="sm" onClick={clearAll}>
            {t('filters.clear')}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" defaultValue={['basic', 'technical']} className="w-full">
          {/* Basic Filters */}
          <AccordionItem value="basic">
            <AccordionTrigger>{t('filters.basic')}</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                {/* Brand */}
                <div>
                  <Label>{t('filters.brand')}</Label>
                  <div className="mt-2 space-y-2 max-h-48 overflow-y-auto">
                    {BRANDS.map(brand => (
                      <div key={brand} className="flex items-center gap-2">
                        <Checkbox
                          id={`brand-${brand}`}
                          checked={filters.brands?.includes(brand)}
                          onCheckedChange={() => toggleArrayFilter('brands', brand)}
                        />
                        <label htmlFor={`brand-${brand}`} className="text-sm cursor-pointer">
                          {brand}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div>
                  <Label>{t('filters.price')}</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <Input
                      type="number"
                      placeholder={t('filters.price_from')}
                      value={filters.priceFrom || ''}
                      onChange={(e) => updateFilter('priceFrom', e.target.value ? Number(e.target.value) : undefined)}
                    />
                    <Input
                      type="number"
                      placeholder={t('filters.price_to')}
                      value={filters.priceTo || ''}
                      onChange={(e) => updateFilter('priceTo', e.target.value ? Number(e.target.value) : undefined)}
                    />
                  </div>
                </div>

                {/* Year */}
                <div>
                  <Label>{t('filters.year')}</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <Input
                      type="number"
                      placeholder={t('filters.year_from')}
                      value={filters.yearFrom || ''}
                      onChange={(e) => updateFilter('yearFrom', e.target.value ? Number(e.target.value) : undefined)}
                    />
                    <Input
                      type="number"
                      placeholder={t('filters.year_to')}
                      value={filters.yearTo || ''}
                      onChange={(e) => updateFilter('yearTo', e.target.value ? Number(e.target.value) : undefined)}
                    />
                  </div>
                </div>

                {/* Mileage */}
                <div>
                  <Label>{t('filters.mileage')}</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <Input
                      type="number"
                      placeholder={t('filters.mileage_from')}
                      value={filters.mileageFrom || ''}
                      onChange={(e) => updateFilter('mileageFrom', e.target.value ? Number(e.target.value) : undefined)}
                    />
                    <Input
                      type="number"
                      placeholder={t('filters.mileage_to')}
                      value={filters.mileageTo || ''}
                      onChange={(e) => updateFilter('mileageTo', e.target.value ? Number(e.target.value) : undefined)}
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <Label>{t('filters.location')}</Label>
                  <div className="mt-2 space-y-2 max-h-32 overflow-y-auto">
                    {CITIES.map(city => (
                      <div key={city} className="flex items-center gap-2">
                        <Checkbox
                          id={`city-${city}`}
                          checked={filters.locations?.includes(city)}
                          onCheckedChange={() => toggleArrayFilter('locations', city)}
                        />
                        <label htmlFor={`city-${city}`} className="text-sm cursor-pointer">
                          {city}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Technical Filters */}
          <AccordionItem value="technical">
            <AccordionTrigger>{t('filters.technical')}</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                {/* Fuel Type */}
                <div>
                  <Label>{t('filters.fuel')}</Label>
                  <div className="mt-2 space-y-2">
                    {fuelTypes.map(fuel => (
                      <div key={fuel} className="flex items-center gap-2">
                        <Checkbox
                          id={`fuel-${fuel}`}
                          checked={filters.fuelTypes?.includes(fuel)}
                          onCheckedChange={() => toggleArrayFilter('fuelTypes', fuel)}
                        />
                        <label htmlFor={`fuel-${fuel}`} className="text-sm cursor-pointer">
                          {t(`fuel_types.${fuel}`)}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Transmission */}
                <div>
                  <Label>{t('filters.transmission')}</Label>
                  <div className="mt-2 space-y-2">
                    {transmissionTypes.map(trans => (
                      <div key={trans} className="flex items-center gap-2">
                        <Checkbox
                          id={`trans-${trans}`}
                          checked={filters.transmissions?.includes(trans)}
                          onCheckedChange={() => toggleArrayFilter('transmissions', trans)}
                        />
                        <label htmlFor={`trans-${trans}`} className="text-sm cursor-pointer">
                          {t(`transmission_types.${trans}`)}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Condition Filters */}
          <AccordionItem value="condition">
            <AccordionTrigger>{t('filters.condition')}</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="first-owner"
                    checked={filters.firstOwner}
                    onCheckedChange={(checked) => updateFilter('firstOwner', checked as boolean)}
                  />
                  <label htmlFor="first-owner" className="text-sm cursor-pointer">
                    {t('filters.first_owner')}
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="accident-free"
                    checked={filters.accidentFree}
                    onCheckedChange={(checked) => updateFilter('accidentFree', checked as boolean)}
                  />
                  <label htmlFor="accident-free" className="text-sm cursor-pointer">
                    {t('filters.accident_free')}
                  </label>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Body Type */}
          <AccordionItem value="body">
            <AccordionTrigger>{t('filters.body')}</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {bodyTypes.map(body => (
                  <div key={body} className="flex items-center gap-2">
                    <Checkbox
                      id={`body-${body}`}
                      checked={filters.bodyTypes?.includes(body)}
                      onCheckedChange={() => toggleArrayFilter('bodyTypes', body)}
                    />
                    <label htmlFor={`body-${body}`} className="text-sm cursor-pointer">
                      {t(`body_types.${body}`)}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Equipment */}
          <AccordionItem value="equipment">
            <AccordionTrigger>{t('filters.equipment')}</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {EQUIPMENT_OPTIONS && EQUIPMENT_OPTIONS.length > 0 ? (
                  EQUIPMENT_OPTIONS.map(equipment => (
                    <div key={equipment} className="flex items-center gap-2">
                      <Checkbox
                        id={`equipment-${equipment}`}
                        checked={filters.equipment?.includes(equipment)}
                        onCheckedChange={() => toggleArrayFilter('equipment', equipment)}
                      />
                      <label htmlFor={`equipment-${equipment}`} className="text-sm cursor-pointer">
                        {t(`equipment.${equipment}`)}
                      </label>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No equipment options available</p>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
