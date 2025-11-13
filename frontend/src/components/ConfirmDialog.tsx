interface ConfirmDialogProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({ title, message, onConfirm, onCancel }: ConfirmDialogProps) {
  return (
    <div className="modal" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 400 }}>
        <h3 style={{ marginBottom: 16, color: '#1a202c' }}>{title}</h3>
        <p style={{ color: '#718096', marginBottom: 24, lineHeight: 1.6 }}>{message}</p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
          <button onClick={onCancel} className="btn" style={{ background: '#e2e8f0', color: '#2d3748' }}>Cancelar</button>
          <button onClick={onConfirm} className="btn btn-danger">Confirmar</button>
        </div>
      </div>
    </div>
  );
}
