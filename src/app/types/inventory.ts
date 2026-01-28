export interface Component {
  id: string;
  name: string;
  description: string;
  manufacturer: string;
  application: string;
  category: string;
  partNumber: string;
  quantity: number;
  minQuantity: number;
  location: {
    cabinet: string;
    shelf: number;
    position: number;
  };
  datasheetUrl?: string;
  imageUrl?: string;
  // Technical specifications
  value?: string; // e.g., "220Ω", "100µF"
  tolerance?: string; // e.g., "5%", "10%"
  power?: string; // e.g., "1/4W", "1W"
  package?: string; // e.g., "SMD 0805", "Through-hole"
  voltage?: string; // e.g., "25V", "50V"
}

export interface CartItem extends Component {
  requestedQuantity: number;
}

export interface WithdrawalRequest {
  items: CartItem[];
  requesterName: string;
  requesterID: string;
  workOrder: string;
  timestamp: Date;
}

export type Category = 
  | 'Capacitores'
  | 'Resistores'
  | 'Indutores'
  | 'Diodos'
  | 'Circuitos Integrados'
  | 'Transistores'
  | 'Conectores';