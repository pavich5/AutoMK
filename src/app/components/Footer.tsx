import { useTranslation } from 'react-i18next';
import { Car } from 'lucide-react';

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Car className="w-6 h-6 text-blue-500" />
              <span className="font-bold text-white text-lg">AutoMK</span>
            </div>
            <p className="text-sm">
              {t('home.hero_subtitle')}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-3">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-white transition-colors">{t('nav.home')}</a></li>
              <li><a href="/cars" className="hover:text-white transition-colors">{t('nav.cars')}</a></li>
              <li><a href="/sell" className="hover:text-white transition-colors">{t('nav.sell')}</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-3">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>contact@automk.com</li>
              <li>+389 70 123 456</li>
              <li>Скопје, Македонија</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-3">Info</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm">
          <p>&copy; {currentYear} AutoMK. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
