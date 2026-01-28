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
    <header className="bg-white border-b-3 shadow-sm" style={{ borderBottomColor: 'var(--safira)' }}>
      <div className="max-w-full mx-auto px-0 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="relative w-full h-10 flex items-center px-4 hover:opacity-80 transition-opacity"
          >
            {/* LOGO ESQUERDA */}
            <div className="absolute left-0 flex items-center z-10">
            <img src="/imagem.png" alt="Logo" className="h-20 w-auto object-contain"/>
            </div>
            <div className="absolute left-1/2 mx-auto text-center">
              <div className="text-lg text-gray-500">Sistema de Estoque</div>
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
 
 