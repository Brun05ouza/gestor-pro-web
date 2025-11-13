import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const loadingToast = toast.loading('Autenticando...');
    try {
      await login(email, password);
      toast.success('Login realizado com sucesso!', { id: loadingToast });
      navigate('/dashboard');
    } catch (error) {
      toast.error('Erro ao fazer login. Verifique suas credenciais.', { id: loadingToast });
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#1a202c' }}>
      <div className="card" style={{ width: 440, animation: 'fadeIn 0.6s ease', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <img src="/icons/Gestão Pro Login.png" alt="Gestão Pro" style={{ width: 200, marginBottom: 20 }} />
          <h2 style={{ fontSize: 28, fontWeight: 600, color: '#1a202c', marginBottom: 8 }}>Bem-vindo de volta!</h2>
          <p style={{ color: '#718096', fontSize: 14 }}>Entre com suas credenciais para continuar</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label style={{ color: '#4a5568', fontWeight: 500 }}>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seu@email.com" required />
          </div>
          <div className="form-group">
            <label style={{ color: '#4a5568', fontWeight: 500 }}>Senha</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, color: '#4a5568', cursor: 'pointer' }}>
              <input type="checkbox" style={{ width: 'auto' }} />
              Lembrar-me
            </label>
            <a href="#" style={{ fontSize: 14, color: '#2d3748', textDecoration: 'none', fontWeight: 500 }} onClick={(e) => { e.preventDefault(); alert('Funcionalidade em desenvolvimento'); }}>Esqueci minha senha</a>
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px', fontSize: 16 }}>Entrar</button>
        </form>
        <div style={{ marginTop: 24, textAlign: 'center', paddingTop: 24, borderTop: '1px solid #e2e8f0' }}>
          <p style={{ color: '#718096', fontSize: 14 }}>Não tem uma conta? <a href="/register" style={{ color: '#2d3748', fontWeight: 600, textDecoration: 'none' }}>Cadastre-se</a></p>
        </div>
      </div>
    </div>
  );
}
