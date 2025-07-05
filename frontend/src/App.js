import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import PopupModal from './components/PopupModal';

function App() {
  const [capsules, setCapsules] = useState([]);
  const [form, setForm] = useState({ recipient_name: '', message: '', open_date: '' });
  const [editingId, setEditingId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupRecipient, setPopupRecipient] = useState('');
  const [popupQueue, setPopupQueue] = useState([]);



  useEffect(() => {
  axios.get('http://localhost:5000/api/capsules')
    .then(res => {
      setCapsules(res.data);
      const today = new Date().toISOString().split('T')[0];
      const alreadyShown = JSON.parse(localStorage.getItem('shownCapsules')) || [];

      // Filtra todas as cápsulas do dia que ainda não foram exibidas
      const todayMessages = res.data.filter(capsule => {
        const capsuleDate = new Date(capsule.open_date).toISOString().split('T')[0];
        return capsuleDate === today && !alreadyShown.includes(capsule.id);
      });

      // Se houver cápsulas do dia, inicia a fila de exibição
      if (todayMessages.length > 0) {
        setPopupQueue(todayMessages);
        showNextPopup(todayMessages);
      }
    });
}, []);


  const showNextPopup = (queue) => {
  const next = queue[0];
  if (next) {
    setPopupRecipient(next.recipient_name);
    setPopupMessage(next.message);
    setShowPopup(true);
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      // Atualização
      await axios.put(`http://localhost:5000/api/capsules/Editar/${editingId}`, form);
      setEditingId(null); // limpa modo edição
    } else {
      // Criação
      await axios.post('http://localhost:5000/api/capsules', form);
    }
    // Limpa formulário e atualiza lista
    setForm({ recipient_name: '', message: '', open_date: '' });
    const res = await axios.get('http://localhost:5000/api/capsules');
    setCapsules(res.data);
  };


  const handleDelete = async (id) => {
    await axios.get(`http://localhost:5000/api/capsules/Deletar/${id}`);
    setCapsules(capsules.filter(c => c.id !== id));
    window.location.reload();
  };

  return (
    <div className="container">
      <h1>Cápsula do Tempo</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome do destinatário"
          value={form.recipient_name}
          required
          onChange={e => setForm({ ...form, recipient_name: e.target.value })}
        />
        <input
          type="date"
          value={form.open_date}
          required
          onChange={e => setForm({ ...form, open_date: e.target.value })}
        />
        <textarea
          placeholder="Mensagem secreta"
          value={form.message}
          required
          onChange={e => setForm({ ...form, message: e.target.value })}
        ></textarea>
        <button className="btn-primary" type="submit">
          {editingId ? 'Salvar Alterações' : 'Enviar Cápsula'}
        </button>
        {editingId && (
            <button
              type="button"
              className="btn-cancel"
              onClick={() => {
                setForm({ recipient_name: '', message: '', open_date: '' });
                setEditingId(null);
              }}
            >
              Cancelar Edição
            </button>
          )}
      </form>

      <h2 style={{ marginTop: '2rem' }}>Cápsulas criadas</h2>
      {capsules.map(c => (
        <div key={c.id} className="capsule">
          <p><strong>Para:</strong> {c.recipient_name}</p>
          <p><strong>Abrir em:</strong> {new Date(c.open_date).toLocaleDateString()}</p>
         <button className="btn-primary"  onClick={() => {
            setForm({
              recipient_name: c.recipient_name,
              message: c.message,
              open_date: c.open_date.split('T')[0]
            });
            setEditingId(c.id);
          }}>
            Editar Cápsula
          </button>
          <button   className="btn-danger" onClick={() => handleDelete(c.id)}>
            Deletar Cápsula
          </button>           
        </div>

      ))}
      <PopupModal
        show={showPopup}
        message={popupMessage}
        recipient={popupRecipient}
        onClose={() => {
          const currentId = popupQueue[0]?.id;
          const alreadyShown = JSON.parse(localStorage.getItem('shownCapsules')) || [];
          localStorage.setItem('shownCapsules', JSON.stringify([...alreadyShown, currentId]));

          const newQueue = popupQueue.slice(1);
          setPopupQueue(newQueue);

          if (newQueue.length > 0) {
            showNextPopup(newQueue);
          } else {
            setShowPopup(false);
          }
        }}
      />


    </div>
    
  );
}

export default App;
