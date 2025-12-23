import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Car, Heart, Scale, PlusCircle, Globe } from 'lucide-react';
import { Button } from './ui/button';

export default function Header() {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'mk' ? 'en' : 'mk');
  };

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/cars', label: t('nav.cars') },
    { path: '/favorites', label: t('nav.favorites'), icon: Heart },
    { path: '/compare', label: t('nav.compare'), icon: Scale },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <Car className="w-8 h-8 text-blue-600" />
            <span className="font-bold text-xl">AutoMK</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-1 transition-colors ${
                  location.pathname === link.path
                    ? 'text-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {link.icon && <link.icon className="w-4 h-4" />}
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="gap-1"
            >
              <Globe className="w-4 h-4" />
              {i18n.language === 'mk' ? 'МК' : 'EN'}
            </Button>

            <Link to="/sell">
              <Button className="gap-2">
                <PlusCircle className="w-4 h-4" />
                <span className="hidden sm:inline">{t('nav.sell')}</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
