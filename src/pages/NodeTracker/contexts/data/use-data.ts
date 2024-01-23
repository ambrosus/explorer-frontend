import DataContext from './context';
import { DataValues } from './types';
import { useContext } from 'react';

export const useData = () => {
  const context = useContext(DataContext);

  if (context === undefined) {
    throw new Error('useData must be used within DataContext');
  }
  return context as DataValues;
};
