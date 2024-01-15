import React from 'react'

const Messages = (props) => {
    return (
        <div className='message-container'>
            {messages.map((msg, index) => (
                <div key={index}>
                    <strong>{userName}:</strong> {msg.text}
                </div>
            ))}
            <div>
                <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => e.key == 'Enter' ? sendMessage() : null}
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
}
