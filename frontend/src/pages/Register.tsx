import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'admin' });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const loadingToast = toast.loading('Criando conta...');
    try {
      await axios.post('http://localhost:3000/api/auth/register', form);
      toast.success('Conta criada com sucesso!', { id: loadingToast });
      navigate('/login');
    } catch (error) {
      toast.error('Erro ao criar conta', { id: loadingToast });
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#1a202c' }}>
      <div className="card" style={{ width: 440, animation: 'fadeIn 0.6s ease', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <img src="/icons/Gestão Pro Login.png" alt="Gestão Pro" style={{ width: 200, marginBottom: 20 }} />
          <h2 style={{ fontSize: 28, fontWeight: 600, color: '#1a202c', marginBottom: 8 }}>Criar Nova Conta</h2>
          <p style={{ color: '#718096', fontSize: 14 }}>Preencha os dados para se cadastrar</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label style={{ color: '#4a5568', fontWeight: 500 }}>Nome Completo</label>
            <input value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} placeholder="Seu nome" required />
          </div>
          <div className="form-group">
            <label style={{ color: '#4a5568', fontWeight: 500 }}>Email</label>
            <input type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} placeholder="seu@email.com" required />
          </div>
          <div className="form-group">
            <label style={{ color: '#4a5568', fontWeight: 500 }}>Senha</label>
            <input type="password" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} placeholder="••••••••" required />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px', fontSize: 16, marginTop: 8 }}>Criar Conta</button>
        </form>
        <div style={{ marginTop: 24, textAlign: 'center', paddingTop: 24, borderTop: '1px solid #e2e8f0' }}>
          <p style={{ color: '#718096', fontSize: 14 }}>Já tem uma conta? <a href="/login" style={{ color: '#2d3748', fontWeight: 600, textDecoration: 'none' }}>Faça login</a></p>
        </div>
      </div>
    </div>
  );
}
