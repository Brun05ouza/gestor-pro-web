import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getProducts, createProduct, deleteProduct, getCategories, getSuppliers } from '../services/api';
import ConfirmDialog from '../components/ConfirmDialog';

export default function Products() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', price: 0, stock: 0, categoryId: '', supplierId: '' });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [prods, cats, sups] = await Promise.all([getProducts(), getCategories(), getSuppliers()]);
    setProducts(prods);
    setCategories(cats);
    setSuppliers(sups);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const loadingToast = toast.loading('Criando produto...');
    try {
      await createProduct(form);
      toast.success('Produto criado com sucesso!', { id: loadingToast });
      setShowModal(false);
      setForm({ name: '', price: 0, stock: 0, categoryId: '', supplierId: '' });
      loadData();
    } catch (error) {
      toast.error('Erro ao criar produto', { id: loadingToast });
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    const loadingToast = toast.loading('Deletando produto...');
    try {
      await deleteProduct(deleteId);
      toast.success('Produto deletado com sucesso!', { id: loadingToast });
      setShowConfirm(false);
      setDeleteId(null);
      loadData();
    } catch (error) {
      toast.error('Erro ao deletar produto', { id: loadingToast });
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Produtos</h2>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>Novo Produto</button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Categoria</th>
            <th>Preço</th>
            <th>Estoque</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.category?.name}</td>
              <td>R$ {p.price.toFixed(2)}</td>
              <td>{p.stock}</td>
              <td>
                <button className="btn btn-danger" onClick={() => { setDeleteId(p.id); setShowConfirm(true); }}>Deletar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Novo Produto</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nome</label>
                <input value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Categoria</label>
                <select value={form.categoryId} onChange={(e) => setForm({...form, categoryId: e.target.value})} required>
                  <option value="">Selecione</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Fornecedor</label>
                <select value={form.supplierId} onChange={(e) => setForm({...form, supplierId: e.target.value})}>
                  <option value="">Selecione</option>
                  {suppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Preço</label>
                <input type="number" step="0.01" value={form.price} onChange={(e) => setForm({...form, price: parseFloat(e.target.value)})} required />
              </div>
              <div className="form-group">
                <label>Estoque Inicial</label>
                <input type="number" value={form.stock} onChange={(e) => setForm({...form, stock: parseInt(e.target.value)})} required />
              </div>
              <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-danger" style={{ flex: 1 }}>Cancelar</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showConfirm && (
        <ConfirmDialog
          title="Excluir Produto"
          message="Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita."
          onConfirm={handleDelete}
          onCancel={() => { setShowConfirm(false); setDeleteId(null); }}
        />
      )}
    </div>
  );
}
