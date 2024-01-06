import { useState } from "react"

const Chat = ({username,challangeId}:ChatProperties) => {
  return (
    <div>
        <iframe 
        style={{background:"white",width:"100%",height:"400px",border:"none"}}
        src={`http://localhost:8081/obs.html?username=${username}&showLikes=1&showChats=1&showGifts=1&showFollows=1&showJoins=1&bgColor=rgb(24,23,28)&fontColor=rgb(227,229,235)&fontSize=1.3em&challengeId=${challangeId}`}></iframe>
    </div>
  )
}

export default Chat