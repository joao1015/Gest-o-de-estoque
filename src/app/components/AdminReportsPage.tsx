import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { ArrowLeft, AlertTriangle, TrendingUp, Package } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockComponents } from '@/app/data/mockComponents';

interface AdminReportsPageProps {
  onBack: () => void;
  withdrawalHistory?: Array<{ componentName: string; quantity: number; date: Date }>;
}

export function AdminReportsPage({ onBack, withdrawalHistory = [] }: AdminReportsPageProps) {
  // Calculate statistics
  const lowStockComponents = mockComponents.filter((c) => c.quantity <= c.minQuantity);
  const totalComponents = mockComponents.reduce((sum, c) => sum + c.quantity, 0);
  
  // Mock data for most withdrawn components
  const mostWithdrawnData = [
    { name: 'Resistor 220Ω', quantidade: 145 },
    { name: 'Capacitor 0.1µF', quantidade: 98 },
    { name: 'LED Vermelho', quantidade: 87 },
    { name: 'Diodo 1N4007', quantidade: 76 },
    { name: 'Resistor 10kΩ', quantidade: 65 },
    { name: 'BC547 NPN', quantidade: 54 },
  ];

  // Category distribution
  const categoryData = [
    { name: 'Resistores', quantidade: 2508 },
    { name: 'Capacitores', quantidade: 1305 },
    { name: 'Diodos', quantidade: 634 },
    { name: 'C.I.', quantidade: 119 },
    { name: 'Transistores', quantidade: 325 },
    { name: 'Indutores', quantidade: 130 },
    { name: 'Conectores', quantidade: 110 },
  ];

  return (
    <div className="max-w-[1600px] mx-auto px-6 py-8">
      <div className="mb-6">
        <Button
          variant="outline"
          onClick={onBack}
          className="mb-4 border-2"
          style={{ borderColor: 'var(--safira)', color: 'var(--safira)' }}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar ao Painel
        </Button>
        <h1 style={{ color: 'var(--safira)' }}>
          Relatórios e Análises
        </h1>
        <p className="text-gray-600 mt-2">
          Visão geral do estoque e movimentações
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-6">
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
              <div className="text-sm text-gray-600">Total em Estoque</div>
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
                {lowStockComponents.length}
              </div>
              <div className="text-sm text-gray-600">Componentes Abaixo do Mínimo</div>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-l-4" style={{ borderLeftColor: 'var(--jade)' }}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center"
                 style={{ backgroundColor: 'var(--jade-light)' }}>
              <TrendingUp className="w-6 h-6" style={{ color: 'var(--jade)' }} />
            </div>
            <div>
              <div className="text-2xl font-bold" style={{ color: 'var(--jade)' }}>
                {mockComponents.length}
              </div>
              <div className="text-sm text-gray-600">Tipos de Componentes</div>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Most Withdrawn Components Chart */}
        <Card className="p-6">
          <h3 className="mb-4" style={{ color: 'var(--safira)' }}>
            Componentes Mais Retirados (Último Mês)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mostWithdrawnData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 11 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="quantidade" fill="var(--safira)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Category Distribution Chart */}
        <Card className="p-6">
          <h3 className="mb-4" style={{ color: 'var(--safira)' }}>
            Distribuição por Categoria
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 11 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="quantidade" fill="var(--jade)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Low Stock Alert Table */}
      <Card className="p-6">
        <h3 className="mb-4 flex items-center gap-2" style={{ color: 'var(--coral)' }}>
          <AlertTriangle className="w-5 h-5" />
          Alertas de Reposição Necessária
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b-2" style={{ backgroundColor: 'var(--coral-light)' }}>
              <tr>
                <th className="px-4 py-3 text-left font-semibold" style={{ color: 'var(--coral)' }}>
                  Componente
                </th>
                <th className="px-4 py-3 text-left font-semibold" style={{ color: 'var(--coral)' }}>
                  Part Number
                </th>
                <th className="px-4 py-3 text-center font-semibold" style={{ color: 'var(--coral)' }}>
                  Estoque Atual
                </th>
                <th className="px-4 py-3 text-center font-semibold" style={{ color: 'var(--coral)' }}>
                  Mínimo
                </th>
                <th className="px-4 py-3 text-center font-semibold" style={{ color: 'var(--coral)' }}>
                  Localização
                </th>
                <th className="px-4 py-3 text-center font-semibold" style={{ color: 'var(--coral)' }}>
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {lowStockComponents.map((component) => {
                const deficit = component.minQuantity - component.quantity;
                const isCritical = component.quantity <= 5;
                
                return (
                  <tr key={component.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{component.name}</td>
                    <td className="px-4 py-3 text-gray-600 font-mono text-xs">{component.partNumber}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="font-semibold" style={{ color: 'var(--coral)' }}>
                        {component.quantity}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center text-gray-600">
                      {component.minQuantity}
                    </td>
                    <td className="px-4 py-3 text-center text-gray-600 text-xs">
                      {component.location.cabinet}-{component.location.shelf}-{component.location.position}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span 
                        className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                        style={{ backgroundColor: isCritical ? 'var(--coral)' : '#FF9966' }}
                      >
                        {isCritical ? 'CRÍTICO' : 'BAIXO'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
