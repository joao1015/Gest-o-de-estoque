import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/app/components/ui/dialog';
import { Button } from '@/app/components/ui/button';
import { ShoppingCart, Search } from 'lucide-react';
import { Component } from '@/app/types/inventory';

interface AddToCartModalProps {
  isOpen: boolean;
  onClose: () => void;
  component: Component | null;
  quantity: number;
  onContinueShopping: () => void;
  onGoToCart: () => void;
}

export function AddToCartModal({
  isOpen,
  onClose,
  component,
  quantity,
  onContinueShopping,
  onGoToCart,
}: AddToCartModalProps) {
  if (!component) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md border-t-4" style={{ borderTopColor: 'var(--safira)' }}>
        <DialogHeader>
          <DialogTitle style={{ color: 'var(--safira)' }}>
            Item Adicionado ao Carrinho
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <div className="flex gap-4 mb-6">
            <div className="w-20 h-20 rounded-lg flex items-center justify-center flex-shrink-0"
                 style={{ backgroundColor: 'var(--safira-light)' }}>
              <div className="text-3xl">📦</div>
            </div>
            <div className="flex-1">
              <div className="font-semibold text-gray-900 mb-1">{component.name}</div>
              <div className="text-sm text-gray-600 mb-2">{component.description}</div>
              <div className="inline-block px-3 py-1 rounded-full text-sm font-semibold text-white"
                   style={{ backgroundColor: 'var(--jade)' }}>
                Quantidade: {quantity} un.
              </div>
            </div>
          </div>

          <div className="text-center mb-6 text-gray-700">
            O que deseja fazer?
          </div>

          <div className="space-y-3">
            <Button
              onClick={onContinueShopping}
              variant="outline"
              className="w-full h-12 border-2"
              style={{ borderColor: 'var(--safira)', color: 'var(--safira)' }}
            >
              <Search className="w-5 h-5 mr-2" />
              Adicionar e Continuar Pesquisando
            </Button>
            
            <Button
              onClick={onGoToCart}
              className="w-full h-12 text-white border-0"
              style={{ backgroundColor: 'var(--jade)' }}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Adicionar e Ir para Retirada
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
