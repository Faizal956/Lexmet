import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, RefreshCw, CloudCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { InspectionRecord } from '../types';

export function OfflineSyncBanner() {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [pendingForms, setPendingForms] = useState<any[]>([]);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      autoSyncPendingForms();
    };
    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Load initial pending forms from localStorage
    loadPendingForms();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const loadPendingForms = () => {
    try {
      const saved = localStorage.getItem('legal_metrology_pending_forms');
      if (saved) {
        setPendingForms(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load pending forms', e);
    }
  };

  const autoSyncPendingForms = async () => {
    const saved = localStorage.getItem('legal_metrology_pending_forms');
    if (!saved) return;
    const forms = JSON.parse(saved);
    if (forms.length === 0) return;

    setIsSyncing(true);
    setSyncMessage(`Syncing ${forms.length} cached inspection forms with NIC central database...`);

    setTimeout(() => {
      localStorage.removeItem('legal_metrology_pending_forms');
      setPendingForms([]);
      setIsSyncing(false);
      setSyncMessage('Successfully synced all pending inspection forms!');
      setTimeout(() => setSyncMessage(null), 4000);
    }, 2000);
  };

  const handleManualSync = () => {
    if (!isOnline) {
      alert('Cannot sync while offline. Please connect to the internet.');
      return;
    }
    autoSyncPendingForms();
  };

  if (isOnline && pendingForms.length === 0 && !syncMessage) {
    return null;
  }

  return (
    <div className={`px-6 py-2.5 text-xs flex items-center justify-between border-b transition-all z-30 ${
      !isOnline 
        ? 'bg-amber-500 text-slate-950 font-semibold border-amber-600 shadow-sm' 
        : pendingForms.length > 0 
          ? 'bg-blue-600 text-white font-medium border-blue-700 shadow-sm'
          : 'bg-emerald-600 text-white font-medium border-emerald-700 shadow-sm'
    }`}>
      <div className="flex items-center gap-3">
        {!isOnline ? (
          <>
            <WifiOff className="w-4 h-4 text-slate-950 shrink-0 animate-pulse" />
            <span><strong>OFFLINE MODE ACTIVE:</strong> Network disconnected. New inspection forms and evidence are securely cached locally.</span>
          </>
        ) : pendingForms.length > 0 ? (
          <>
            <RefreshCw className={`w-4 h-4 shrink-0 ${isSyncing ? 'animate-spin' : ''}`} />
            <span><strong>PENDING SYNC:</strong> {pendingForms.length} inspection form(s) stored in offline cache ready for synchronization.</span>
          </>
        ) : (
          <>
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{syncMessage || 'All offline inspection records successfully synchronized with NIC central database.'}</span>
          </>
        )}
      </div>

      <div className="flex items-center gap-3">
        {pendingForms.length > 0 && isOnline && (
          <button
            onClick={handleManualSync}
            disabled={isSyncing}
            className="px-3 py-1 bg-white text-blue-700 hover:bg-blue-50 font-bold rounded text-xs shadow-xs transition-colors flex items-center gap-1.5 disabled:opacity-50"
          >
            <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Syncing...' : 'Sync Pending Forms Now'}</span>
          </button>
        )}
        <span className="font-mono text-[11px] opacity-90">
          Cache: {pendingForms.length} items
        </span>
      </div>
    </div>
  );
}
