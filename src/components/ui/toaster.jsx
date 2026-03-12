import { Toaster as HotToaster } from 'react-hot-toast';
export function Toaster() {
  return <HotToaster position="bottom-right" toastOptions={{ style: { background: '#101022', color: '#fff', border: '1px solid rgba(255,255,255,0.08)' } }} />;
}
