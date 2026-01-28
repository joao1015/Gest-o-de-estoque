import { useState, useMemo } from 'react';
import { Search, FileText, Plus, AlertTriangle } from 'lucide-react';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Component } from '@/app/types/inventory';
import { mockComponents, categories, manufacturers } from '@/app/data/mockComponents';

interface CatalogPageProps {
  onAddToCart: (component: Component, quantity: number) => void;
  selectedCategory?: string;
}

export function CatalogPage({ onAddToCart, selectedCategory }: CatalogPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>(selectedCategory || 'all');
  const [manufacturerFilter, setManufacturerFilter] = useState<string>('all');
  const [valueFilter, setValueFilter] = useState<string>('');
  const [toleranceFilter, setToleranceFilter] = useState<string>('all');
  const [powerFilter, setPowerFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  
  const itemsPerPage = 15;

  // Get unique values for filters
  const tolerances = [...new Set(mockComponents.map((c) => c.tolerance).filter(Boolean))].sort();
  const powers = [...new Set(mockComponents.map((c) => c.power).filter(Boolean))].sort();

  const filteredComponents = useMemo(() => {
    return mockComponents.filter((component) => {
      const matchesSearch = 
        component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        component.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        component.partNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (component.value && component.value.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = categoryFilter === 'all' || component.category === categoryFilter;
      const matchesManufacturer = manufacturerFilter === 'all' || component.manufacturer === manufacturerFilter;
      const matchesValue = !valueFilter || (component.value && component.value.toLowerCase().includes(valueFilter.toLowerCase()));
      const matchesTolerance = toleranceFilter === 'all' || component.tolerance === toleranceFilter;
      const matchesPower = powerFilter === 'all' || component.power === powerFilter;
      
      return matchesSearch && matchesCategory && matchesManufacturer && matchesValue && matchesTolerance && matchesPower;
    });
  }, [searchQuery, categoryFilter, manufacturerFilter, valueFilter, toleranceFilter, powerFilter]);

  const totalPages = Math.ceil(filteredComponents.length / itemsPerPage);
  const currentComponents = filteredComponents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleQuantityChange = (id: string, value: string) => {
    const num = parseInt(value) || 0;
    setQuantities((prev) => ({ ...prev, [id]: Math.max(0, num) }));
  };

  const handleAdd = (component: Component) => {
    const quantity = quantities[component.id] || 0;
    if (quantity > 0) {
      onAddToCart(component, quantity);
      setQuantities((prev) => ({ ...prev, [component.id]: 0 }));
    }
  };

  return (
    <div className="max-w-[1800px] mx-auto px-6 py-6">
      <div className="flex gap-6">
        {/* Sidebar - Technical Filters */}
        <aside className="w-64 flex-shrink-0">
          <div className="bg-white rounded border-2 p-4 sticky top-6"
               style={{ borderColor: 'var(--safira)' }}>
            <h3 className="mb-4 pb-2 border-b" style={{ color: 'var(--safira)' }}>
              Filtros Técnicos
            </h3>
            
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-600 mb-1 block font-medium">Categoria</label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="h-9 border text-sm" style={{ borderColor: 'var(--safira)' }}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-xs text-gray-600 mb-1 block font-medium">Valor</label>
                <Input
                  type="text"
                  placeholder="Ex: 220Ω, 100µF"
                  value={valueFilter}
                  onChange={(e) => setValueFilter(e.target.value)}
                  className="h-9 border text-sm"
                  style={{ borderColor: 'var(--safira)' }}
                />
              </div>

              <div>
                <label className="text-xs text-gray-600 mb-1 block font-medium">Tolerância</label>
                <Select value={toleranceFilter} onValueChange={setToleranceFilter}>
                  <SelectTrigger className="h-9 border text-sm" style={{ borderColor: 'var(--safira)' }}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    {tolerances.map((tol) => (
                      <SelectItem key={tol} value={tol}>{tol}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-xs text-gray-600 mb-1 block font-medium">Potência</label>
                <Select value={powerFilter} onValueChange={setPowerFilter}>
                  <SelectTrigger className="h-9 border text-sm" style={{ borderColor: 'var(--safira)' }}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    {powers.map((pwr) => (
                      <SelectItem key={pwr} value={pwr}>{pwr}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-xs text-gray-600 mb-1 block font-medium">Fabricante</label>
                <Select value={manufacturerFilter} onValueChange={setManufacturerFilter}>
                  <SelectTrigger className="h-9 border text-sm" style={{ borderColor: 'var(--safira)' }}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    {manufacturers.map((mfr) => (
                      <SelectItem key={mfr} value={mfr}>{mfr}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content - Dense Table */}
        <main className="flex-1">
          {/* Search Bar */}
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                      style={{ color: 'var(--safira)' }} />
              <Input
                type="text"
                placeholder="Buscar por descrição, P/N, valor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-10 border text-sm"
                style={{ borderColor: 'var(--safira)' }}
              />
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-3 text-xs text-gray-600">
            Exibindo {currentComponents.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}-
            {Math.min(currentPage * itemsPerPage, filteredComponents.length)} de {filteredComponents.length} componentes
          </div>

          {/* Dense Data Grid Table */}
          <div className="bg-white rounded border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b-2" style={{ 
                  backgroundColor: 'var(--safira)',
                }}>
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-white">
                      Descrição Técnica
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-white">
                      Valor
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-white">
                      Tolerância
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-white">
                      Encapsulamento
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-white">
                      Fabricante
                    </th>
                    <th className="px-3 py-2 text-center text-xs font-semibold text-white">
                      Estoque
                    </th>
                    <th className="px-3 py-2 text-center text-xs font-semibold text-white">
                      Ação
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentComponents.map((component, index) => {
                    const isLowStock = component.quantity <= 5;
                    const hasGoodStock = component.quantity > 10;
                    const stockColor = isLowStock ? 'var(--coral)' : hasGoodStock ? 'var(--jade)' : '#666';
                    
                    return (
                      <tr 
                        key={component.id} 
                        className="border-b hover:bg-gray-50 transition-colors"
                        style={{ backgroundColor: index % 2 === 0 ? '#FAFAFA' : 'white' }}
                      >
                        <td className="px-3 py-2">
                          <div className="font-medium text-gray-900 text-xs">{component.name}</div>
                          <div className="text-xs text-gray-500 mt-0.5">P/N: {component.partNumber}</div>
                        </td>
                        <td className="px-3 py-2 text-xs font-mono text-gray-700">
                          {component.value || '—'}
                        </td>
                        <td className="px-3 py-2 text-xs text-gray-700">
                          {component.tolerance || '—'}
                        </td>
                        <td className="px-3 py-2 text-xs text-gray-700">
                          {component.package || '—'}
                        </td>
                        <td className="px-3 py-2 text-xs text-gray-600">
                          {component.manufacturer}
                        </td>
                        <td className="px-3 py-2 text-center">
                          <div className="flex items-center justify-center gap-1">
                            {isLowStock && <AlertTriangle className="w-3 h-3" style={{ color: 'var(--coral)' }} />}
                            <span className="font-semibold text-xs" style={{ color: stockColor }}>
                              {component.quantity}
                            </span>
                          </div>
                        </td>
                        <td className="px-3 py-2">
                          <div className="flex items-center gap-1.5 justify-center">
                            <Input
                              type="number"
                              min="0"
                              max={component.quantity}
                              value={quantities[component.id] || 0}
                              onChange={(e) => handleQuantityChange(component.id, e.target.value)}
                              className="w-14 h-7 text-center border text-xs px-1"
                              style={{ borderColor: 'var(--safira)' }}
                            />
                            <Button
                              onClick={() => handleAdd(component)}
                              disabled={(quantities[component.id] || 0) === 0}
                              className="h-7 px-2 text-white border-0 text-xs"
                              style={{ backgroundColor: 'var(--jade)' }}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-4 flex items-center justify-center gap-2">
              <Button
                variant="outline"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="h-8 px-3 border text-xs"
                style={{ borderColor: 'var(--safira)' }}
              >
                Anterior
              </Button>
              
              <div className="flex gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? 'default' : 'outline'}
                      onClick={() => setCurrentPage(pageNum)}
                      className="w-8 h-8 border text-xs p-0"
                      style={
                        currentPage === pageNum
                          ? { backgroundColor: 'var(--safira)', color: 'white', borderColor: 'var(--safira)' }
                          : { borderColor: 'var(--safira)', color: 'var(--safira)' }
                      }
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>
              
              <Button
                variant="outline"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="h-8 px-3 border text-xs"
                style={{ borderColor: 'var(--safira)' }}
              >
                Próxima
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
