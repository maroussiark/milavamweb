import React, { Component,createRef } from "react";

import "./chatContent.css";
import Avatar from "../chatList/Avatar";
import ChatItem from "./ChatItem";
import { FaPaperPlane } from "react-icons/fa";
import api from "../../services/api";
import { notify } from "../../utils/utils";



export default class ChatContent extends Component {
  messagesEndRef = createRef(null);

  constructor(props) {
    super(props);
    this.state = {
      msg: "",
      messagereq : this.initialValue
    };
  }
  reload = () =>{
    this.props.reload();
  } 
  scrollToBottom = () => {
    this.messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  componentDidMount() {
    console.log(this.props.chat);
  }
  onStateChange = (e) => {
    this.setState({ msg: e.target.value });
    // eslint-disable-next-line react/no-direct-mutation-state
    this.state.messagereq.contenu = this.state.msg;
  };

  getUser(variable){
    const data = JSON.parse(localStorage.getItem("userInfo"));

    if(variable === data.id){
      return "me";
    }else{
      return "other";
    }
  };
  
  formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // les mois commencent à 0
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };
  initialValue = {
    idReceiver : this.props.receiver,
    contenu :'',
    datemessage: this.formatDate(new Date())
  };
  iduser = () =>{
    return localStorage.getItem('userInfo').id;
  };

  


  handleSubmit = async (e) => {
    e.preventDefault();
    console.log(this.state.messagereq);
    notify("info","Sending",100);

    // eslint-disable-next-line react/no-direct-mutation-state
    this.state.messagereq.idReceiver = this.props.receiver;
    try {
      const resp = await api.post('/messageries', this.state.messagereq);
      console.log(resp);
      this.reload();
      
    } catch (error) {
      console.error('errorr',error);
    }
    window.location.reload();
    notify("success","Envoye",100);

  };

  render() {
    return (
      <div className="main__chatcontent">
          {this.props.chat ? 
          (<div className="chat__items">
              <div className="content__header">
                <div className="blocks">
                  <div className="current-chatting-user">
                    <Avatar
                      isOnline="active"
                      image="https://cdn.dribbble.com/userupload/3396433/file/original-a7938da0f7cbc7a5a75d4237da6d2d02.png"
                    />
                    <p>{this.props.username}</p>
                  </div>
                </div>
              </div>
            {this.props.chat.map((itm, index) => {
              return (
                <div className="content__body" id="content">
                  <ChatItem
                    animationDelay={index + 2}
                    key={itm.key}
                    user={this.getUser(itm.id_utilisateur)}
                    msg={itm.contenu}
                    image={itm.image}
                  />
                </div>
              );
            })}
            <div className="content__footer">
              <form method="post" onSubmit={this.handleSubmit}>
              <div className="sendNewMessage">
                <input
                  type="text"
                  placeholder="Type a message here"
                  onChange={this.onStateChange}
                  value={this.state.msg}
                />
                <button type="submit" className="text-center">
                    <FaPaperPlane />
                </button>
             
              </div>
              </form>
            </div>
            <div ref={this.messagesEndRef} />
          </div>):(<p className="font-sans text-4xl  font-bold uppercase  tracking-wide text-gray-300 text-center w-full py-32">
                Selectionner une discussion
        </p>)}
          
        
      </div>
    );
  }
}
