// Chatbox.js
import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase/config';
import { useNavigate } from 'react-router-dom';
import { signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { onSnapshot, collection, addDoc } from 'firebase/firestore';
import { Message } from './Message';

export const Chatbox = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'messages'), snapshot => {
      const messagesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      messagesData.sort((a, b) => a.createdAt - b.createdAt);
      setMessages(messagesData);
    });

    return () => unsubscribe();
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      await addDoc(collection(db, 'messages'), {
        text: newMessage,
        userId: auth.currentUser.uid,
        userImage: auth.currentUser.photoURL || "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        createdAt: new Date()
      });
      setNewMessage('');
    }
  };
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
    } catch (error) {
      console.error("Error signing in with Google: ", error);
    }
  };

  return (
    <div className="chatbox">
      <header>
        <h1>Chatroom</h1>
        <div className="profilebag">
          <div className="profileimg" onClick={() => setShow(!show)}>
            {auth.currentUser?.photoURL ? (
              <img src={auth.currentUser.photoURL} alt="profile" />
            ) : (
              <button onClick={handleGoogleSignIn}>Sign in with Google</button>
            )}
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
          <Message
            key={msg.id}
            msg={msg}
            currentUser={auth.currentUser}
          />
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
