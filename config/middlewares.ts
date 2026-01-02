export default ({ env }) => {
  // デフォルトのローカル開発用オリジン
  const defaultOrigins = ['http://localhost:3000', 'http://localhost:3002'];

  // 環境変数から追加のオリジンを取得（カンマ区切り）
  const additionalOrigins = env('STRAPI_CORS_ORIGINS', '')
    .split(',')
    .map((origin: string) => origin.trim())
    .filter((origin: string) => origin.length > 0);

  // すべてのオリジンを結合
  const allowedOrigins = [...defaultOrigins, ...additionalOrigins];

  return [
    'strapi::logger',
    'strapi::errors',
    'strapi::security',
    {
      name: 'strapi::cors',
      config: {
        origin: allowedOrigins,
      },
    },
    'strapi::poweredBy',
    'strapi::query',
    'strapi::body',
    'strapi::session',
    'strapi::favicon',
    'strapi::public',
  ];
};
