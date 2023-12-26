import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const SOCKET_URL = 'http://localhost:6060/ws';

interface data {
    message: string
}

export const TestPage = () => {
  const [message, setMessage] = useState('You server message here.');
  const [accessToken, setAccessToken] = useState<string|undefined>(undefined);
  const [stompClient, setStompClient] = useState<any>(null);
  const { getAccessTokenSilently } = useAuth0();
  const [sessionId, setSessionId] = useState<string>();


  useEffect(() => {
    const getToken = async () => {
        const headers: { [key: string]: string } = {};
        const authAccessToken = await getAccessTokenSilently();
        setAccessToken(authAccessToken);

        if (authAccessToken) {
            headers['X-Authorization'] = `Bearer ${authAccessToken}`;
          
            
            const socket = new SockJS('http://localhost:6060/secured/room');
            const stomp = Stomp.over(socket);

            // stomp.debug = function (message) {
            //     console.log(message);
            // };

        
            stomp.connect(headers, () => {
                setStompClient(stomp);

                // console.log("ws url: ", stomp.ws._transport.url)
                // var url = stomp.ws._transport.url;
                var url = stomp.ws.url;
                url = url.replace(
                "ws://localhost:6060/secured/room/",  "");
                url = url.replace("/websocket", "");
                url = url.replace(/^[0-9]+\//, "");
                console.log("Your current session is: " + url);
                setSessionId(url);
        
                const user = "auth0|6569684dcbbaf98b6e2dd474";
                const subscription = stomp.subscribe(`/secured/user/queue/specific-user-user${url}`
                , (response: any) => {
                const message = JSON.parse(response.body);
                console.log("New message: ", message);
                });
            }, function (error) {
                console.error('Error connecting to WebSocket server:', error);
            });
        }

    };

    getToken();

    return () => {};
  }, [getAccessTokenSilently]);

  const sendMessage = () => {
    if (stompClient) {
      stompClient.send('/spring-security-mvc-socket/secured/room', { "X-Authorization": `Bearer ${accessToken}` }, JSON.stringify({ to: "sethsaps@gmail.com", text: message }));
    }
  };

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
}