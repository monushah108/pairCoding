import { useEffect, useRef } from "react";
import { GradientBackground } from "../gradient-background";
import { Button } from "../ui/button";
import Peer from "peerjs";
import {socket} from '../../socket/socket.js'

export default function VoiceRoom() {

  const peerRef = useRef<Peer | null>(null);
  if (!peerRef.current) {
    peerRef.current = new Peer();
  }

  const s = socket("/serverVoice")
   
  useEffect(() => {
    const peer = new Peer(undefined , {
      host:"localhost",
      port:4000,
      path:"/peerjs"
    })

    peerRef.current = peer;

    peer.on("open", id => {
      s.emit("group:join" , {
        roomId,
        peerId,
        userId
      })
    })

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });


     s.on("user-joined" , ({peerId}) => {
      const call = peer.call(peerId , stream)

      call.on("stream" , remoteStream => {
        addvideo(remoteStream)
      })
      
    })

    peer.on("call" , call => {
      call.answer(stream)
      call.on("stream" , remoteStream => {
        addvideo(remoteStream)
      })
    })

   socket.on("user-left" , ({peerId}) => {
      // remove video element
      removeVideo(peerId)
   }

   peer.on("close" , () => {
    stream.getTracks().forEach(track => track.stop());
   })



    return () => {
      peer.destroy();
    }
  },[])


  


  return (
    <div className="h-[901px] overflow-hidden">
      <GradientBackground
        gradients={[
          "linear-gradient(135deg, #2d1b69 0%, #11998e 100%)",
          "linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%)",
        ]}
        animationDuration={10}
        animationDelay={0.5}
        overlay={true}
        overlayOpacity={0.5}
      >
        <div className="relative z-10 text-white text-center p-10 space-y-3">
          <h1 className="text-4xl font-bold">Meeting Room</h1>
          <p className="text-sm font-medium">no one currently in voice</p>
          <Button variant="secondary" className="cursor-pointer">
            Join
          </Button>
        </div>
      </GradientBackground>
    </div>
  );
}
