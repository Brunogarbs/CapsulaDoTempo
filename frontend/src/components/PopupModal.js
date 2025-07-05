import React from 'react';
import './PopupModal.css';

function PopupModal({ show, message, recipient, onClose }) {
  if (!show) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-modal">
        <h2>📬 Mensagem para {recipient}</h2>
        <p>{message}</p>
        <button className="btn-primary" onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
}

export default PopupModal;
