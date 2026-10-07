import React, { createContext, useContext, useState, useEffect } from 'react';
import { BusinessConfig } from '../types';
import { DEFAULT_BUSINESS_CONFIG } from '../data/brandConfig';

interface RegulatoryContextType {
  config: BusinessConfig;
  updateConfig: (newValues: Partial<BusinessConfig>) => void;
  resetConfig: () => void;
  isEditorOpen: boolean;
  setIsEditorOpen: (open: boolean) => void;
}

const RegulatoryContext = createContext<RegulatoryContextType | undefined>(undefined);

const STORAGE_KEY = 'kathlouria_farms_business_config_v3';

export const RegulatoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<BusinessConfig>(DEFAULT_BUSINESS_CONFIG);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Safely hydrate from localStorage on client-side only
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('kathlouria_farms_business_config_v2') || localStorage.getItem('kathlouria_farms_business_config');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!parsed.businessAddress || parsed.businessAddress.includes('Kathlouria Heritage Estate') || parsed.businessAddress.includes('144527')) {
          parsed.businessAddress = DEFAULT_BUSINESS_CONFIG.businessAddress;
        }
        if (!parsed.customerCareEmail || parsed.customerCareEmail.includes('care@kathlouriafarms.com')) {
          parsed.customerCareEmail = DEFAULT_BUSINESS_CONFIG.customerCareEmail;
        }
        if (!parsed.customerCareNumber || parsed.customerCareNumber.includes('98765')) {
          parsed.customerCareNumber = DEFAULT_BUSINESS_CONFIG.customerCareNumber;
        }
        setConfig(prev => ({ ...prev, ...parsed }));
      }
    } catch {
      // fallback to default
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch {
      // localStorage may fail in private mode
    }
  }, [config, isHydrated]);

  const updateConfig = (newValues: Partial<BusinessConfig>) => {
    setConfig(prev => ({ ...prev, ...newValues }));
  };

  const resetConfig = () => {
    setConfig(DEFAULT_BUSINESS_CONFIG);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  return (
    <RegulatoryContext.Provider value={{ config, updateConfig, resetConfig, isEditorOpen, setIsEditorOpen }}>
      {children}
    </RegulatoryContext.Provider>
  );
};

export const useRegulatory = () => {
  const context = useContext(RegulatoryContext);
  if (!context) {
    throw new Error('useRegulatory must be used within a RegulatoryProvider');
  }
  return context;
};
