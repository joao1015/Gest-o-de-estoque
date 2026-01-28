import { Search, ShoppingCart, AlertTriangle, Package } from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { categories } from '@/app/data/mockComponents';
import { Capacitor, Resistor, Inductor, Diode, IC, Transistor,Connector } from './ComponentIcons';
import { ReactNode } from 'react';

interface HomePageProps {
  onNavigate: (view: string, category?: string) => void;
  lowStockCount: number;
  recentWithdrawals: number;
}

export function HomePage({ onNavigate, lowStockCount, recentWithdrawals }: HomePageProps) {
  const categoryIcons: Record<string, ReactNode> = {
  Capacitores: <Capacitor />,
  Resistores: <Resistor />,
  Indutores: <Inductor />,
  Diodos: <Diode />,
  'Circuitos Integrados': <IC />,
  Transistores: <Transistor/>,
  Conectores: <Connector />,
};


  return (
    <div className="max-w-[1600px] mx-auto px-6 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="mb-2" style={{ color: 'var(--safira)' }}>
          Sistema de Gestão de Estoque
        </h1>
        <p className="text-gray-600">
          Controle de componentes eletrônicos para Laboratório
        </p>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="p-6 border-l-4 hover:shadow-lg transition-shadow" 
              style={{ borderLeftColor: 'var(--coral)' }}>
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm text-gray-600 mb-1">Alertas de Estoque Baixo</div>
              <div className="text-3xl font-bold" style={{ color: 'var(--coral)' }}>
                {lowStockCount}
              </div>
              <div className="text-sm text-gray-500 mt-2">
                Componentes próximos ao limite mínimo
              </div>
            </div>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center"
                 style={{ backgroundColor: 'var(--coral-light)' }}>
              <AlertTriangle className="w-6 h-6" style={{ color: 'var(--coral)' }} />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-l-4 hover:shadow-lg transition-shadow"
              style={{ borderLeftColor: 'var(--jade)' }}>
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm text-gray-600 mb-1">Retiradas Processadas</div>
              <div className="text-3xl font-bold" style={{ color: 'var(--jade)' }}>
                {recentWithdrawals}
              </div>
              <div className="text-sm text-gray-500 mt-2">
                Solicitações concluídas hoje
              </div>
            </div>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center"
                 style={{ backgroundColor: 'var(--jade-light)' }}>
              <Package className="w-6 h-6" style={{ color: 'var(--jade)' }} />
            </div>
          </div>
        </Card>
      </div>

      {/* Category Quick Access */}
      <div className="mb-8">
        <h2 className="mb-4" style={{ color: 'var(--safira)' }}>
          Acesso Rápido por Categoria
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onNavigate('catalog', category)}
              className="p-4 bg-white border-2 rounded-lg hover:shadow-lg transition-all hover:-translate-y-1"
              style={{ borderColor: 'var(--safira)' }}
            >
              <div className="text-3xl mb-2 flex justify-center text-safira">{categoryIcons[category] || '📦'}</div>
              <div className="text-sm font-medium text-center" style={{ color: 'var(--safira)' }}>
                {category}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-8 hover:shadow-xl transition-shadow cursor-pointer group"
              onClick={() => onNavigate('catalog')}>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110"
                 style={{ backgroundColor: 'var(--safira-light)' }}>
              <Search className="w-8 h-8" style={{ color: 'var(--safira)' }} />
            </div>
            <div className="flex-1">
              <h3 className="mb-1" style={{ color: 'var(--safira)' }}>
                Pesquisar Tudo
              </h3>
              <p className="text-sm text-gray-600">
                Acesse o catálogo completo e busque componentes por especificações técnicas
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-8 hover:shadow-xl transition-shadow cursor-pointer group"
              onClick={() => onNavigate('cart')}>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110"
                 style={{ backgroundColor: 'var(--coral-light)' }}>
              <ShoppingCart className="w-8 h-8" style={{ color: 'var(--coral)' }} />
            </div>
            <div className="flex-1">
              <h3 className="mb-1" style={{ color: 'var(--safira)' }}>
                Meu Carrinho
              </h3>
              <p className="text-sm text-gray-600">
                Finalize sua solicitação de retirada e confirme os dados
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
