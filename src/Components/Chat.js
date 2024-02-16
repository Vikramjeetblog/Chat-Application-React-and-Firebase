import React, { useContext } from 'react'
import add from '../Images/add.png'
import more from '../Images/more.png'
import cam from '../Images/cam.png'
import Messages from './Messages'
import { ChatContext } from '../Context/ChatContext'
import Inputbar from './Inputbar'



const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="Chat">
      <div className="Chatinfo">
        <span>{data.user?.displayName}</span>
        <div className="Chaticons">
          <img src={cam} alt="" className="icon" />
          <img src={add} alt="" className="icon" />
          <img src={more} alt=""  className="icon"/>
        </div>
      </div>
      <Messages />
   <Inputbar/>
    </div>
  );
}

export default Chat