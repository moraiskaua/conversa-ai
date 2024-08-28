'use client';

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

interface InitialValues {
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
}

const initialValues: InitialValues = {
  currentStep: 1,
  setCurrentStep: () => undefined,
};

const AuthContext = createContext(initialValues);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [currentStep, setCurrentStep] = useState<number>(
    initialValues.currentStep,
  );

  return (
    <AuthContext.Provider value={{ currentStep, setCurrentStep }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
