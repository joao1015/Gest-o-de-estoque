import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Card } from '@/app/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { categories } from '@/app/data/mockComponents';
import { ArrowLeft } from 'lucide-react';

interface AdminAddComponentPageProps {
  onBack: () => void;
  onSave: (component: any) => void;
}

export function AdminAddComponentPage({ onBack, onSave }: AdminAddComponentPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Resistores',
    manufacturer: '',
    partNumber: '',
    value: '',
    tolerance: '',
    power: '',
    package: '',
    voltage: '',
    quantity: '',
    minQuantity: '',
    cabinet: '',
    shelf: '',
    position: '',
    datasheetUrl: '',
    application: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const component = {
      id: `${formData.category[0]}${Date.now()}`,
      name: formData.name,
      description: formData.description,
      category: formData.category,
      manufacturer: formData.manufacturer,
      partNumber: formData.partNumber,
      value: formData.value || undefined,
      tolerance: formData.tolerance || undefined,
      power: formData.power || undefined,
      package: formData.package || undefined,
      voltage: formData.voltage || undefined,
      quantity: parseInt(formData.quantity) || 0,
      minQuantity: parseInt(formData.minQuantity) || 0,
      location: {
        cabinet: formData.cabinet,
        shelf: parseInt(formData.shelf) || 0,
        position: parseInt(formData.position) || 0,
      },
      datasheetUrl: formData.datasheetUrl || '#',
      application: formData.application,
    };
    
    onSave(component);
  };

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-8">
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
          Cadastrar Novo Componente
        </h1>
        <p className="text-gray-600 mt-2">
          Preencha os dados técnicos e de localização do componente
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Technical Information */}
          <Card className="p-6">
            <h3 className="mb-4 pb-2 border-b" style={{ color: 'var(--safira)' }}>
              Dados Técnicos
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Nome do Componente *</label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  required
                  placeholder="Ex: Resistor 220Ω 1/4W"
                  className="border-2"
                  style={{ borderColor: 'var(--safira)' }}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Descrição *</label>
                <Input
                  type="text"
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  required
                  placeholder="Descrição técnica detalhada"
                  className="border-2"
                  style={{ borderColor: 'var(--safira)' }}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Categoria *</label>
                <Select value={formData.category} onValueChange={(val) => handleChange('category', val)}>
                  <SelectTrigger className="border-2" style={{ borderColor: 'var(--safira)' }}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Fabricante *</label>
                  <Input
                    type="text"
                    value={formData.manufacturer}
                    onChange={(e) => handleChange('manufacturer', e.target.value)}
                    required
                    placeholder="Ex: Vishay"
                    className="border-2"
                    style={{ borderColor: 'var(--safira)' }}
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">P/N (Part Number) *</label>
                  <Input
                    type="text"
                    value={formData.partNumber}
                    onChange={(e) => handleChange('partNumber', e.target.value)}
                    required
                    placeholder="Ex: CFR-25JB-52-220R"
                    className="border-2"
                    style={{ borderColor: 'var(--safira)' }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Valor</label>
                  <Input
                    type="text"
                    value={formData.value}
                    onChange={(e) => handleChange('value', e.target.value)}
                    placeholder="Ex: 220Ω"
                    className="border-2"
                    style={{ borderColor: 'var(--safira)' }}
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Tolerância</label>
                  <Input
                    type="text"
                    value={formData.tolerance}
                    onChange={(e) => handleChange('tolerance', e.target.value)}
                    placeholder="Ex: 5%"
                    className="border-2"
                    style={{ borderColor: 'var(--safira)' }}
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Potência</label>
                  <Input
                    type="text"
                    value={formData.power}
                    onChange={(e) => handleChange('power', e.target.value)}
                    placeholder="Ex: 1/4W"
                    className="border-2"
                    style={{ borderColor: 'var(--safira)' }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Encapsulamento</label>
                  <Input
                    type="text"
                    value={formData.package}
                    onChange={(e) => handleChange('package', e.target.value)}
                    placeholder="Ex: SMD 0805"
                    className="border-2"
                    style={{ borderColor: 'var(--safira)' }}
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Tensão</label>
                  <Input
                    type="text"
                    value={formData.voltage}
                    onChange={(e) => handleChange('voltage', e.target.value)}
                    placeholder="Ex: 50V"
                    className="border-2"
                    style={{ borderColor: 'var(--safira)' }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Aplicação</label>
                <Input
                  type="text"
                  value={formData.application}
                  onChange={(e) => handleChange('application', e.target.value)}
                  placeholder="Ex: Circuitos de LED, limitação de corrente"
                  className="border-2"
                  style={{ borderColor: 'var(--safira)' }}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Datasheet (URL)</label>
                <Input
                  type="url"
                  value={formData.datasheetUrl}
                  onChange={(e) => handleChange('datasheetUrl', e.target.value)}
                  placeholder="https://..."
                  className="border-2"
                  style={{ borderColor: 'var(--safira)' }}
                />
              </div>
            </div>
          </Card>

          {/* Location & Stock */}
          <Card className="p-6">
            <h3 className="mb-4 pb-2 border-b" style={{ color: 'var(--safira)' }}>
              Estoque e Localização
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Quantidade em Estoque *</label>
                  <Input
                    type="number"
                    min="0"
                    value={formData.quantity}
                    onChange={(e) => handleChange('quantity', e.target.value)}
                    required
                    placeholder="0"
                    className="border-2"
                    style={{ borderColor: 'var(--safira)' }}
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Estoque Mínimo *</label>
                  <Input
                    type="number"
                    min="0"
                    value={formData.minQuantity}
                    onChange={(e) => handleChange('minQuantity', e.target.value)}
                    required
                    placeholder="0"
                    className="border-2"
                    style={{ borderColor: 'var(--safira)' }}
                  />
                </div>
              </div>

              <div className="p-4 rounded" style={{ backgroundColor: 'var(--safira-light)' }}>
                <h4 className="text-sm font-semibold mb-3" style={{ color: 'var(--safira)' }}>
                  Localização Física
                </h4>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-700 mb-1">Armário *</label>
                    <Input
                      type="text"
                      value={formData.cabinet}
                      onChange={(e) => handleChange('cabinet', e.target.value)}
                      required
                      placeholder="Ex: A, B, C..."
                      className="border-2 bg-white"
                      style={{ borderColor: 'var(--safira)' }}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-700 mb-1">Prateleira *</label>
                      <Input
                        type="number"
                        min="1"
                        value={formData.shelf}
                        onChange={(e) => handleChange('shelf', e.target.value)}
                        required
                        placeholder="1"
                        className="border-2 bg-white"
                        style={{ borderColor: 'var(--safira)' }}
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-gray-700 mb-1">Posição *</label>
                      <Input
                        type="number"
                        min="1"
                        value={formData.position}
                        onChange={(e) => handleChange('position', e.target.value)}
                        required
                        placeholder="1"
                        className="border-2 bg-white"
                        style={{ borderColor: 'var(--safira)' }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full h-12 text-white border-0"
                  style={{ backgroundColor: 'var(--jade)' }}
                >
                  Salvar no Inventário
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </form>
    </div>
  );
}
