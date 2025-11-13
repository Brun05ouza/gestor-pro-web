import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getCategories, createCategory, deleteCategory } from '../services/api';
import ConfirmDialog from '../components/ConfirmDialog';

export default function Categories() {
  const [categories, setCategories] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [name, setName] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    const loadingToast = toast.loading('Excluindo categoria...');
    try {
      await deleteCategory(deleteId);
      toast.success('Categoria excluída com sucesso!', { id: loadingToast });
      setShowConfirm(false);
      setDeleteId(null);
      loadData();
    } catch (error) {
      toast.error('Erro ao excluir categoria', { id: loadingToast });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const loadingToast = toast.loading('Criando categoria...');
    try {
      await createCategory(name);
      toast.success('Categoria criada com sucesso!', { id: loadingToast });
      setShowModal(false);
      setName('');
      loadData();
    } catch (error) {
      toast.error('Erro ao criar categoria', { id: loadingToast });
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ fontSize: 28, fontWeight: 600, color: '#1a202c' }}>Categorias</h2>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>Nova Categoria</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 16 }}>
        {categories.map(c => (
          <div key={c.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: 18, fontWeight: 600, color: '#2d3748' }}>{c.name}</h3>
            <button className="btn btn-danger" onClick={() => { setDeleteId(c.id); setShowConfirm(true); }} style={{ padding: '6px 12px', fontSize: 12 }}>Excluir</button>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Nova Categoria</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nome</label>
                <input value={name} onChange={(e) => setName(e.target.value)} required autoFocus />
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
          title="Excluir Categoria"
          message="Tem certeza que deseja excluir esta categoria? Esta ação não pode ser desfeita."
          onConfirm={handleDelete}
          onCancel={() => { setShowConfirm(false); setDeleteId(null); }}
        />
      )}
    </div>
  );
}
