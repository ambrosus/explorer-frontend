import { DataValues } from './types';
import { createContext } from 'react';

const DataContext = createContext<DataValues | null>(null);

export default DataContext;
