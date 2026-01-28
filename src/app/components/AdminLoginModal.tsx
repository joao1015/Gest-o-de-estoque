import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/app/components/ui/dialog';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Shield } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (username: string, password: string) => void;
}

export function AdminLoginModal({ isOpen, onClose, onLogin }: AdminLoginModalProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, password);
    setUsername('');
    setPassword('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm border-t-4" style={{ borderTopColor: 'var(--safira)' }}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2" style={{ color: 'var(--safira)' }}>
            <Shield className="w-5 h-5" />
            Acesso Administrativo
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div>
            <label className="block text-sm text-gray-700 mb-2">Usuário</label>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Digite seu usuário"
              className="border-2"
              style={{ borderColor: 'var(--safira)' }}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">Senha</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Digite sua senha"
              className="border-2"
              style={{ borderColor: 'var(--safira)' }}
            />
          </div>

          <Button
            type="submit"
            className="w-full h-11 text-white border-0"
            style={{ backgroundColor: 'var(--safira)' }}
          >
            Acessar Painel
          </Button>
        </form>

        <div className="text-xs text-gray-500 text-center">
          Acesso restrito a administradores do laboratório
        </div>
      </DialogContent>
    </Dialog>
  );
}
