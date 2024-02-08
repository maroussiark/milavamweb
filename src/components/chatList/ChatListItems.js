import React, { Component } from "react";
import Avatar from "./Avatar";


export default class ChatListItems extends Component {

  selectChat = (e) => {
    for (
      let index = 0;
      index < e.currentTarget.parentNode.children.length;
      index++
    ) {
      e.currentTarget.parentNode.children[index].classList.remove("active");
    }
    e.currentTarget.classList.add("active");
  };

  render() {
    return (
      <div
        style={{ animationDelay: `0.${this.props.animationDelay}s` }}
        onClick={this.selectChat}
        className={`chatlist__item ${this.props.active ? this.props.active : ""
          } `}
      >
        <Avatar
          image={
            this.props.image ? this.props.image : "https://cdn.dribbble.com/userupload/3396433/file/original-a7938da0f7cbc7a5a75d4237da6d2d02.png"
          }
        />

        <div className="userMeta">
          <p>{this.props.name}</p>
          <span className="activeTime">{this.props.lastChat}</span>
        </div>
      </div>
    );
  }
}
