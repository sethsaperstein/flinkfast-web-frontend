import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;
const wsServerUrl = process.env.REACT_APP_WS_SERVER_URL

export class WebSocketService {
  private stompClient?: any;
  private sessionId?: String;
  private subscription?: Stomp.Subscription;
  private accessToken?: String;
  private onMessageCallback: ((message: string) => void) | null = null;

  async send(query: string, queryId: string, accessToken: string): Promise<void> {
    this.accessToken = accessToken;
    const headers: { [key: string]: string } = {};
    headers['X-Authorization'] = `Bearer ${accessToken}`;

    const socket = new SockJS(`http://localhost:6060/secured/room`);
    const stomp: any = Stomp.over(socket);

    return new Promise<void>((resolve, reject) => {
      stomp.connect(headers, () => {
        console.log("set stomp client: ", stomp);
        this.stompClient = stomp;

        console.log("ws :", stomp.ws.url);
        console.log("ws url: ", stomp.ws._transport.url)
        var url = stomp.ws._transport.url;
        url = url.replace(`ws://localhost:6060/secured/room/`,  "");
        url = url.replace("/websocket", "");
        url = url.replace(/^[0-9]+\//, "");
        console.log("Your current session is: " + url);
        this.sessionId = url;

        this.subscription = stomp.subscribe(`/secured/user/queue/specific-user-user${url}`, (response: any) => {
            if (this.onMessageCallback) {
                this.onMessageCallback(response.body);
                console.log("query id ", queryId);
            }
        });

        this.sendMessage(query);

        resolve();

    }, function (error) {
        console.error('Error connecting to WebSocket server:', error);
        reject(error);
    });
  });
  }

  disconnect(): void {
    console.log("disconnecting socket");
    this.onMessageCallback = null;
    console.log("stomp client on disconnect: ", this.stompClient);
    if (this.stompClient) {
      console.log("Disconnecting stomp client");
      if (this.subscription) {
          console.log("unsubscribing");
          for (const sub in this.stompClient.subscriptions) {
            if (this.stompClient.subscriptions.hasOwnProperty(sub)) {
              this.stompClient.unsubscribe(sub);
            }
          }
          this.subscription.unsubscribe();
          this.subscription = undefined;
      }

      this.stompClient.disconnect(() => {
          console.log("WebSocket disconnected");
      });

      // this.stompClient = undefined;
      this.accessToken = undefined;
      this.sessionId = undefined;
    }
  }

  private sendMessage(message: string): void {
    console.log("Websocket message attempt");
    if (this.stompClient) {
        let data = JSON.stringify({ to: "sethsaps@gmail.com", text: message });
        this.stompClient.send('/spring-security-mvc-socket/secured/room', { "X-Authorization": `Bearer ${this.accessToken}` }, data);
        console.log('WebSocket message sent:', message);
    }
  }

  setOnMessage(callback: (message: string) => void): void {
    this.onMessageCallback = callback;
  }
}
