import React, { useState } from 'react';
import { ScreenId, InspectionRecord } from './types';
import { INITIAL_INSPECTIONS } from './mockData';
import { Sidebar } from './components/Sidebar';
import { TopNavbar } from './components/TopNavbar';
import { OfflineSyncBanner } from './components/OfflineSyncBanner';
import { LoginScreen } from './screens/LoginScreen';
import { DashboardScreen } from './screens/DashboardScreen';
import { NewInspectionScreen } from './screens/NewInspectionScreen';
import { AnalysisScreen } from './screens/AnalysisScreen';
import { FindingsScreen } from './screens/FindingsScreen';
import { EvidenceViewerScreen } from './screens/EvidenceViewerScreen';
import { HistoryScreen } from './screens/HistoryScreen';
import { ProductDetailsScreen } from './screens/ProductDetailsScreen';
import { ReportPreviewScreen } from './screens/ReportPreviewScreen';
import { RulesScreen } from './screens/RulesScreen';
import { UsersScreen } from './screens/UsersScreen';
import { SettingsScreen } from './screens/SettingsScreen';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light');
  const [selectedInspection, setSelectedInspection] = useState<InspectionRecord | null>(INITIAL_INSPECTIONS[0]);
  const [newInspectionDraft, setNewInspectionDraft] = useState<Partial<InspectionRecord>>({});
  const [primaryImage, setPrimaryImage] = useState<string>(
    'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=800'
  );

  const handleStartAnalysis = (data: Partial<InspectionRecord>, img: string) => {
    setNewInspectionDraft(data);
    setPrimaryImage(img);
  };

  const handleAnalysisComplete = (resultData: any) => {
    // Construct new inspection record and add to state if needed
    const created: InspectionRecord = {
      id: String(Date.now()),
      inspectionId: newInspectionDraft.inspectionId || 'LM-10249',
      productName: newInspectionDraft.productName || 'Packaged Tea 500 g',
      brand: newInspectionDraft.brand || 'Taj Mahal Leaf',
      manufacturer: newInspectionDraft.manufacturer || 'Hindustan Unilever Ltd.',
      category: newInspectionDraft.category || 'Beverages',
      batchNumber: newInspectionDraft.batchNumber || 'TM-2026-X9',
      mrp: newInspectionDraft.mrp || '₹340',
      netQuantity: newInspectionDraft.netQuantity || '500 g',
      date: '17 Sep 2026',
      status: 'Potential Issue',
      officer: 'Rajesh Kumar',
      checksPassed: resultData.checksPassed || 18,
      potentialIssues: resultData.potentialIssues || 1,
      needReview: resultData.needReview || 1,
      images: newInspectionDraft.images || [primaryImage],
      declarations: resultData.declarations || [],
      findings: resultData.findings || []
    };
    setSelectedInspection(created);
  };

  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  if (!isAuthenticated) {
    return <LoginScreen onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className={`flex h-screen overflow-hidden font-sans antialiased ${isDark ? 'bg-slate-950 text-slate-100 dark' : 'bg-slate-50 text-slate-900'}`}>
      {/* Left Sidebar */}
      <Sidebar
        currentScreen={currentScreen}
        onNavigate={(screen) => setCurrentScreen(screen)}
        onLogout={() => setIsAuthenticated(false)}
        mobileMenuOpen={mobileMenuOpen}
        onCloseMobileMenu={() => setMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden w-full">
        <TopNavbar
          currentScreen={currentScreen}
          onNavigate={(screen) => setCurrentScreen(screen)}
          onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
        />
        <OfflineSyncBanner />

        <main className="flex-1 overflow-y-auto">
          {currentScreen === 'dashboard' && (
            <DashboardScreen
              onNavigate={(screen) => setCurrentScreen(screen)}
              onSelectInspection={(insp) => setSelectedInspection(insp)}
            />
          )}

          {currentScreen === 'new_inspection' && (
            <NewInspectionScreen
              onNavigate={(screen) => setCurrentScreen(screen)}
              onStartAnalysis={handleStartAnalysis}
            />
          )}

          {currentScreen === 'analysis' && (
            <AnalysisScreen
              onNavigate={(screen) => setCurrentScreen(screen)}
              inspectionData={newInspectionDraft}
              primaryImage={primaryImage}
              onAnalysisComplete={handleAnalysisComplete}
            />
          )}

          {currentScreen === 'findings' && (
            <FindingsScreen
              onNavigate={(screen) => setCurrentScreen(screen)}
              selectedInspection={selectedInspection}
            />
          )}

          {currentScreen === 'evidence_viewer' && (
            <EvidenceViewerScreen
              onNavigate={(screen) => setCurrentScreen(screen)}
              selectedInspection={selectedInspection}
            />
          )}

          {currentScreen === 'history' && (
            <HistoryScreen
              onNavigate={(screen) => setCurrentScreen(screen)}
              onSelectInspection={(insp) => setSelectedInspection(insp)}
            />
          )}

          {currentScreen === 'product_details' && (
            <ProductDetailsScreen
              onNavigate={(screen) => setCurrentScreen(screen)}
              selectedInspection={selectedInspection}
            />
          )}

          {currentScreen === 'report_preview' && (
            <ReportPreviewScreen
              onNavigate={(screen) => setCurrentScreen(screen)}
              selectedInspection={selectedInspection}
            />
          )}

          {currentScreen === 'rules' && (
            <RulesScreen
              onNavigate={(screen) => setCurrentScreen(screen)}
            />
          )}

          {currentScreen === 'users' && (
            <UsersScreen
              onNavigate={(screen) => setCurrentScreen(screen)}
            />
          )}

          {currentScreen === 'settings' && (
            <SettingsScreen
              onNavigate={(screen) => setCurrentScreen(screen)}
              theme={theme}
              onThemeChange={setTheme}
            />
          )}
        </main>
      </div>
    </div>
  );
}
