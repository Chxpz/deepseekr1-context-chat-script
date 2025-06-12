
export const config = {
  apiUrl: import.meta.env.VITE_API_BASE_URL || '/api',
  appName: 'Autonoma',
  version: import.meta.env.VITE_APP_VERSION || '1.0.0',
} as const;
