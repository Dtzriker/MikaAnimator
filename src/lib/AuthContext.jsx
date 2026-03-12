import React, { createContext, useState, useContext, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { appParams } from '@/lib/app-params';
let createAxiosClient;
try { ({ createAxiosClient } = await import('@base44/sdk/dist/utils/axios-client')); } catch {}
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isLoadingPublicSettings, setIsLoadingPublicSettings] = useState(true);
  const [authError, setAuthError] = useState(null);
  const [appPublicSettings, setAppPublicSettings] = useState(null);
  useEffect(() => { checkAppState(); }, []);
  const checkAppState = async () => {
    try {
      setIsLoadingPublicSettings(true); setAuthError(null);
      if (!createAxiosClient || appParams.appId === 'motionclay-local') {
        setAppPublicSettings({ id: appParams.appId, public_settings: {} });
        setIsLoadingPublicSettings(false); setIsLoadingAuth(false); return;
      }
      const appClient = createAxiosClient({ baseURL: `/api/apps/public`, headers: { 'X-App-Id': appParams.appId }, token: appParams.token, interceptResponses: true });
      const publicSettings = await appClient.get(`/prod/public-settings/by-id/${appParams.appId}`);
      setAppPublicSettings(publicSettings);
      if (appParams.token) await checkUserAuth(); else { setIsLoadingAuth(false); setIsAuthenticated(false); }
      setIsLoadingPublicSettings(false);
    } catch (error) {
      setAppPublicSettings({ id: appParams.appId, public_settings: {} });
      setIsLoadingPublicSettings(false); setIsLoadingAuth(false); setAuthError(null);
    }
  };
  const checkUserAuth = async () => {
    try { const currentUser = await base44.auth.me(); setUser(currentUser); setIsAuthenticated(true); }
    catch { setIsAuthenticated(false); }
    finally { setIsLoadingAuth(false); }
  };
  const logout = () => { setUser(null); setIsAuthenticated(false); try { base44.auth.logout(window.location.href); } catch {} };
  const navigateToLogin = () => { try { base44.auth.redirectToLogin(window.location.href); } catch {} };
  return <AuthContext.Provider value={{ user, isAuthenticated, isLoadingAuth, isLoadingPublicSettings, authError, appPublicSettings, logout, navigateToLogin, checkAppState }}>{children}</AuthContext.Provider>;
};
export const useAuth = () => { const context = useContext(AuthContext); if (!context) throw new Error('useAuth must be used within an AuthProvider'); return context; };
