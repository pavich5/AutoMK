import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Check, Image as ImageIcon, Trash } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { Checkbox } from '../components/ui/checkbox';
import { BRANDS, CITIES, EQUIPMENT_OPTIONS } from '../../data/cars.mock';
import { Car } from '../../types/car';

interface SellCarProps {
  onAddCar: (car: Car) => void;
}

export default function SellCar({ onAddCar }: SellCarProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: '',
    price: '',
    mileage: '',
    fuel: '',
    transmission: '',
    bodyType: '',
    engineSize: '',
    power: '',
    location: '',
    description: '',
    phone: '',
    equipment: [] as string[],
    images: [] as string[]
  });

  const steps = [
    { id: 1, title: t('sell.step_basic') },
    { id: 2, title: t('sell.step_technical') },
    { id: 3, title: t('sell.step_equipment') },
    { id: 4, title: t('sell.step_images') },
    { id: 5, title: t('sell.step_preview') }
  ];

  const progress = (step / steps.length) * 100;

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleEquipment = (value: string) => {
    setFormData(prev => ({
      ...prev,
      equipment: prev.equipment.includes(value)
        ? prev.equipment.filter(eq => eq !== value)
        : [...prev.equipment, value]
    }));
  };

  const handleImageUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const readers = Array.from(files).map(
      file =>
        new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        })
    );

    const newImages = await Promise.all(readers);
    setFormData(prev => ({ ...prev, images: [...prev.images, ...newImages] }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== index)
    }));
  };

  const handleNext = () => {
    if (step < steps.length) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    const price = Number(formData.price) || 0;
    const mileage = Number(formData.mileage) || 0;
    const year = Number(formData.year) || new Date().getFullYear();
    const engineSize = Number(formData.engineSize) || 0;
    const power = Number(formData.power) || 0;
    const priceEur = price > 0 ? Math.round(price / 61.5) : 0;

    const newCar: Car = {
      id: Date.now().toString(),
      brand: formData.brand || 'Unknown',
      model: formData.model || 'Model',
      year,
      price,
      priceEur,
      mileage,
      fuel: (formData.fuel as Car['fuel']) || 'petrol',
      transmission: (formData.transmission as Car['transmission']) || 'manual',
      drive: 'fwd',
      bodyType: (formData.bodyType as Car['bodyType']) || 'sedan',
      engineSize,
      power,
      emission: 'euro6',
      condition: 'used',
      firstOwner: false,
      accidentFree: false,
      serviceBook: false,
      imported: false,
      color: 'black',
      doors: 4,
      seats: 5,
      location: formData.location || 'Skopje',
      images: formData.images.length ? formData.images : ['https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=800'],
      description: formData.description || '',
      equipment: formData.equipment,
      seller: {
        name: 'Private Seller',
        phone: formData.phone || '',
        type: 'private'
      },
      featured: false,
      createdAt: new Date()
    };

    onAddCar(newCar);
    navigate('/cars');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl mb-2">{t('sell.title')}</h1>
      <p className="text-gray-600 mb-8">{t('sell.subtitle')}</p>

      {/* Progress */}
      <div className="mb-8">
        <Progress value={progress} className="h-2 mb-4" />
        <div className="grid grid-cols-5 gap-2">
          {steps.map(s => (
            <div
              key={s.id}
              className={`text-center text-sm ${
                step >= s.id ? 'text-blue-600 font-medium' : 'text-gray-400'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center ${
                  step > s.id
                    ? 'bg-blue-600 text-white'
                    : step === s.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200'
                }`}
              >
                {step > s.id ? <Check className="w-4 h-4" /> : s.id}
              </div>
              <div className="hidden sm:block">{s.title}</div>
            </div>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{steps[step - 1].title}</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="brand">{t('filters.brand')}</Label>
                <Select value={formData.brand} onValueChange={(v) => updateField('brand', v)}>
                  <SelectTrigger id="brand">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {BRANDS.map(brand => (
                      <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="model">{t('filters.model')}</Label>
                <Input id="model" value={formData.model} onChange={(e) => updateField('model', e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="year">{t('filters.year')}</Label>
                  <Input type="number" id="year" value={formData.year} onChange={(e) => updateField('year', e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="price">{t('filters.price')} (MKD)</Label>
                  <Input type="number" id="price" value={formData.price} onChange={(e) => updateField('price', e.target.value)} />
                </div>
              </div>
              <div>
                <Label htmlFor="mileage">{t('filters.mileage')} (km)</Label>
                <Input type="number" id="mileage" value={formData.mileage} onChange={(e) => updateField('mileage', e.target.value)} />
              </div>
              <div>
                <Label htmlFor="location">{t('filters.location')}</Label>
                <Select value={formData.location} onValueChange={(v) => updateField('location', v)}>
                  <SelectTrigger id="location">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CITIES.map(city => (
                      <SelectItem key={city} value={city}>{city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Step 2: Technical */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="fuel">{t('filters.fuel')}</Label>
                <Select value={formData.fuel} onValueChange={(v) => updateField('fuel', v)}>
                  <SelectTrigger id="fuel">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="petrol">{t('fuel_types.petrol')}</SelectItem>
                    <SelectItem value="diesel">{t('fuel_types.diesel')}</SelectItem>
                    <SelectItem value="hybrid">{t('fuel_types.hybrid')}</SelectItem>
                    <SelectItem value="electric">{t('fuel_types.electric')}</SelectItem>
                    <SelectItem value="lpg">{t('fuel_types.lpg')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="transmission">{t('filters.transmission')}</Label>
                <Select value={formData.transmission} onValueChange={(v) => updateField('transmission', v)}>
                  <SelectTrigger id="transmission">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manual">{t('transmission_types.manual')}</SelectItem>
                    <SelectItem value="automatic">{t('transmission_types.automatic')}</SelectItem>
                    <SelectItem value="semi_automatic">{t('transmission_types.semi_automatic')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="bodyType">{t('filters.body_type')}</Label>
                <Select value={formData.bodyType} onValueChange={(v) => updateField('bodyType', v)}>
                  <SelectTrigger id="bodyType">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedan">{t('body_types.sedan')}</SelectItem>
                    <SelectItem value="suv">{t('body_types.suv')}</SelectItem>
                    <SelectItem value="hatchback">{t('body_types.hatchback')}</SelectItem>
                    <SelectItem value="wagon">{t('body_types.wagon')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="engineSize">{t('filters.engine_size')} (L)</Label>
                  <Input type="number" step="0.1" id="engineSize" value={formData.engineSize} onChange={(e) => updateField('engineSize', e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="power">{t('filters.power')} (HP)</Label>
                  <Input type="number" id="power" value={formData.power} onChange={(e) => updateField('power', e.target.value)} />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Equipment */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {EQUIPMENT_OPTIONS.map(option => (
                  <label
                    key={option}
                    htmlFor={`equipment-${option}`}
                    className="flex items-center gap-3 border rounded-lg px-3 py-2 hover:border-blue-500 transition"
                  >
                    <Checkbox
                      id={`equipment-${option}`}
                      checked={formData.equipment.includes(option)}
                      onCheckedChange={() => toggleEquipment(option)}
                    />
                    <span className="text-sm">{t(`equipment.${option}`)}</span>
                  </label>
                ))}
              </div>

              {formData.equipment.length === 0 && (
                <p className="text-sm text-gray-500">{t('filters.equipment')}</p>
              )}
            </div>
          )}

          {/* Step 4: Images */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={async (e) => {
                    await handleImageUpload(e.target.files);
                    e.target.value = '';
                  }}
                />
                <Label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center gap-2 text-gray-600">
                  <ImageIcon className="w-8 h-8 text-blue-600" />
                  <span className="font-medium">{t('sell.step_images')}</span>
                  <span className="text-sm text-gray-500">Drag & drop or click to upload images</span>
                  <Button type="button" className="mt-2">
                    {t('sell.step_images')}
                  </Button>
                </Label>
              </div>

              {formData.images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {formData.images.map((img, idx) => (
                    <div key={idx} className="relative group">
                      <img
                        src={img}
                        alt={`Uploaded ${idx + 1}`}
                        className="w-full h-32 object-cover rounded-lg border"
                      />
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition"
                        onClick={() => removeImage(idx)}
                        aria-label="Remove image"
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step 5: Preview */}
          {step === 5 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="description">{t('car.description')}</Label>
                <Textarea
                  id="description"
                  rows={6}
                  value={formData.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  placeholder={t('car.description')}
                />
              </div>
              <div>
                <Label htmlFor="phone">{t('car.contact')}</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  placeholder="+389 XX XXX XXX"
                />
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-medium mb-2">{t('sell.preview_title')}</h3>
                <p className="text-sm text-gray-600">
                  {formData.brand} {formData.model} {formData.year}
                </p>
                <p className="text-lg text-blue-600 mt-2">
                  {formData.price ? `${Number(formData.price).toLocaleString()} MKD` : '-'}
                </p>
                {formData.equipment.length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-500 mb-2">{t('sell.step_equipment')}</p>
                    <div className="flex flex-wrap gap-2">
                      {formData.equipment.map(eq => (
                        <Badge key={eq} variant="secondary">
                          {t(`equipment.${eq}`)}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                {formData.images.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-500 mb-2">{t('sell.step_images')}</p>
                    <div className="grid grid-cols-3 gap-2">
                      {formData.images.map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt={`Preview ${idx + 1}`}
                          className="w-full h-20 object-cover rounded"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={step === 1}
              className="gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              {t('sell.back')}
            </Button>
            {step < steps.length ? (
              <Button onClick={handleNext} className="gap-2">
                {t('sell.next')}
                <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="gap-2">
                <Check className="w-4 h-4" />
                {t('sell.publish')}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
