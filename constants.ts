
import { BusData } from './types';

// He: Huella por bus eléctrico = 30.9 ton CO₂/bus/año
export const HE = 30.9;

// Hn: Huella promedio buses no eléctricos = 95.0 ton CO₂/bus/año
export const HN = 95.0;

export const INITIAL_FLEET_DATA: BusData[] = [
  { id: 'euro2', name: 'EURO II', count: 135, isElectric: false, color: '#ef4444' },
  { id: 'euro3', name: 'EURO III', count: 85, isElectric: false, color: '#dc2626' },
  { id: 'aeuro4', name: 'A EURO IV', count: 1202, isElectric: false, color: '#f97316' },
  { id: 'euro4', name: 'EURO IV', count: 1085, isElectric: false, color: '#f59e0b' },
  { id: 'euro5', name: 'EURO V', count: 4111, isElectric: false, color: '#eab308' },
  { id: 'euro5filter', name: 'EURO V-CON FILTRO', count: 700, isElectric: false, color: '#ca8a04' },
  { id: 'hybrid', name: 'HÍBRIDO (DIESEL-ELÉCTRICO)', count: 292, isElectric: false, color: '#84cc16' },
  { id: 'euro6', name: 'EURO VI', count: 1108, isElectric: false, color: '#65a30d' },
  { id: 'euro6gnc', name: 'Euro VI - GNC', count: 925, isElectric: false, color: '#4d7c0f' },
  { id: 'electric', name: 'ELÉCTRICO', count: 655, isElectric: true, color: '#22c55e' },
  { id: 'euro5electric', name: 'Euro V – Eléctrico', count: 44, isElectric: true, color: '#16a34a' },
];
