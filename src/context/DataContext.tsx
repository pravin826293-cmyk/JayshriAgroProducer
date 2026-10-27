import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  MasterFarmer,
  ProcurementLot,
  CompanyScheme,
  GovtScheme,
  Announcement,
  CsvValidationResult,
} from '../types';
import { initialCompanySchemes, initialGovtSchemes } from '../data/initialSchemes';
import { initialAnnouncements } from '../data/initialAnnouncements';
import { parseCSVText, processLotCsvRows } from '../data/csvParser';

interface DataContextType {
  farmers: MasterFarmer[];
  lots: ProcurementLot[];
  companySchemes: CompanyScheme[];
  govtSchemes: GovtScheme[];
  announcements: Announcement[];
  isLoading: boolean;
  loadError: string | null;

  // Real-time Database Statistics
  stats: {
    totalFarmers: number;
    activeLots: number;
    totalBags: number;
    totalQuantityQtl: number;
    totalTradeValue: number;
    dispatchedLots: number;
    rejectedLots: number;
    pendingLots: number;
    publishedCompanySchemes: number;
    draftCompanySchemes: number;
    activeGovtSchemes: number;
    activeAnnouncements: number;
  };

  // Farmer operations
  addFarmer: (farmer: Omit<MasterFarmer, 'id' | 'createdAt' | 'updatedAt' | 'totalLotsCount' | 'totalQuantityQtl' | 'totalBags' | 'totalTradeValue'>) => Promise<MasterFarmer>;
  updateFarmer: (id: string, updates: Partial<MasterFarmer>) => Promise<boolean>;
  deleteFarmer: (id: string) => Promise<boolean>;
  getFarmerById: (id: string) => MasterFarmer | undefined;
  getFarmerLots: (farmerId: string) => ProcurementLot[];

  // CSV operations
  importCsvData: (csvText: string) => CsvValidationResult;

  // Company Scheme operations
  addCompanyScheme: (scheme: Omit<CompanyScheme, 'id'>) => Promise<CompanyScheme>;
  updateCompanyScheme: (id: string, updates: Partial<CompanyScheme>) => Promise<boolean>;
  deleteCompanyScheme: (id: string) => Promise<boolean>;

  // Govt Scheme operations
  addGovtScheme: (scheme: Omit<GovtScheme, 'id'>) => Promise<GovtScheme>;
  updateGovtScheme: (id: string, updates: Partial<GovtScheme>) => Promise<boolean>;
  deleteGovtScheme: (id: string) => Promise<boolean>;

  // Announcement operations
  addAnnouncement: (announcement: Omit<Announcement, 'id'>) => Promise<Announcement>;
  updateAnnouncement: (id: string, updates: Partial<Announcement>) => Promise<boolean>;
  deleteAnnouncement: (id: string) => Promise<boolean>;
}

const DataContext = createContext<DataContextType | null>(null);

const STORAGE_KEYS = {
  FARMERS: 'jayashree_farmers_v1',
  LOTS: 'jayashree_lots_v1',
  COMPANY_SCHEMES: 'jayashree_company_schemes_v1',
  GOVT_SCHEMES: 'jayashree_govt_schemes_v1',
  ANNOUNCEMENTS: 'jayashree_announcements_v1',
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [farmers, setFarmers] = useState<MasterFarmer[]>([]);
  const [lots, setLots] = useState<ProcurementLot[]>([]);
  const [companySchemes, setCompanySchemes] = useState<CompanyScheme[]>([]);
  const [govtSchemes, setGovtSchemes] = useState<GovtScheme[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Load from LocalStorage or initialize with public datasets.
  useEffect(() => {
    async function initializeData() {
      setIsLoading(true);
      try {
        // 1. Schemes & Announcements
        const savedCompanySchemes = localStorage.getItem(STORAGE_KEYS.COMPANY_SCHEMES);
        if (savedCompanySchemes) {
          setCompanySchemes(JSON.parse(savedCompanySchemes));
        } else {
          setCompanySchemes(initialCompanySchemes);
          localStorage.setItem(STORAGE_KEYS.COMPANY_SCHEMES, JSON.stringify(initialCompanySchemes));
        }

        const savedGovtSchemes = localStorage.getItem(STORAGE_KEYS.GOVT_SCHEMES);
        if (savedGovtSchemes) {
          setGovtSchemes(JSON.parse(savedGovtSchemes));
        } else {
          setGovtSchemes(initialGovtSchemes);
          localStorage.setItem(STORAGE_KEYS.GOVT_SCHEMES, JSON.stringify(initialGovtSchemes));
        }

        const savedAnnouncements = localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENTS);
        if (savedAnnouncements) {
          setAnnouncements(JSON.parse(savedAnnouncements));
        } else {
          setAnnouncements(initialAnnouncements);
          localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(initialAnnouncements));
        }

        // 2. Farmers & Procurement Lots from CSV
        const savedFarmers = localStorage.getItem(STORAGE_KEYS.FARMERS);
        const savedLots = localStorage.getItem(STORAGE_KEYS.LOTS);

        if (savedFarmers && savedLots) {
          setFarmers(JSON.parse(savedFarmers));
          setLots(JSON.parse(savedLots));
        } else {
          const initialFarmers = savedFarmers ? JSON.parse(savedFarmers) : [];
          const initialLots = savedLots ? JSON.parse(savedLots) : [];
          setFarmers(initialFarmers);
          setLots(initialLots);
          localStorage.setItem(STORAGE_KEYS.FARMERS, JSON.stringify(initialFarmers));
          localStorage.setItem(STORAGE_KEYS.LOTS, JSON.stringify(initialLots));
        }
      } catch (err) {
        console.error('Initialization error:', err);
        setLoadError('Failed to load initial dataset.');
      } finally {
        setIsLoading(false);
      }
    }

    initializeData();
  }, []);

  // Real-time Database Statistics
  const stats = useMemo(() => {
    const totalFarmers = farmers.length;
    const activeLots = lots.length;
    let totalBags = 0;
    let totalQuantityQtl = 0;
    let totalTradeValue = 0;
    let dispatchedLots = 0;
    let rejectedLots = 0;
    let pendingLots = 0;

    for (const lot of lots) {
      totalBags += lot.noOfBags || 0;
      totalQuantityQtl += lot.actualQuantity || lot.quantity || 0;
      totalTradeValue += lot.tradeValue || 0;
      if (lot.dispatchStatus === 'Confirmed Dispatch') {
        dispatchedLots++;
      } else if (lot.dispatchStatus === 'Rejected Dispatch') {
        rejectedLots++;
      } else {
        pendingLots++;
      }
    }

    const publishedCompanySchemes = companySchemes.filter((s) => s.status === 'Published').length;
    const draftCompanySchemes = companySchemes.filter((s) => s.status === 'Draft').length;
    const activeGovtSchemes = govtSchemes.filter((s) => s.status === 'Active').length;
    const activeAnnouncements = announcements.filter((a) => a.status === 'Published').length;

    return {
      totalFarmers,
      activeLots,
      totalBags,
      totalQuantityQtl: Math.round(totalQuantityQtl * 10) / 10,
      totalTradeValue: Math.round(totalTradeValue),
      dispatchedLots,
      rejectedLots,
      pendingLots,
      publishedCompanySchemes,
      draftCompanySchemes,
      activeGovtSchemes,
      activeAnnouncements,
    };
  }, [farmers, lots, companySchemes, govtSchemes, announcements]);

  // Farmer CRUD Operations
  const addFarmer = async (
    farmerData: Omit<MasterFarmer, 'id' | 'createdAt' | 'updatedAt' | 'totalLotsCount' | 'totalQuantityQtl' | 'totalBags' | 'totalTradeValue'>
  ): Promise<MasterFarmer> => {
    const now = new Date().toISOString().split('T')[0];
    const newFarmer: MasterFarmer = {
      ...farmerData,
      id: `FMR-${Date.now()}`,
      totalLotsCount: 0,
      totalQuantityQtl: 0,
      totalBags: 0,
      totalTradeValue: 0,
      createdAt: now,
      updatedAt: now,
    };

    const updated = [newFarmer, ...farmers];
    setFarmers(updated);
    localStorage.setItem(STORAGE_KEYS.FARMERS, JSON.stringify(updated));
    return newFarmer;
  };

  const updateFarmer = async (id: string, updates: Partial<MasterFarmer>): Promise<boolean> => {
    const updated = farmers.map((f) =>
      f.id === id ? { ...f, ...updates, updatedAt: new Date().toISOString().split('T')[0] } : f
    );
    setFarmers(updated);
    localStorage.setItem(STORAGE_KEYS.FARMERS, JSON.stringify(updated));
    return true;
  };

  const deleteFarmer = async (id: string): Promise<boolean> => {
    // Soft delete/archive or remove
    const updated = farmers.filter((f) => f.id !== id);
    setFarmers(updated);
    localStorage.setItem(STORAGE_KEYS.FARMERS, JSON.stringify(updated));
    return true;
  };

  const getFarmerById = (id: string) => {
    return farmers.find((f) => f.id === id);
  };

  const getFarmerLots = (farmerId: string) => {
    return lots.filter((lot) => lot.farmerId === farmerId);
  };

  // CSV Import Method
  const importCsvData = (csvText: string): CsvValidationResult => {
    const rows = parseCSVText(csvText);
    const { farmers: importedFarmers, lots: importedLots, validation } = processLotCsvRows(rows);

    // Merge without silently overwriting
    const farmerMap = new Map<string, MasterFarmer>();
    farmers.forEach((f) => farmerMap.set(f.pssId || f.id, f));

    importedFarmers.forEach((inf) => {
      const key = inf.pssId || inf.id;
      if (farmerMap.has(key)) {
        // Accumulate statistics
        const existing = farmerMap.get(key)!;
        existing.totalLotsCount += inf.totalLotsCount;
        existing.totalQuantityQtl += inf.totalQuantityQtl;
        existing.totalBags += inf.totalBags;
        existing.totalTradeValue += inf.totalTradeValue;
      } else {
        farmerMap.set(key, inf);
      }
    });

    const mergedFarmers = Array.from(farmerMap.values());
    const mergedLots = [...importedLots, ...lots];

    setFarmers(mergedFarmers);
    setLots(mergedLots);
    localStorage.setItem(STORAGE_KEYS.FARMERS, JSON.stringify(mergedFarmers));
    localStorage.setItem(STORAGE_KEYS.LOTS, JSON.stringify(mergedLots));

    return validation;
  };

  // Company Schemes CRUD
  const addCompanyScheme = async (schemeData: Omit<CompanyScheme, 'id'>): Promise<CompanyScheme> => {
    const newScheme: CompanyScheme = {
      ...schemeData,
      id: `CS-${Date.now().toString().slice(-4)}`,
    };
    const updated = [newScheme, ...companySchemes];
    setCompanySchemes(updated);
    localStorage.setItem(STORAGE_KEYS.COMPANY_SCHEMES, JSON.stringify(updated));
    return newScheme;
  };

  const updateCompanyScheme = async (id: string, updates: Partial<CompanyScheme>): Promise<boolean> => {
    const updated = companySchemes.map((s) => (s.id === id ? { ...s, ...updates } : s));
    setCompanySchemes(updated);
    localStorage.setItem(STORAGE_KEYS.COMPANY_SCHEMES, JSON.stringify(updated));
    return true;
  };

  const deleteCompanyScheme = async (id: string): Promise<boolean> => {
    const updated = companySchemes.filter((s) => s.id !== id);
    setCompanySchemes(updated);
    localStorage.setItem(STORAGE_KEYS.COMPANY_SCHEMES, JSON.stringify(updated));
    return true;
  };

  // Govt Schemes CRUD
  const addGovtScheme = async (schemeData: Omit<GovtScheme, 'id'>): Promise<GovtScheme> => {
    const newScheme: GovtScheme = {
      ...schemeData,
      id: `GS-${Date.now().toString().slice(-4)}`,
    };
    const updated = [newScheme, ...govtSchemes];
    setGovtSchemes(updated);
    localStorage.setItem(STORAGE_KEYS.GOVT_SCHEMES, JSON.stringify(updated));
    return newScheme;
  };

  const updateGovtScheme = async (id: string, updates: Partial<GovtScheme>): Promise<boolean> => {
    const updated = govtSchemes.map((s) => (s.id === id ? { ...s, ...updates } : s));
    setGovtSchemes(updated);
    localStorage.setItem(STORAGE_KEYS.GOVT_SCHEMES, JSON.stringify(updated));
    return true;
  };

  const deleteGovtScheme = async (id: string): Promise<boolean> => {
    const updated = govtSchemes.filter((s) => s.id !== id);
    setGovtSchemes(updated);
    localStorage.setItem(STORAGE_KEYS.GOVT_SCHEMES, JSON.stringify(updated));
    return true;
  };

  // Announcement CRUD
  const addAnnouncement = async (announcementData: Omit<Announcement, 'id'>): Promise<Announcement> => {
    const newAnnouncement: Announcement = {
      ...announcementData,
      id: `ANN-${Date.now().toString().slice(-4)}`,
    };
    const updated = [newAnnouncement, ...announcements];
    setAnnouncements(updated);
    localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(updated));
    return newAnnouncement;
  };

  const updateAnnouncement = async (id: string, updates: Partial<Announcement>): Promise<boolean> => {
    const updated = announcements.map((a) => (a.id === id ? { ...a, ...updates } : a));
    setAnnouncements(updated);
    localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(updated));
    return true;
  };

  const deleteAnnouncement = async (id: string): Promise<boolean> => {
    const updated = announcements.filter((a) => a.id !== id);
    setAnnouncements(updated);
    localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(updated));
    return true;
  };

  return (
    <DataContext.Provider
      value={{
        farmers,
        lots,
        companySchemes,
        govtSchemes,
        announcements,
        isLoading,
        loadError,
        stats,
        addFarmer,
        updateFarmer,
        deleteFarmer,
        getFarmerById,
        getFarmerLots,
        importCsvData,
        addCompanyScheme,
        updateCompanyScheme,
        deleteCompanyScheme,
        addGovtScheme,
        updateGovtScheme,
        deleteGovtScheme,
        addAnnouncement,
        updateAnnouncement,
        deleteAnnouncement,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
