import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase/config';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { onSnapshot, collection, addDoc } from 'firebase/firestore';

export const Chatbox = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'messages'), snapshot => {
      const messagesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // Sort messages by createdAt timestamp in ascending order
      messagesData.sort((a, b) => a.createdAt - b.createdAt);
      setMessages(messagesData);
    });

    return () => unsubscribe(); // Clean up subscription on unmount
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      await addDoc(collection(db, 'messages'), {
        text: newMessage,
        userId: auth.currentUser.uid,
        createdAt: new Date() // Ensure this is a Date object
      });
      setNewMessage(''); // Clear the input after sending
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className="chatbox">
      <header>
        <h1>Chatroom</h1>
        <div className="profilebag">
          <div className="profileimg" onClick={() => setShow(!show)}>
            <img
              src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="profileimg"
            />
          </div>
          {show && (
            <div className="dropdown" onClick={handleLogout}>
              Sign Out
            </div>
          )}
        </div>
      </header>

      <section>
        {messages.map(msg => (
          <div key={msg.id} className={`message ${msg.userId === auth.currentUser?.uid ? 'sent' : 'received'}`}>
            <p>{msg.text}</p>
          </div>
        ))}

        <form onSubmit={handleSendMessage}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <button type="submit">Send</button>
        </form>
      </section>
    </div>
  );
};
