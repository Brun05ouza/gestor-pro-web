import { useEffect, useState } from 'react';
import { getSalesReport, getStockReport } from '../services/api';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#2d3748', '#4a5568', '#718096', '#a0aec0'];

export default function Dashboard() {
  const [salesData, setSalesData] = useState<any>(null);
  const [stockData, setStockData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getSalesReport(), getStockReport()]).then(([sales, stock]) => {
      setSalesData(sales);
      setStockData(stock);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <div style={{ fontSize: 18, color: '#718096' }}>Carregando...</div>
      </div>
    );
  }

  const chartData = salesData?.sales?.slice(0, 7).map((sale: any) => ({
    data: new Date(sale.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }),
    valor: sale.total
  })) || [];

  const stockChartData = stockData?.products?.slice(0, 5).map((p: any) => ({
    nome: p.name.substring(0, 15),
    estoque: p.stock
  })) || [];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
        <h2 style={{ fontSize: 28, fontWeight: 600, color: '#1a202c' }}>Dashboard</h2>
        <div style={{ fontSize: 14, color: '#718096' }}>{new Date().toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
        <div className="card" style={{ background: '#2d3748', color: 'white', border: 'none' }}>
          <h3 style={{ fontSize: 13, opacity: 0.8, marginBottom: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total de Vendas</h3>
          <p style={{ fontSize: 32, fontWeight: 600, margin: 0 }}>R$ {salesData?.total.toFixed(2) || '0.00'}</p>
          <p style={{ fontSize: 12, opacity: 0.7, marginTop: 8 }}>Últimos 30 dias</p>
        </div>
        <div className="card" style={{ background: '#4a5568', color: 'white', border: 'none' }}>
          <h3 style={{ fontSize: 13, opacity: 0.8, marginBottom: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Número de Vendas</h3>
          <p style={{ fontSize: 32, fontWeight: 600, margin: 0 }}>{salesData?.count || 0}</p>
          <p style={{ fontSize: 12, opacity: 0.7, marginTop: 8 }}>Transações realizadas</p>
        </div>
        <div className="card" style={{ background: '#718096', color: 'white', border: 'none' }}>
          <h3 style={{ fontSize: 13, opacity: 0.8, marginBottom: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Produtos em Estoque</h3>
          <p style={{ fontSize: 32, fontWeight: 600, margin: 0 }}>{stockData?.products.length || 0}</p>
          <p style={{ fontSize: 12, opacity: 0.7, marginTop: 8 }}>Itens cadastrados</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: 24, marginTop: 24 }}>
        <div className="card">
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20, color: '#1a202c' }}>Vendas Recentes</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="data" stroke="#718096" style={{ fontSize: 12 }} />
              <YAxis stroke="#718096" style={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8 }} />
              <Line type="monotone" dataKey="valor" stroke="#2d3748" strokeWidth={2} dot={{ fill: '#2d3748', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20, color: '#1a202c' }}>Top 5 Produtos em Estoque</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={stockChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="nome" stroke="#718096" style={{ fontSize: 11 }} />
              <YAxis stroke="#718096" style={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8 }} />
              <Bar dataKey="estoque" fill="#4a5568" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {stockData?.lowStock.length > 0 && (
        <div className="card" style={{ marginTop: 24, borderLeft: '3px solid #e53e3e' }}>
          <h3 style={{ color: '#1a202c', marginBottom: 16, fontSize: 16, fontWeight: 600 }}>Alertas de Estoque Baixo</h3>
          <div style={{ display: 'grid', gap: 8 }}>
            {stockData.lowStock.map((p: any) => (
              <div key={p.id} style={{ padding: '12px 16px', background: '#fff5f5', borderRadius: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #feb2b2' }}>
                <span style={{ fontWeight: 500, color: '#2d3748' }}>{p.name}</span>
                <span style={{ color: '#e53e3e', fontWeight: 600, fontSize: 14 }}>Estoque: {p.stock}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
