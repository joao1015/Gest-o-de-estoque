import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/app/components/ui/dialog';
import { Button } from '@/app/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemCount: number;
}

export function ConfirmationModal({ isOpen, onClose, onConfirm, itemCount }: ConfirmationModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md border-t-4" style={{ borderTopColor: 'var(--coral)' }}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3" style={{ color: 'var(--coral)' }}>
            <AlertTriangle className="w-6 h-6" />
            Confirmar Retirada
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <div className="mb-6 text-gray-700 leading-relaxed">
            <p className="mb-3">
              Tem certeza que deseja processar esta retirada?
            </p>
            <p className="text-sm">
              O estoque será atualizado imediatamente para{' '}
              <span className="font-semibold" style={{ color: 'var(--safira)' }}>
                {itemCount} {itemCount === 1 ? 'componente' : 'componentes'}
              </span>
              .
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 h-11 border-2"
              style={{ borderColor: 'var(--safira)', color: 'var(--safira)' }}
            >
              Cancelar
            </Button>
            
            <Button
              onClick={onConfirm}
              className="flex-1 h-11 text-white border-0"
              style={{ backgroundColor: 'var(--coral)' }}
            >
              Confirmar Retirada
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
