import React, { Component } from "react";
import "./chatList.css";
import ChatListItems from "./ChatListItems";
import api from "../../services/api";
import ChatContent from "../chatContent/ChatContent";
import { FaEllipsisH } from "react-icons/fa";

class ChatList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      message : [],
      username : null,
      receiver : null,
      id: 0,

    };
  }
  
  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const response = await api.get('/messageries/mes-messages');
      console.log(response);
      this.setState({ data: response.data, message:response.data[0].message , username :response.data[0].participants[1].username, receiver:response.data[0].participants[1].id_utilisateur });
    } catch (error) {
      console.error('une erreur ', error);
    }
  }

  handleReload = () =>{
    this.fetchData();
  }

  handleLoad = async (id,username,rec) =>{
    console.log('id',id);
    try {
      const response = await api.get('/messageries/mes-messages');
          this.setState({message : response.data[id].message, username : username, receiver:rec})
          console.log('msg :',this.state.receiver);
      
    } catch (error) {
      console.error('une erreur ', error);
      
    }
  };


  handleClick = (id,msg,username,rec) =>{
    this.setState({id:id,message : msg, username : username, receiver:rec})
    console.log('msg :',this.state.id);
  };

  iduser = () =>{
    const data = JSON.parse(localStorage.getItem("userInfo"));
    console.log(data.id);
    return data.id;
  };

  getUserName = (participants) =>{
    for (let i = 0; i < participants.length; i++) {
    const data = JSON.parse(localStorage.getItem("userInfo"));

      if(participants[i].id_utilisateur !== data.id){
        return participants[i].username;
      }
      
    }
    return null;
  };

  getIdUser = (participants) =>{
    const data = JSON.parse(localStorage.getItem("userInfo"));
    // console.log(data.id);
    for (let i = 0; i < participants.length; i++) {
      if(participants[i].id_utilisateur !== data.id){
        return participants[i].id_utilisateur;
      }
      
    }
    console.log(this.iduser);
  
    return null;
  };
  
  render() {
    const {data,message,username,receiver,id} = this.state;
    return (
      <div className="main__chatbody" >
          <div className="main__chatlist">
          
            <div className="chatlist__heading">
              <h2>Chats</h2>
              <button className="btn-nobg">
                <FaEllipsisH></FaEllipsisH>
              </button>
            </div>
            <div className="chatList__search">
              <div className="search_wrap">
                <input type="text" placeholder="Search Here" required />
                <button className="search-btn">
                  <i className="fa fa-search"></i>
                </button>
              </div>
            </div>
            <div className="chatlist__items" >
              {data.map((item,index) => (
                <div onClick={() => this.handleClick(index,item.messages,
                              
                           this.getUserName(item.participants),

                                                  this.getIdUser(item.participants))}>
                <ChatListItems 
                  name={this.getUserName(item.participants)}
                  key={item.id}
                  image={item.image}
                  lastChat={item.messages[item.messages.length-1].contenu} />
                  </div>
              ))};
            </div>
        </div>
      
        {data.length > 0 ? (<ChatContent id={id} chat = {message} username = {username} receiver = {receiver} reload={this.handleReload}   />) :(<p className="font-sans text-4xl  font-bold uppercase  tracking-wide text-gray-300 text-center w-full py-32">
                Nothing to Show!
        </p>)}
        {/* <UserProfile /> */}
      
      </div>
      
    );
  }
}
export default ChatList;