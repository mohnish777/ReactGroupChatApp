import React, { useState, useEffect } from 'react';
import queryString, { stringify } from 'query-string';
import io from 'socket.io-client';


import './Chat.css';
import InfoBar from '../InfoBar/InfoBar';
import Messages from '../Messages/Messages';
import Input from '../Input/Input';

let socket;

const Chat = () => {
    const [pageURL, setPageURL] = useState("");
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    // const ENDPOINT = `http://${window.location.hostname}:3000`;
    // const ENDPOINT = 'localhost:5000';
    const ENDPOINT = 'https://react-node-chat-applications.herokuapp.com/';

    useEffect(() => {

        setPageURL(window.location.href)
        console.log(pageURL)
        // console.log(window.location.search)

        const { name, room } = queryString.parse(window.location.search);

        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);
        // console.log(socket);

        // use 3rd parameter as a function to handle data received from server
        socket.emit('join', { name, room }, ( error ) => {
            console.log(error)
        });

        //targetting disconnect from server
        return () => {
            socket.emit('disconnect');
            socket.disconnect();
        }

    }, [ENDPOINT, window.location.search]);//end of useEffect

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message])

        })
    }, [messages])

    const sendMessage = (event) => {
        event.preventDefault();
        if (message) {
            socket.emit('sendMessage', message, () => setMessage(""))
        }

    }

    console.log(message,messages);
    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room}></InfoBar>
                <Messages messages={messages} name={name}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage}></Input>
               
            </div>
        </div>
    )
}//end of Chat component


export default Chat




// this was used in return statement previously
/*  <input value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null} /> */