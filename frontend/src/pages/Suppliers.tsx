import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getSuppliers, createSupplier, deleteSupplier } from '../services/api';
import ConfirmDialog from '../components/ConfirmDialog';

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await getSuppliers();
    setSuppliers(data);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    const loadingToast = toast.loading('Excluindo fornecedor...');
    try {
      await deleteSupplier(deleteId);
      toast.success('Fornecedor excluído com sucesso!', { id: loadingToast });
      setShowConfirm(false);
      setDeleteId(null);
      loadData();
    } catch (error) {
      toast.error('Erro ao excluir fornecedor', { id: loadingToast });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const loadingToast = toast.loading('Criando fornecedor...');
    try {
      await createSupplier(form);
      toast.success('Fornecedor criado com sucesso!', { id: loadingToast });
      setShowModal(false);
      setForm({ name: '', email: '', phone: '', address: '' });
      loadData();
    } catch (error) {
      toast.error('Erro ao criar fornecedor', { id: loadingToast });
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>Fornecedores</h2>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>Novo Fornecedor</button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Endereço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map(s => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.email || '-'}</td>
              <td>{s.phone || '-'}</td>
              <td>{s.address || '-'}</td>
              <td>
                <button className="btn btn-danger" onClick={() => { setDeleteId(s.id); setShowConfirm(true); }} style={{ padding: '6px 12px', fontSize: 12 }}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Novo Fornecedor</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nome</label>
                <input value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Telefone</label>
                <input value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Endereço</label>
                <input value={form.address} onChange={(e) => setForm({...form, address: e.target.value})} />
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
          title="Excluir Fornecedor"
          message="Tem certeza que deseja excluir este fornecedor? Esta ação não pode ser desfeita."
          onConfirm={handleDelete}
          onCancel={() => { setShowConfirm(false); setDeleteId(null); }}
        />
      )}
    </div>
  );
}
