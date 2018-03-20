import React from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';

export const ChatMessages = ( {dataMessages} ) => {
  return (
    <div>
      {dataMessages.map((dataMessage)=>{
        return (<div key={dataMessage.epoch}>{dataMessage.name}:{dataMessage.message}</div>)
      })}
    </div>
  )
};

function sendMessage(message, name, socket) {
  let dataMessage = {
    message,
    socketId : socket.id,
    name,
    epoch : (new Date).getTime().toString()
  };
  socket.emit('clientEvent', JSON.stringify(dataMessage));
}

export default class Chat extends React.Component {

  constructor(props) {
    super(props);
    this.socket = io.connect('ws://localhost:3001/');
    this.inputVar = null;
    this.name = null;
    this.dataMessages = [];
  }

  componentDidMount() {
    this.socket.on('serverEvent', function(dataMessageJson){
      let dataMessage = JSON.parse(dataMessageJson)
      this.dataMessages.push(dataMessage);
      this.setState({});
    }.bind(this));
  }

  render() {
    return (
      <div>
        <label>myName:</label>
        <input
          ref={node => {
            this.name = node;
          }}
        />
        <br/>
        <br/>
        <br/>
        <ChatMessages dataMessages={this.dataMessages}/>
        <label></label>
        <input
          ref={node => {
            this.inputVar = node;
          }}
          onKeyDown={(event)=>{
            const { keyCode } = event;
            if(keyCode == 13) {
              sendMessage(this.inputVar.value, this.name.value, this.socket);
              this.inputVar.value = '';
            }
          }}
        />
        <button onClick={(e)=>{
          sendMessage(this.inputVar.value, this.name.value, this.socket);
          this.inputVar.value = '';
        }}>Send</button>

      </div>
    );
  }
}
