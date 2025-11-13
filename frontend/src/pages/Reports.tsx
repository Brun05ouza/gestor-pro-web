import { useEffect, useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getSalesReport, getStockReport } from '../services/api';

const COLORS = ['#2d3748', '#4a5568', '#718096', '#a0aec0', '#cbd5e0'];

export default function Reports() {
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
    return <div style={{ textAlign: 'center', padding: 40, color: '#718096' }}>Carregando relatórios...</div>;
  }

  const salesChartData = salesData?.sales?.slice(0, 10).map((sale: any) => ({
    data: new Date(sale.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }),
    valor: sale.total
  })) || [];

  const categoryData = stockData?.products?.reduce((acc: any, p: any) => {
    const existing = acc.find((item: any) => item.name === p.category.name);
    if (existing) {
      existing.quantidade += 1;
    } else {
      acc.push({ name: p.category.name, quantidade: 1 });
    }
    return acc;
  }, []) || [];

  const topProducts = stockData?.products?.sort((a: any, b: any) => b.stock - a.stock).slice(0, 5).map((p: any) => ({
    nome: p.name.substring(0, 20),
    estoque: p.stock
  })) || [];

  const avgTicket = salesData?.count > 0 ? salesData.total / salesData.count : 0;

  return (
    <div>
      <h2 style={{ fontSize: 28, fontWeight: 600, marginBottom: 30, color: '#1a202c' }}>Relatórios Detalhados</h2>

      <div className="card" style={{ marginBottom: 24 }}>
        <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 20, color: '#1a202c' }}>Relatório de Vendas</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 20 }}>
          <div style={{ padding: 16, background: '#f7fafc', borderRadius: 8, borderLeft: '4px solid #2d3748' }}>
            <p style={{ fontSize: 12, color: '#718096', marginBottom: 4 }}>Faturamento Total</p>
            <p style={{ fontSize: 24, fontWeight: 600, color: '#2d3748' }}>R$ {salesData?.total.toFixed(2) || '0.00'}</p>
          </div>
          <div style={{ padding: 16, background: '#f7fafc', borderRadius: 8, borderLeft: '4px solid #4a5568' }}>
            <p style={{ fontSize: 12, color: '#718096', marginBottom: 4 }}>Total de Vendas</p>
            <p style={{ fontSize: 24, fontWeight: 600, color: '#2d3748' }}>{salesData?.count || 0}</p>
          </div>
          <div style={{ padding: 16, background: '#f7fafc', borderRadius: 8, borderLeft: '4px solid #718096' }}>
            <p style={{ fontSize: 12, color: '#718096', marginBottom: 4 }}>Ticket Médio</p>
            <p style={{ fontSize: 24, fontWeight: 600, color: '#2d3748' }}>R$ {avgTicket.toFixed(2)}</p>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Data</th>
              <th>Cliente</th>
              <th>Itens</th>
              <th>Valor Total</th>
            </tr>
          </thead>
          <tbody>
            {salesData?.sales?.map((sale: any) => (
              <tr key={sale.id}>
                <td>{new Date(sale.createdAt).toLocaleDateString('pt-BR')}</td>
                <td>{sale.customer?.name || 'Sem cliente'}</td>
                <td>{sale.items?.length || 0}</td>
                <td style={{ fontWeight: 600, color: '#2d3748' }}>R$ {sale.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card" style={{ marginBottom: 24 }}>
        <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 20, color: '#1a202c' }}>Relatório de Estoque</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24, marginBottom: 20 }}>
          <div>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={categoryData} dataKey="quantidade" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {categoryData.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
            <p style={{ textAlign: 'center', fontSize: 14, color: '#718096', marginTop: 8 }}>Distribuição por Categoria</p>
          </div>
          <div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={topProducts}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="nome" stroke="#718096" style={{ fontSize: 10 }} />
                <YAxis stroke="#718096" style={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="estoque" fill="#4a5568" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <p style={{ textAlign: 'center', fontSize: 14, color: '#718096', marginTop: 8 }}>Top 5 Produtos</p>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Categoria</th>
              <th>Preço</th>
              <th>Estoque</th>
              <th>Valor em Estoque</th>
            </tr>
          </thead>
          <tbody>
            {stockData?.products?.map((p: any) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.category?.name}</td>
                <td>R$ {p.price.toFixed(2)}</td>
                <td style={{ fontWeight: 600, color: p.stock < 10 ? '#e53e3e' : '#2d3748' }}>{p.stock}</td>
                <td style={{ fontWeight: 600 }}>R$ {(p.price * p.stock).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card" style={{ background: '#fff5f5', border: '2px solid #feb2b2' }}>
        <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16, color: '#e53e3e' }}>Resumo Financeiro</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
          <div>
            <p style={{ fontSize: 14, color: '#718096', marginBottom: 8 }}>Valor Total em Estoque</p>
            <p style={{ fontSize: 28, fontWeight: 600, color: '#2d3748' }}>R$ {stockData?.products?.reduce((sum: number, p: any) => sum + (p.price * p.stock), 0).toFixed(2) || '0.00'}</p>
          </div>
          <div>
            <p style={{ fontSize: 14, color: '#718096', marginBottom: 8 }}>Produtos com Estoque Baixo</p>
            <p style={{ fontSize: 28, fontWeight: 600, color: '#e53e3e' }}>{stockData?.lowStock?.length || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
