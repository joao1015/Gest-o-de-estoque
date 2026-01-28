import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Plus, BarChart3, LogOut, Package, AlertTriangle } from 'lucide-react';
import { mockComponents } from '@/app/data/mockComponents';

interface AdminDashboardPageProps {
  onNavigate: (view: string) => void;
  onLogout: () => void;
}

export function AdminDashboardPage({ onNavigate, onLogout }: AdminDashboardPageProps) {
  const lowStockCount = mockComponents.filter((c) => c.quantity <= c.minQuantity).length;
  const totalComponents = mockComponents.reduce((sum, c) => sum + c.quantity, 0);

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 style={{ color: 'var(--safira)' }}>
            Painel Administrativo
          </h1>
          <p className="text-gray-600 mt-2">
            Gerencie o inventário do laboratório
          </p>
        </div>
        <Button
          onClick={onLogout}
          variant="outline"
          className="border-2"
          style={{ borderColor: 'var(--coral)', color: 'var(--coral)' }}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sair
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card className="p-6 border-l-4" style={{ borderLeftColor: 'var(--safira)' }}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center"
                 style={{ backgroundColor: 'var(--safira-light)' }}>
              <Package className="w-6 h-6" style={{ color: 'var(--safira)' }} />
            </div>
            <div>
              <div className="text-2xl font-bold" style={{ color: 'var(--safira)' }}>
                {totalComponents}
              </div>
              <div className="text-sm text-gray-600">Componentes em Estoque</div>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-l-4" style={{ borderLeftColor: 'var(--coral)' }}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center"
                 style={{ backgroundColor: 'var(--coral-light)' }}>
              <AlertTriangle className="w-6 h-6" style={{ color: 'var(--coral)' }} />
            </div>
            <div>
              <div className="text-2xl font-bold" style={{ color: 'var(--coral)' }}>
                {lowStockCount}
              </div>
              <div className="text-sm text-gray-600">Alertas de Estoque Baixo</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Action Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card 
          className="p-8 hover:shadow-xl transition-all cursor-pointer group border-2"
          style={{ borderColor: 'var(--jade)' }}
          onClick={() => onNavigate('admin-add')}
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110"
                 style={{ backgroundColor: 'var(--jade)' }}>
              <Plus className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="mb-1" style={{ color: 'var(--safira)' }}>
                Cadastrar Componente
              </h3>
              <p className="text-sm text-gray-600">
                Adicione novos componentes ao inventário com dados técnicos e localização
              </p>
            </div>
          </div>
        </Card>

        <Card 
          className="p-8 hover:shadow-xl transition-all cursor-pointer group border-2"
          style={{ borderColor: 'var(--safira)' }}
          onClick={() => onNavigate('admin-reports')}
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110"
                 style={{ backgroundColor: 'var(--safira)' }}>
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="mb-1" style={{ color: 'var(--safira)' }}>
                Relatórios e Análises
              </h3>
              <p className="text-sm text-gray-600">
                Visualize estatísticas de uso, alertas de reposição e gráficos
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activity or Instructions */}
      <Card className="p-6 mt-6 bg-blue-50 border-blue-200">
        <h3 className="font-semibold text-gray-900 mb-2">Instruções de Uso</h3>
        <ul className="space-y-1 text-sm text-gray-700">
          <li>• Use "Cadastrar Componente" para adicionar novos itens ao inventário</li>
          <li>• Sempre preencha dados técnicos completos para facilitar buscas</li>
          <li>• Verifique os "Relatórios" regularmente para identificar necessidades de reposição</li>
          <li>• A localização física (Armário/Prateleira/Posição) deve ser precisa</li>
        </ul>
      </Card>
    </div>
  );
}
