import { ShoppingCart, Cpu, Shield } from 'lucide-react';
import { Badge } from '@/app/components/ui/badge';

interface HeaderProps {
  cartItemCount: number;
  onNavigate: (view: string) => void;
  currentView: string;
  onAdminClick: () => void;
}

export function Header({ cartItemCount, onNavigate, currentView, onAdminClick }: HeaderProps) {
  return (
    <header className="bg-white border-b-2 shadow-sm" style={{ borderBottomColor: 'var(--safira)' }}>
      <div className="max-w-[1800px] mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" 
                 style={{ backgroundColor: 'var(--safira)' }}>
              <Cpu className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <div className="font-bold text-lg" style={{ color: 'var(--safira)' }}>
                Lab Eletrônica
              </div>
              <div className="text-xs text-gray-500">Sistema de Estoque</div>
            </div>
          </button>

          {/* Right Side */}
          <div className="flex items-center gap-6">
            {/* Cart Icon */}
            <button
              onClick={() => onNavigate('cart')}
              className="relative p-3 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Carrinho de retirada"
            >
              <ShoppingCart className="w-6 h-6" style={{ color: 'var(--safira)' }} />
              {cartItemCount > 0 && (
                <Badge
                  className="absolute -top-1 -right-1 px-2 py-0.5 text-xs font-bold text-white border-0"
                  style={{ backgroundColor: 'var(--coral)' }}
                >
                  {cartItemCount}
                </Badge>
              )}
            </button>

            {/* Admin Button */}
            <button
              onClick={onAdminClick}
              className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 transition-colors text-sm"
              style={{ color: 'var(--safira)' }}
            >
              <Shield className="w-4 h-4" />
              Admin
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
