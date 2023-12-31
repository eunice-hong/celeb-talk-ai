import React, { useState } from "react";
import Head from "next/head";
import axios from "axios";

function iMessage() {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [kanyeTyping, setKanyeTyping] = useState(false);

  const handleChange = (event) => {
    setUserInput(event.target.value);
  };
  console.log(messages)
  const handleSubmit = async (event) => {
    event.preventDefault();
    const newMessage = { user: true, text: userInput };
    setMessages([...messages, newMessage, { user: false, text: "loading" }]);
    setKanyeTyping(true);
    axios.post('http://localhost:8080/bot', {
        message: userInput
    }, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    }).then((response) => {
        console.log(response);
        // Update messages and setKanyeTyping to false when you receive the response
        const botResponse = { user: false, text: response.data.results[0] };
        setMessages([...messages, newMessage, botResponse]);
        setKanyeTyping(false);
    }).catch((error) => {
        console.error(error);
        // Update messages and setKanyeTyping to false when you receive an error
        const botResponse = { user: false, text: "Oops! Something went wrong." };
        setMessages([...messages, newMessage, botResponse]);
        setKanyeTyping(false);
    });
    setUserInput("");
    setKanyeTyping(true);
  };
  

  return (
    <>
        <Head>
            <title>
                Kanye West Chatbot - Metaschool
            </title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
        </Head>
        <div className="chat-container">
            <div className="header">                
                <i className="fa fa-chevron-left back-button"></i>
                <div className="contact-info">
                    <img
                        className="profile-image"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Piers_Morgan_-_2023_%2852665260600%29_%28cropped%29.jpg/440px-Piers_Morgan_-_2023_%2852665260600%29_%28cropped%29.jpg"
                        alt="Profile"
                    />
                    <h2 className="name">Morgan GPT</h2>
                </div>
                <i className="fa fa-video-camera video-icon"></i>
            </div>
            <div className="chat-window">
                <p className="chat-bot-header">Powered by <a className="ref-link" href="http://metaschool.so/" target="_blank" rel="noopener noreferrer">metaschool 🔮</a></p>
                {messages.map((message, index) => (
                    <div key={index} className="message-container">
                        {message.user ? (
                        <>
                            <div className="user-message message">
                                <div className="message-text">{message.text}</div>
                            </div>
                            <img
                                className="profile-image user-image"
                                src={'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png'}
                                alt="User Profile"
                            />
                        </>
                        ) : (
                        <>
                            <img
                                className="profile-image bot-image"
                                src='https://upload.wikimedia.org/wikipedia/commons/1/13/Piers_Morgan_-_2023_%2852665260600%29_%28cropped%29.jpg'
                                alt="Bot Profile"
                            />
                            {message.text === 'loading' ? <img className="typing-bubble" src='https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExODg3ZjFlNzQ1Mzc1ZTFlNTMyZTVjODIzMDYyODUwNDQ0ZDY3ZmU5YyZjdD1z/3tLfKrc4pLWiTkAAph/giphy.gif' /> : <div className="bot-message message">
                                <div className="message-text">{message.text}</div>
                            </div>}
                        </>
                        )}
                    </div>
                ))}
            </div>
            <form className="form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Type your message here..."
                    value={userInput}
                    onChange={handleChange}
                    disabled={kanyeTyping}
                />
                <button type="submit">
                    <i className="fa fa-paper-plane" aria-hidden="true"></i>
                </button>
            </form>
        </div>
    </>
  );
}

export default iMessage;