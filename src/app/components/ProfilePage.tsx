import { User, Package, Clock, TrendingUp } from 'lucide-react';
import { Card } from '@/app/components/ui/card';

export function ProfilePage() {
  const mockUser = {
    name: 'João Silva',
    id: '2024001',
    role: 'Técnico de Laboratório',
    email: 'joao.silva@lab.edu.br',
  };

  const mockStats = {
    totalWithdrawals: 42,
    thisMonth: 8,
    mostUsedCategory: 'Resistores',
    lastWithdrawal: '20/01/2026',
  };

  return (
    <div className="max-w-[1000px] mx-auto px-6 py-8">
      <h1 className="mb-6" style={{ color: 'var(--safira)' }}>
        Meu Perfil
      </h1>

      {/* User Info Card */}
      <Card className="p-6 mb-6 border-l-4" style={{ borderLeftColor: 'var(--safira)' }}>
        <div className="flex items-start gap-4">
          <div className="w-20 h-20 rounded-full flex items-center justify-center flex-shrink-0"
               style={{ backgroundColor: 'var(--safira-light)' }}>
            <User className="w-10 h-10" style={{ color: 'var(--safira)' }} />
          </div>
          <div className="flex-1">
            <h2 className="mb-1" style={{ color: 'var(--safira)' }}>
              {mockUser.name}
            </h2>
            <div className="text-gray-600 mb-1">{mockUser.role}</div>
            <div className="text-sm text-gray-500">Matrícula: {mockUser.id}</div>
            <div className="text-sm text-gray-500">{mockUser.email}</div>
          </div>
        </div>
      </Card>

      {/* Statistics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="p-4 border-l-4" style={{ borderLeftColor: 'var(--jade)' }}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center"
                 style={{ backgroundColor: 'var(--jade-light)' }}>
              <Package className="w-6 h-6" style={{ color: 'var(--jade)' }} />
            </div>
            <div>
              <div className="text-2xl font-bold" style={{ color: 'var(--jade)' }}>
                {mockStats.totalWithdrawals}
              </div>
              <div className="text-sm text-gray-600">Total de Retiradas</div>
            </div>
          </div>
        </Card>

        <Card className="p-4 border-l-4" style={{ borderLeftColor: 'var(--safira)' }}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center"
                 style={{ backgroundColor: 'var(--safira-light)' }}>
              <Clock className="w-6 h-6" style={{ color: 'var(--safira)' }} />
            </div>
            <div>
              <div className="text-2xl font-bold" style={{ color: 'var(--safira)' }}>
                {mockStats.thisMonth}
              </div>
              <div className="text-sm text-gray-600">Este Mês</div>
            </div>
          </div>
        </Card>

        <Card className="p-4 border-l-4" style={{ borderLeftColor: 'var(--coral)' }}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center"
                 style={{ backgroundColor: 'var(--coral-light)' }}>
              <TrendingUp className="w-6 h-6" style={{ color: 'var(--coral)' }} />
            </div>
            <div>
              <div className="text-lg font-bold" style={{ color: 'var(--coral)' }}>
                {mockStats.mostUsedCategory}
              </div>
              <div className="text-sm text-gray-600">Mais Utilizado</div>
            </div>
          </div>
        </Card>

        <Card className="p-4 border-l-4" style={{ borderLeftColor: 'var(--jade)' }}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center"
                 style={{ backgroundColor: 'var(--jade-light)' }}>
              <Clock className="w-6 h-6" style={{ color: 'var(--jade)' }} />
            </div>
            <div>
              <div className="text-sm font-bold" style={{ color: 'var(--jade)' }}>
                {mockStats.lastWithdrawal}
              </div>
              <div className="text-sm text-gray-600">Última Retirada</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <h3 className="mb-4" style={{ color: 'var(--safira)' }}>
          Atividade Recente
        </h3>
        <div className="space-y-3">
          {[
            { date: '20/01/2026', items: 'Resistor 220Ω, Capacitor 100µF', os: 'OS-2024-0015' },
            { date: '18/01/2026', items: 'LED Vermelho 5mm (x10)', os: 'OS-2024-0012' },
            { date: '15/01/2026', items: 'Arduino Nano, Diodo 1N4007', os: 'OS-2024-0008' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 rounded flex items-center justify-center"
                   style={{ backgroundColor: 'var(--safira-light)' }}>
                <Package className="w-5 h-5" style={{ color: 'var(--safira)' }} />
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-900">{activity.items}</div>
                <div className="text-sm text-gray-500">OS: {activity.os}</div>
              </div>
              <div className="text-sm text-gray-500">{activity.date}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
