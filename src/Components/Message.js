import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../Context/AuthContext";
import { ChatContext } from "../Context/ChatContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`Message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="Messageinfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
          className="MessageImg"
        />
        <span>just now</span>
      </div>
      <div className="MessageContent">
        <p className="userMessage">{message.text}</p>
        {message.img && <img src={message.img} alt="" className="massageImg2" />}
      </div>
    </div>
  );
};

export default Message;
