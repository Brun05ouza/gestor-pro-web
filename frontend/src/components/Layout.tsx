import { Outlet, Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import SearchBar from './SearchBar';

export default function Layout() {
  const { user, logout } = useAuth();
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8f9fa' }}>
      <aside 
        onMouseEnter={() => setSidebarExpanded(true)}
        onMouseLeave={() => setSidebarExpanded(false)}
        style={{ 
          width: sidebarExpanded ? 260 : 70, 
          background: '#1a202c', 
          color: 'white', 
          padding: sidebarExpanded ? '30px 20px' : '30px 10px', 
          boxShadow: '2px 0 10px rgba(0,0,0,0.1)', 
          transition: 'all 0.3s ease',
          overflow: 'hidden',
          position: 'relative'
        }}>
        <div style={{ marginBottom: 40, textAlign: 'center', transition: 'all 0.3s ease', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img 
            src="/icons/Gestão Pro.png" 
            alt="Gestão Pro" 
            style={{ 
              width: sidebarExpanded ? '180px' : '35px',
              height: 'auto',
              transition: 'all 0.3s ease',
              objectFit: 'contain'
            }} 
          />
        </div>
        <nav>
          <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', justifyContent: sidebarExpanded ? 'flex-start' : 'center', gap: 12, color: 'rgba(255,255,255,0.8)', padding: sidebarExpanded ? '12px 16px' : '12px 0', textDecoration: 'none', borderRadius: 6, marginBottom: 4, transition: 'all 0.2s ease', fontSize: 14, fontWeight: 500 }} onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'white'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.8)'; }}>
            <img src="/icons/dashboard.png" alt="Dashboard" style={{ width: 22, height: 22, filter: 'brightness(0) invert(1)' }} />
            {sidebarExpanded && <span>Dashboard</span>}
          </Link>
          <Link to="/products" style={{ display: 'flex', alignItems: 'center', justifyContent: sidebarExpanded ? 'flex-start' : 'center', gap: 12, color: 'rgba(255,255,255,0.8)', padding: sidebarExpanded ? '12px 16px' : '12px 0', textDecoration: 'none', borderRadius: 6, marginBottom: 4, transition: 'all 0.2s ease', fontSize: 14, fontWeight: 500 }} onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'white'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.8)'; }}>
            <img src="/icons/produtos.png" alt="Produtos" style={{ width: 22, height: 22, filter: 'brightness(0) invert(1)' }} />
            {sidebarExpanded && <span>Produtos</span>}
          </Link>
          <Link to="/categories" style={{ display: 'flex', alignItems: 'center', justifyContent: sidebarExpanded ? 'flex-start' : 'center', gap: 12, color: 'rgba(255,255,255,0.8)', padding: sidebarExpanded ? '12px 16px' : '12px 0', textDecoration: 'none', borderRadius: 6, marginBottom: 4, transition: 'all 0.2s ease', fontSize: 14, fontWeight: 500 }} onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'white'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.8)'; }}>
            <img src="/icons/categorias.png" alt="Categorias" style={{ width: 22, height: 22, filter: 'brightness(0) invert(1)' }} />
            {sidebarExpanded && <span>Categorias</span>}
          </Link>
          <Link to="/stock" style={{ display: 'flex', alignItems: 'center', justifyContent: sidebarExpanded ? 'flex-start' : 'center', gap: 12, color: 'rgba(255,255,255,0.8)', padding: sidebarExpanded ? '12px 16px' : '12px 0', textDecoration: 'none', borderRadius: 6, marginBottom: 4, transition: 'all 0.2s ease', fontSize: 14, fontWeight: 500 }} onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'white'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.8)'; }}>
            <img src="/icons/estoque.png" alt="Estoque" style={{ width: 22, height: 22, filter: 'brightness(0) invert(1)' }} />
            {sidebarExpanded && <span>Estoque</span>}
          </Link>
          <Link to="/sales" style={{ display: 'flex', alignItems: 'center', justifyContent: sidebarExpanded ? 'flex-start' : 'center', gap: 12, color: 'rgba(255,255,255,0.8)', padding: sidebarExpanded ? '12px 16px' : '12px 0', textDecoration: 'none', borderRadius: 6, marginBottom: 4, transition: 'all 0.2s ease', fontSize: 14, fontWeight: 500 }} onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'white'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.8)'; }}>
            <img src="/icons/vendas.png" alt="Vendas" style={{ width: 22, height: 22, filter: 'brightness(0) invert(1)' }} />
            {sidebarExpanded && <span>Vendas</span>}
          </Link>
          <Link to="/customers" style={{ display: 'flex', alignItems: 'center', justifyContent: sidebarExpanded ? 'flex-start' : 'center', gap: 12, color: 'rgba(255,255,255,0.8)', padding: sidebarExpanded ? '12px 16px' : '12px 0', textDecoration: 'none', borderRadius: 6, marginBottom: 4, transition: 'all 0.2s ease', fontSize: 14, fontWeight: 500 }} onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'white'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.8)'; }}>
            <img src="/icons/cliente.png" alt="Clientes" style={{ width: 22, height: 22, filter: 'brightness(0) invert(1)' }} />
            {sidebarExpanded && <span>Clientes</span>}
          </Link>
          <Link to="/suppliers" style={{ display: 'flex', alignItems: 'center', justifyContent: sidebarExpanded ? 'flex-start' : 'center', gap: 12, color: 'rgba(255,255,255,0.8)', padding: sidebarExpanded ? '12px 16px' : '12px 0', textDecoration: 'none', borderRadius: 6, marginBottom: 4, transition: 'all 0.2s ease', fontSize: 14, fontWeight: 500 }} onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'white'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.8)'; }}>
            <img src="/icons/fornecedores.png" alt="Fornecedores" style={{ width: 22, height: 22, filter: 'brightness(0) invert(1)' }} />
            {sidebarExpanded && <span>Fornecedores</span>}
          </Link>
          <Link to="/reports" style={{ display: 'flex', alignItems: 'center', justifyContent: sidebarExpanded ? 'flex-start' : 'center', gap: 12, color: 'rgba(255,255,255,0.8)', padding: sidebarExpanded ? '12px 16px' : '12px 0', textDecoration: 'none', borderRadius: 6, marginBottom: 4, transition: 'all 0.2s ease', fontSize: 14, fontWeight: 500 }} onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'white'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.8)'; }}>
            <img src="/icons/relatorios.png" alt="Relatórios" style={{ width: 22, height: 22, filter: 'brightness(0) invert(1)' }} />
            {sidebarExpanded && <span>Relatórios</span>}
          </Link>
        </nav>
      </aside>
      <div style={{ flex: 1 }}>
        <header style={{ background: 'white', padding: '20px 40px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20 }}>
          <h1 style={{ fontSize: 20, color: '#1a202c', fontWeight: 600 }}>Olá, {user?.name}</h1>
          <SearchBar />
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 16px', background: '#f7fafc', borderRadius: 10, border: '1px solid #e2e8f0' }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#2d3748', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600, fontSize: 14 }}>
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div style={{ textAlign: 'left' }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#1a202c', margin: 0, lineHeight: 1.2 }}>{user?.name}</p>
                <p style={{ fontSize: 11, color: '#718096', margin: 0, lineHeight: 1.2 }}>{user?.role === 'admin' ? 'Administrador' : 'Usuário'}</p>
              </div>
            </div>
            <button onClick={logout} className="btn btn-danger" style={{ padding: '10px 20px', fontSize: 13 }}>Sair</button>
          </div>
        </header>
        <main className="container" style={{ animation: 'fadeIn 0.5s ease' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
