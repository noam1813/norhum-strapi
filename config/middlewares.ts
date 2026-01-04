export default ({ env }) => {
  return [
    'strapi::logger',
    'strapi::errors',
    'strapi::security',
    // CORS設定を削除 - API TOKEN認証で十分
    'strapi::poweredBy',
    'strapi::query',
    'strapi::body',
    'strapi::session',
    'strapi::favicon',
    'strapi::public',
  ];
};
