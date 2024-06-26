import { useEffect, useState, useRef } from 'react';
import { FiSend } from 'react-icons/fi';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import BASE_API from '../../api';
import FriendsList from '../../Components/FriendsList';
import './Message.css';

const MessageSection = () => {
    const { recieverId } = useParams();
    const [usernameR, setUsernameR] = useState('');
    const [profilePicUrlR, setProfilePicUrlR] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const token = localStorage.getItem('token');
    const userData = token ? jwtDecode(token) : null;
    const userEmail = userData.email;
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    useEffect(() => {
        axios.get(`${BASE_API}/auth/getUserDetails`, {
            headers: {
                'Authorization': `Bearer ${recieverId}`
            }
        })
            .then(response => {
                setProfilePicUrlR(response.data.profilePicUrl);
                setUsernameR(response.data.username);
            })
            .catch(error => {
                console.error('Error fetching user details:', error);
            });
    }, [recieverId]);

    useEffect(() => {
        if (userEmail && recieverId) {
            axios.get(`${BASE_API}/messages/getMessages/${userEmail}/${recieverId}`)
                .then(response => {
                    setMessages(response.data);
                })
                .catch(error => {
                    console.error('Error fetching messages:', error);
                });
        }
    }, [userEmail, recieverId]);

    const handleSendMessage = () => {
        if (newMessage.trim() === '') return;

        axios.post(`${BASE_API}/messages/sendMessage`, {
            senderId: userEmail,
            receiverId: recieverId,
            message: newMessage
        })
            .then(response => {
                setMessages([...messages, response.data]);
                setNewMessage('');
            })
            .catch(error => {
                console.error('Error sending message:', error);
            });
    };
    return (
        <div className="container w-2/3">
            <div className="row clearfix">
                <div className="col-lg-12">
                    <div className="card chat-app flex">
                        <div className='people-list'><FriendsList /></div>
                        <div className="chat flex flex-col">
                            <div className="m-2 flex gap-3 items-center h-10">
                                {profilePicUrlR && userEmail !== recieverId && (
                                    <>
                                        <div className="w-10 h-10 rounded-full overflow-hidden row">
                                            <img src={profilePicUrlR} alt="Profile" className="w-full h-full object-cover" />
                                        </div>
                                        <div className="text-center chat-about">
                                            <h1 className="text">{usernameR}</h1>
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="chat-history border-t-2">
                                {messages.length === 0 ? (
                                    <div className="no-messages">
                                        <h1 className="text-center text-gray-500 mt-4 text-xl font-bold">Start Conversation!</h1>
                                        <p className="text-center text-gray-500">Click on any user or search to start a conversation!</p>
                                    </div>
                                ) : (
                                    <ul className="m-b-0 text-black">
                                        {messages.map((msg, index) => (
                                            <li key={index} className={`clearfix flex ${msg.senderId === userEmail ? 'justify-end' : 'justify-start'}`}>
                                                <div className={`message  ${msg.senderId === userEmail ? 'my-message' : 'other-message float-right'}`}>
                                                    {msg.message}
                                                </div>
                                            </li>
                                        ))}
                                        <div ref={messagesEndRef} />
                                    </ul>
                                )}
                            </div>


                            <div className="chat-message clearfix w-full flex items-center gap-2 h-auto">
                                {profilePicUrlR && userEmail !== recieverId && (
                                    <>
                                        <input
                                            type="text"
                                            name="message"
                                            id="message"
                                            className="bg-white block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-white-900 ring-1 ring-inset text-black ring-gray-300 placeholder:text-gray-700 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                                            placeholder="Type message here..."
                                            value={newMessage}
                                            onChange={(e) => setNewMessage(e.target.value)}
                                        />
                                        <span className='cursor-pointer' onClick={handleSendMessage}><FiSend /></span></>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );


};

export default MessageSection;
