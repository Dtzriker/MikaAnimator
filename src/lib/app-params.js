const search = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();
export const appParams = {
  appId: search.get('appId') || 'motionclay-local',
  token: search.get('token') || '',
  functionsVersion: search.get('functionsVersion') || 'prod',
  appBaseUrl: window.location.origin,
};
