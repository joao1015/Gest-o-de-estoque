import { useState } from 'react';
import { Toaster, toast } from 'sonner';
import { Header } from '@/app/components/Header';
import { HomePage } from '@/app/components/HomePage';
import { CatalogPage } from '@/app/components/CatalogPage';
import { CartPage } from '@/app/components/CartPage';
import { ProfilePage } from '@/app/components/ProfilePage';
import { AddToCartModal } from '@/app/components/AddToCartModal';
import { ConfirmationModal } from '@/app/components/ConfirmationModal';
import { WithdrawalCompletePage } from '@/app/components/WithdrawalCompletePage';
import { AdminLoginModal } from '@/app/components/AdminLoginModal';
import { AdminDashboardPage } from '@/app/components/AdminDashboardPage';
import { AdminAddComponentPage } from '@/app/components/AdminAddComponentPage';
import { AdminReportsPage } from '@/app/components/AdminReportsPage';
import { Component, CartItem } from '@/app/types/inventory';
import { mockComponents } from '@/app/data/mockComponents';

type View = 
  | 'home' 
  | 'catalog' 
  | 'cart' 
  | 'profile' 
  | 'withdrawal-complete'
  | 'admin-dashboard'
  | 'admin-add'
  | 'admin-reports';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showAdminLoginModal, setShowAdminLoginModal] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [pendingCartItem, setPendingCartItem] = useState<{
    component: Component;
    quantity: number;
  } | null>(null);
  const [withdrawalData, setWithdrawalData] = useState<{
    name: string;
    id: string;
    workOrder: string;
  } | null>(null);
  const [recentWithdrawals, setRecentWithdrawals] = useState(0);
  const [components, setComponents] = useState<Component[]>(mockComponents);

  // Calculate low stock count
  const lowStockCount = components.filter(
    (c) => c.quantity <= c.minQuantity
  ).length;

  const handleNavigate = (view: string, category?: string) => {
    // Check if trying to access admin pages
    if (view.startsWith('admin-') && !isAdminAuthenticated) {
      setShowAdminLoginModal(true);
      return;
    }
    
    setCurrentView(view as View);
    setSelectedCategory(category);
  };

  const handleAdminClick = () => {
    if (isAdminAuthenticated) {
      setCurrentView('admin-dashboard');
    } else {
      setShowAdminLoginModal(true);
    }
  };

  const handleAdminLogin = (username: string, password: string) => {
    // Simple mock authentication (in production, use real auth)
    if (username === 'admin' && password === 'admin123') {
      setIsAdminAuthenticated(true);
      setShowAdminLoginModal(false);
      setCurrentView('admin-dashboard');
      toast.success('Login realizado com sucesso!', {
        description: 'Bem-vindo ao painel administrativo',
      });
    } else {
      toast.error('Credenciais inválidas', {
        description: 'Usuário ou senha incorretos',
      });
    }
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    setCurrentView('home');
    toast.info('Logout realizado', {
      description: 'Você saiu do painel administrativo',
    });
  };

  const handleSaveComponent = (component: Component) => {
    setComponents((prev) => [...prev, component]);
    toast.success('Componente cadastrado com sucesso!', {
      description: component.name,
    });
    setCurrentView('admin-dashboard');
  };

  const handleAddToCart = (component: Component, quantity: number) => {
    setPendingCartItem({ component, quantity });
    setShowAddModal(true);
  };

  const handleContinueShopping = () => {
    if (pendingCartItem) {
      const { component, quantity } = pendingCartItem;
      
      // Check if item already exists in cart
      const existingItemIndex = cartItems.findIndex((item) => item.id === component.id);
      
      if (existingItemIndex >= 0) {
        // Update existing item quantity
        const newCartItems = [...cartItems];
        newCartItems[existingItemIndex].requestedQuantity += quantity;
        setCartItems(newCartItems);
      } else {
        // Add new item to cart
        setCartItems([...cartItems, { ...component, requestedQuantity: quantity }]);
      }
      
      toast.success('Item adicionado ao carrinho!', {
        description: `${quantity} un. de ${component.name}`,
      });
    }
    
    setShowAddModal(false);
    setPendingCartItem(null);
  };

  const handleGoToCart = () => {
    handleContinueShopping(); // Add item first
    setCurrentView('cart');
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, requestedQuantity: Math.max(1, Math.min(quantity, item.quantity)) } : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    const item = cartItems.find((i) => i.id === id);
    setCartItems((items) => items.filter((item) => item.id !== id));
    
    if (item) {
      toast.info('Item removido do carrinho', {
        description: item.name,
      });
    }
  };

  const handleConfirmWithdrawal = (data: { name: string; id: string; workOrder: string }) => {
    setWithdrawalData(data);
    setShowConfirmModal(true);
  };

  const handleFinalConfirmation = () => {
    setShowConfirmModal(false);
    setCurrentView('withdrawal-complete');
    
    toast.success('Solicitação processada com sucesso!', {
      description: 'O estoque foi atualizado.',
    });
  };

  const handleCompleteWithdrawal = () => {
    // Clear cart and reset
    setCartItems([]);
    setWithdrawalData(null);
    setCurrentView('home');
    setRecentWithdrawals((prev) => prev + 1);
    
    toast.success('Retirada concluída!', {
      description: 'Obrigado por usar o sistema.',
    });
  };

  // Check if current view is an admin view
  const isAdminView = currentView.startsWith('admin-');

  return (
    <div className="min-h-screen bg-gray-50">
      {!isAdminView && (
        <Header
          cartItemCount={cartItems.length}
          onNavigate={handleNavigate}
          currentView={currentView}
          onAdminClick={handleAdminClick}
        />
      )}

      <main>
        {currentView === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            lowStockCount={lowStockCount}
            recentWithdrawals={recentWithdrawals}
          />
        )}

        {currentView === 'catalog' && (
          <CatalogPage
            onAddToCart={handleAddToCart}
            selectedCategory={selectedCategory}
          />
        )}

        {currentView === 'cart' && (
          <CartPage
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onConfirmWithdrawal={handleConfirmWithdrawal}
          />
        )}

        {currentView === 'profile' && <ProfilePage />}

        {currentView === 'withdrawal-complete' && withdrawalData && (
          <WithdrawalCompletePage
            items={cartItems}
            requesterName={withdrawalData.name}
            workOrder={withdrawalData.workOrder}
            onComplete={handleCompleteWithdrawal}
          />
        )}

        {/* Admin Views */}
        {currentView === 'admin-dashboard' && (
          <AdminDashboardPage
            onNavigate={handleNavigate}
            onLogout={handleAdminLogout}
          />
        )}

        {currentView === 'admin-add' && (
          <AdminAddComponentPage
            onBack={() => setCurrentView('admin-dashboard')}
            onSave={handleSaveComponent}
          />
        )}

        {currentView === 'admin-reports' && (
          <AdminReportsPage
            onBack={() => setCurrentView('admin-dashboard')}
          />
        )}
      </main>

      {/* Modals */}
      <AddToCartModal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setPendingCartItem(null);
        }}
        component={pendingCartItem?.component || null}
        quantity={pendingCartItem?.quantity || 0}
        onContinueShopping={handleContinueShopping}
        onGoToCart={handleGoToCart}
      />

      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleFinalConfirmation}
        itemCount={cartItems.length}
      />

      <AdminLoginModal
        isOpen={showAdminLoginModal}
        onClose={() => setShowAdminLoginModal(false)}
        onLogin={handleAdminLogin}
      />

      {/* Toast Notifications */}
      <Toaster position="top-right" richColors />
    </div>
  );
}
