import React, { Component } from "react";
import "./chatBody.css";
import ChatList from "../chatList/ChatList";

export default class ChatBody extends Component {
  
  render() {
    return (
      <div className="">
        <ChatList />
      </div>
    );
  }
}
