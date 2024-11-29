import React from 'react';

const CustomMessage = ({ message }) => {
  return (
    <div className={`str-chat__message-simple ${message.user.id === 'john' ? 'str-chat__message-simple--own' : ''}`}>
      <div className="message-sender">{message.user.name}</div>
      <div className="message-text">{message.text}</div>
    </div>
  );
};

export default CustomMessage;