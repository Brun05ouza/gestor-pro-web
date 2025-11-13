import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getProducts, stockEntry, stockExit, getStockMovements } from '../services/api';

export default function Stock() {
  const [products, setProducts] = useState<any[]>([]);
  const [movements, setMovements] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [type, setType] = useState<'entry' | 'exit'>('entry');
  const [form, setForm] = useState({ productId: '', quantity: 0, reason: '' });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [prods, movs] = await Promise.all([getProducts(), getStockMovements()]);
    setProducts(prods);
    setMovements(movs);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const loadingToast = toast.loading(`Registrando ${type === 'entry' ? 'entrada' : 'saída'}...`);
    try {
      if (type === 'entry') {
        await stockEntry(form.productId, form.quantity, form.reason);
      } else {
        await stockExit(form.productId, form.quantity, form.reason);
      }
      toast.success(`${type === 'entry' ? 'Entrada' : 'Saída'} registrada com sucesso!`, { id: loadingToast });
      setShowModal(false);
      setForm({ productId: '', quantity: 0, reason: '' });
      loadData();
    } catch (error) {
      toast.error('Erro ao registrar movimentação', { id: loadingToast });
    }
  };

  return (
    <div>
      <h2>Controle de Estoque</h2>
      <div style={{ marginTop: 20 }}>
        <button className="btn btn-primary" onClick={() => { setType('entry'); setShowModal(true); }}>Entrada</button>
        <button className="btn btn-primary" style={{ marginLeft: 10 }} onClick={() => { setType('exit'); setShowModal(true); }}>Saída</button>
      </div>

      <h3 style={{ marginTop: 30 }}>Movimentações</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Produto</th>
            <th>Tipo</th>
            <th>Quantidade</th>
            <th>Motivo</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {movements.map(m => (
            <tr key={m.id}>
              <td>{m.product.name}</td>
              <td>{m.type === 'entry' ? 'Entrada' : 'Saída'}</td>
              <td>{m.quantity}</td>
              <td>{m.reason || '-'}</td>
              <td>{new Date(m.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{type === 'entry' ? 'Entrada' : 'Saída'} de Estoque</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Produto</label>
                <select value={form.productId} onChange={(e) => setForm({...form, productId: e.target.value})} required>
                  <option value="">Selecione</option>
                  {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Quantidade</label>
                <input type="number" value={form.quantity} onChange={(e) => setForm({...form, quantity: parseInt(e.target.value)})} required />
              </div>
              <div className="form-group">
                <label>Motivo</label>
                <input value={form.reason} onChange={(e) => setForm({...form, reason: e.target.value})} />
              </div>
              <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-danger" style={{ flex: 1 }}>Cancelar</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
