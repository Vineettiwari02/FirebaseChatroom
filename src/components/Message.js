// Message.js
import React from 'react';

export const Message = ({ msg, currentUser }) => {
    const defaultAvatar = "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

    return (
        <div className={`message ${msg.userId === currentUser?.uid ? 'sent' : 'received'}`}>
            <img 
                src={msg.userImage || defaultAvatar} 
                alt="User" 
                onError={(e) => { e.target.onerror = null; e.target.src = defaultAvatar; }} // Fallback if image fails to load
            />
            <p>{msg.text}</p>
        </div>
    );
};
