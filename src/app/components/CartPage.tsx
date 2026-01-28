import { useState } from 'react';
import { Trash2, Package } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Card } from '@/app/components/ui/card';
import { CartItem } from '@/app/types/inventory';

interface CartPageProps {
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onConfirmWithdrawal: (data: { name: string; id: string; workOrder: string }) => void;
}

export function CartPage({ cartItems, onUpdateQuantity, onRemoveItem, onConfirmWithdrawal }: CartPageProps) {
  const [requesterName, setRequesterName] = useState('');
  const [requesterID, setRequesterID] = useState('');
  const [workOrder, setWorkOrder] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (requesterName && requesterID && workOrder && cartItems.length > 0) {
      onConfirmWithdrawal({ name: requesterName, id: requesterID, workOrder });
    }
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.requestedQuantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="max-w-[1600px] mx-auto px-6 py-8">
        <div className="text-center py-16">
          <div className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center"
               style={{ backgroundColor: 'var(--safira-light)' }}>
            <Package className="w-12 h-12" style={{ color: 'var(--safira)' }} />
          </div>
          <h2 className="mb-2" style={{ color: 'var(--safira)' }}>
            Carrinho Vazio
          </h2>
          <p className="text-gray-600">
            Adicione componentes ao carrinho para iniciar uma retirada
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-8">
      <h1 className="mb-6" style={{ color: 'var(--safira)' }}>
        Carrinho de Retirada
      </h1>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <h3 className="mb-4" style={{ color: 'var(--safira)' }}>
              Itens Selecionados ({cartItems.length})
            </h3>
            
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-16 h-16 rounded flex items-center justify-center flex-shrink-0"
                       style={{ backgroundColor: 'var(--safira-light)' }}>
                    <div className="text-2xl">📦</div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 mb-1">{item.name}</div>
                    <div className="text-sm text-gray-600 mb-2">{item.description}</div>
                    <div className="flex items-center gap-4">
                      <div className="text-sm text-gray-500">
                        Disponível: <span className="font-semibold">{item.quantity} un.</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <label className="text-sm text-gray-700">Quantidade:</label>
                        <Input
                          type="number"
                          min="1"
                          max={item.quantity}
                          value={item.requestedQuantity}
                          onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value) || 1)}
                          className="w-20 h-8 border-2"
                          style={{ borderColor: 'var(--safira)' }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="p-2 h-fit rounded hover:bg-red-50 transition-colors"
                    aria-label="Remover item"
                  >
                    <Trash2 className="w-5 h-5" style={{ color: 'var(--coral)' }} />
                  </button>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Checkout Form */}
        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-6">
            <h3 className="mb-4" style={{ color: 'var(--safira)' }}>
              Dados da Solicitação
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Nome do Solicitante *
                </label>
                <Input
                  type="text"
                  value={requesterName}
                  onChange={(e) => setRequesterName(e.target.value)}
                  required
                  placeholder="Seu nome completo"
                  className="border-2"
                  style={{ borderColor: 'var(--safira)' }}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Matrícula / ID *
                </label>
                <Input
                  type="text"
                  value={requesterID}
                  onChange={(e) => setRequesterID(e.target.value)}
                  required
                  placeholder="Ex: 2024001"
                  className="border-2"
                  style={{ borderColor: 'var(--safira)' }}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Ordem de Serviço (OS) / Projeto *
                </label>
                <Input
                  type="text"
                  value={workOrder}
                  onChange={(e) => setWorkOrder(e.target.value)}
                  required
                  placeholder="Ex: OS-2024-0015"
                  className="border-2"
                  style={{ borderColor: 'var(--safira)' }}
                />
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between mb-4">
                  <span className="text-gray-700">Total de Itens:</span>
                  <span className="font-semibold" style={{ color: 'var(--safira)' }}>
                    {totalItems} unidades
                  </span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="text-gray-700">Tipos de Componentes:</span>
                  <span className="font-semibold" style={{ color: 'var(--safira)' }}>
                    {cartItems.length}
                  </span>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-white border-0"
                style={{ backgroundColor: 'var(--coral)' }}
                disabled={!requesterName || !requesterID || !workOrder}
              >
                Confirmar Solicitação de Retirada
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
