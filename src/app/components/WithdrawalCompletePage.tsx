import { CheckCircle2, MapPin } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { CartItem } from '@/app/types/inventory';

interface WithdrawalCompletePageProps {
  items: CartItem[];
  requesterName: string;
  workOrder: string;
  onComplete: () => void;
}

export function WithdrawalCompletePage({
  items,
  requesterName,
  workOrder,
  onComplete,
}: WithdrawalCompletePageProps) {
  return (
    <div className="max-w-[1000px] mx-auto px-6 py-8">
      {/* Success Message */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
             style={{ backgroundColor: 'var(--jade-light)' }}>
          <CheckCircle2 className="w-12 h-12" style={{ color: 'var(--jade)' }} />
        </div>
        <h1 className="mb-2" style={{ color: 'var(--jade)' }}>
          Solicitação Aprovada!
        </h1>
        <p className="text-gray-600">
          Siga o guia de localização abaixo para coletar seus componentes
        </p>
      </div>

      {/* Request Info */}
      <Card className="p-6 mb-6 border-l-4" style={{ borderLeftColor: 'var(--safira)' }}>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <div className="text-sm text-gray-600 mb-1">Solicitante</div>
            <div className="font-semibold text-gray-900">{requesterName}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-1">Ordem de Serviço</div>
            <div className="font-semibold text-gray-900">{workOrder}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-1">Data/Hora</div>
            <div className="font-semibold text-gray-900">
              {new Date().toLocaleString('pt-BR')}
            </div>
          </div>
        </div>
      </Card>

      {/* Collection Guide */}
      <Card className="p-6 mb-6">
        <h2 className="mb-4 flex items-center gap-2" style={{ color: 'var(--safira)' }}>
          <MapPin className="w-5 h-5" />
          Guia de Coleta
        </h2>

        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={item.id} className="border-l-4 pl-4 py-3 rounded-r"
                 style={{ borderLeftColor: 'var(--jade)', backgroundColor: 'var(--safira-light)' }}>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-white"
                     style={{ backgroundColor: 'var(--safira)' }}>
                  {index + 1}
                </div>
                
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 mb-1">
                    {item.name}
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    Quantidade: <span className="font-semibold">{item.requestedQuantity} un.</span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg font-medium"
                       style={{ backgroundColor: 'var(--safira)', color: 'white' }}>
                    <MapPin className="w-4 h-4" />
                    <span>
                      Armário {item.location.cabinet}, Prateleira {item.location.shelf}, Posição {item.location.position}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Instructions */}
      <Card className="p-6 mb-6 bg-yellow-50 border-yellow-200">
        <h3 className="font-semibold text-gray-900 mb-2">Instruções Importantes</h3>
        <ul className="space-y-1 text-sm text-gray-700">
          <li>• Verifique cuidadosamente o código de cada componente antes de retirá-lo</li>
          <li>• Certifique-se de pegar a quantidade exata solicitada</li>
          <li>• Mantenha os componentes organizados e identificados</li>
          <li>• Ao finalizar, clique no botão abaixo para atualizar o sistema</li>
        </ul>
      </Card>

      {/* Complete Button */}
      <div className="text-center">
        <Button
          onClick={onComplete}
          className="h-14 px-12 text-white border-0"
          style={{ backgroundColor: 'var(--jade)' }}
        >
          Concluir Retirada Física
        </Button>
        <p className="text-sm text-gray-500 mt-3">
          Este botão irá atualizar o estoque e retornar à tela inicial
        </p>
      </div>
    </div>
  );
}
