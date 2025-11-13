import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts, getCustomers, getSuppliers } from '../services/api';

export default function SearchBar() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (search.length < 2) {
      setResults([]);
      return;
    }

    const searchData = async () => {
      try {
        const [products, customers, suppliers] = await Promise.all([
          getProducts(),
          getCustomers(),
          getSuppliers()
        ]);

        const filtered = [
          ...products.filter((p: any) => p.name.toLowerCase().includes(search.toLowerCase())).map((p: any) => ({ ...p, type: 'Produto', route: '/products' })),
          ...customers.filter((c: any) => c.name.toLowerCase().includes(search.toLowerCase())).map((c: any) => ({ ...c, type: 'Cliente', route: '/customers' })),
          ...suppliers.filter((s: any) => s.name.toLowerCase().includes(search.toLowerCase())).map((s: any) => ({ ...s, type: 'Fornecedor', route: '/suppliers' }))
        ].slice(0, 5);

        setResults(filtered);
      } catch (error) {
        console.error('Erro ao pesquisar:', error);
      }
    };

    const timer = setTimeout(searchData, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const handleSelect = (result: any) => {
    navigate(result.route);
    setSearch('');
    setShowResults(false);
  };

  return (
    <div style={{ position: 'relative', width: 400 }} onBlur={() => setTimeout(() => setShowResults(false), 200)}>
      <svg style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#718096' }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8"/>
        <path d="m21 21-4.35-4.35"/>
      </svg>
      <input
        type="text"
        placeholder="Pesquisar no sistema..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: '100%',
          padding: '11px 16px 11px 44px',
          border: '2px solid #e2e8f0',
          borderRadius: 10,
          fontSize: 14,
          transition: 'all 0.2s',
          background: '#f7fafc',
          outline: 'none'
        }}
        onFocus={(e) => {
          e.target.style.background = 'white';
          e.target.style.borderColor = '#2d3748';
          e.target.style.boxShadow = '0 0 0 3px rgba(45, 55, 72, 0.1)';
          setShowResults(true);
        }}
        onBlur={(e) => {
          e.target.style.background = '#f7fafc';
          e.target.style.borderColor = '#e2e8f0';
          e.target.style.boxShadow = 'none';
        }}
      />
      {showResults && results.length > 0 && (
        <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 8, background: 'white', border: '1px solid #e2e8f0', borderRadius: 10, boxShadow: '0 10px 40px rgba(0,0,0,0.1)', maxHeight: 300, overflowY: 'auto', zIndex: 1000 }}>
          {results.map((result, index) => (
            <div
              key={index}
              onClick={() => handleSelect(result)}
              style={{ padding: '12px 16px', cursor: 'pointer', borderBottom: index < results.length - 1 ? '1px solid #f0f0f0' : 'none', transition: 'background 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#f7fafc'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: '#1a202c', margin: 0 }}>{result.name}</p>
                  <p style={{ fontSize: 12, color: '#718096', margin: 0 }}>{result.type}</p>
                </div>
                <span style={{ fontSize: 12, color: '#2d3748' }}>→</span>
              </div>
            </div>
          ))}
        </div>
      )}
      {showResults && search.length >= 2 && results.length === 0 && (
        <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 8, background: 'white', border: '1px solid #e2e8f0', borderRadius: 10, boxShadow: '0 10px 40px rgba(0,0,0,0.1)', padding: '16px', textAlign: 'center', zIndex: 1000 }}>
          <p style={{ fontSize: 14, color: '#718096', margin: 0 }}>Nenhum resultado encontrado</p>
        </div>
      )}
    </div>
  );
}
