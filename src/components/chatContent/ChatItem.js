import React, { Component } from "react";
import Avatar from "../chatList/Avatar";

export default class ChatItem extends Component {

  render() {
    return (
      <div
        style={{ animationDelay: `0.8s` }}
        className={`chat__item ${this.props.user ? this.props.user : ""}`}
      >
        <div className="chat__item__content">
          <div className="chat__msg">{this.props.msg}</div>
          <div className="chat__meta">
            {/* <span>16 mins ago</span>
            <span>Seen 1.03PM</span> */}
          </div>
        </div>
        <Avatar isOnline="active" image="https://cdn.dribbble.com/userupload/3396433/file/original-a7938da0f7cbc7a5a75d4237da6d2d02.png" />
      </div>
    );
  }
}
