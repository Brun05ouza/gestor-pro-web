import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getProducts, getCustomers, createSale, getSales } from '../services/api';

export default function Sales() {
  const [sales, setSales] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [customerId, setCustomerId] = useState('');
  const [items, setItems] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [s, p, c] = await Promise.all([getSales(), getProducts(), getCustomers()]);
    setSales(s);
    setProducts(p);
    setCustomers(c);
  };

  const addItem = () => {
    const product = products.find(p => p.id === selectedProduct);
    if (product) {
      setItems([...items, { productId: product.id, name: product.name, quantity, price: product.price }]);
      setSelectedProduct('');
      setQuantity(1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      toast.error('Adicione pelo menos um item à venda');
      return;
    }
    const loadingToast = toast.loading('Processando venda...');
    try {
      await createSale({ customerId: customerId || null, items });
      toast.success('Venda realizada com sucesso!', { id: loadingToast });
      setShowModal(false);
      setCustomerId('');
      setItems([]);
      loadData();
    } catch (error) {
      toast.error('Erro ao processar venda', { id: loadingToast });
    }
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>Vendas</h2>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>Nova Venda</button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Total</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {sales.map(s => (
            <tr key={s.id}>
              <td>{s.customer?.name || 'Sem cliente'}</td>
              <td>R$ {s.total.toFixed(2)}</td>
              <td>{new Date(s.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Nova Venda</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Cliente (opcional)</label>
                <select value={customerId} onChange={(e) => setCustomerId(e.target.value)}>
                  <option value="">Sem cliente</option>
                  {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Produto</label>
                <select value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)}>
                  <option value="">Selecione</option>
                  {products.map(p => <option key={p.id} value={p.id}>{p.name} - R$ {p.price}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Quantidade</label>
                <input type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} min="1" />
              </div>
              <button type="button" className="btn btn-primary" onClick={addItem} style={{ width: '100%' }}>Adicionar Item</button>

              {items.length > 0 && (
                <div style={{ marginTop: 20 }}>
                  <h4>Itens</h4>
                  <ul>
                    {items.map((item, i) => (
                      <li key={i}>{item.name} - {item.quantity}x R$ {item.price} = R$ {(item.quantity * item.price).toFixed(2)}</li>
                    ))}
                  </ul>
                  <p><strong>Total: R$ {total.toFixed(2)}</strong></p>
                  <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
                    <button type="button" onClick={() => { setShowModal(false); setItems([]); setCustomerId(''); }} className="btn btn-danger" style={{ flex: 1 }}>Cancelar</button>
                    <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Finalizar Venda</button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
