import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

// Показва на next-intl къде е конфигурацията.
const withNextIntl = createNextIntlPlugin('./src/i18n/request.js');

const nextConfig: NextConfig = {
  // ако си имал настройки в стария конфиг — върни ги тук
};

export default withNextIntl(nextConfig);