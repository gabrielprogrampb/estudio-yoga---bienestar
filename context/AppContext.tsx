
import React, { createContext, useReducer, useContext, type ReactNode, type Dispatch } from 'react';
import type { AppState, Action } from '../types';
import { INITIAL_STATE } from '../constants';

// Helper to get state from localStorage or use initial state
const getInitialState = (): AppState => {
  try {
    const savedState = localStorage.getItem('yogaStudioState');
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      // Keep auth status false on reload for security simulation
      parsedState.isAuthenticated = false; 
      return parsedState;
    }
  } catch (e) {
    console.error("Could not load state from localStorage", e);
  }
  return INITIAL_STATE;
};

const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, isAuthenticated: true };
    case 'LOGOUT':
      return { ...state, isAuthenticated: false };
    case 'ADD_ITEM': {
      const { collection, item } = action.payload;
      const collectionState = state[collection as keyof Omit<AppState, 'isAuthenticated' | 'legal' | 'bookings'>];
      if (Array.isArray(collectionState)) {
        return { ...state, [collection]: [...collectionState, item] };
      }
      return state;
    }
    case 'UPDATE_ITEM': {
      const { collection, id, updates } = action.payload;
      const collectionState = state[collection] as {id: string}[];
       if (Array.isArray(collectionState)) {
        return {
          ...state,
          [collection]: collectionState.map((item) => (item.id === id ? { ...item, ...updates } : item)),
        };
      }
      return state;
    }
    case 'DELETE_ITEM': {
      const { collection, id } = action.payload;
      const collectionState = state[collection] as {id: string}[];
       if (Array.isArray(collectionState)) {
        return {
          ...state,
          [collection]: collectionState.filter((item) => item.id !== id),
        };
       }
      return state;
    }
    case 'UPDATE_LEGAL': {
      const { section, content } = action.payload;
      return { ...state, legal: { ...state.legal, [section]: content } };
    }
    case 'ADD_BOOKING':
        return { ...state, bookings: [...state.bookings, action.payload] };
    default:
      return state;
  }
};

interface AppContextType {
  state: AppState;
  dispatch: Dispatch<Action>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, getInitialState());

  React.useEffect(() => {
    try {
      // Create a version of the state without auth for persistence
      const stateToSave = { ...state, isAuthenticated: false };
      localStorage.setItem('yogaStudioState', JSON.stringify(stateToSave));
    } catch (e) {
      console.error("Could not save state to localStorage", e);
    }
  }, [state]);


  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};