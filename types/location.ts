export interface Location {
    id: string;
    name: string;
    address: string;
    type?: 'home' | 'office' | 'friends' | 'other';
    coordinates: {
      lat: number;
      lng: number;
    };
    details?: {
      houseNumber?: string;
      apartment?: string;
    };
  }
  
  export interface LocationContextType {
    currentLocation: Location | null;
    savedLocations: Location[];
    recentSearches: Location[];
    setCurrentLocation: (location: Location | null) => void;
    addSavedLocation: (location: Location) => void;
    removeSavedLocation: (id: string) => void;
    addRecentSearch: (location: Location) => void;
  }
  
  