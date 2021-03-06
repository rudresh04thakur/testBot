import { Subject, Observable, Observer } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class WebsocketService {
  constructor() {}

  private subject: Subject<MessageEvent>;

  public connect(url: any): Subject<MessageEvent> {
    
    //if (!this.subject) {
      this.subject = this.create(url);
      //console.log("Successfully connected: " + url);
     //}
     console.log("Subject -- ",this.subject)
    return this.subject;
  }

  close() {
    this.subject.complete;
  }

  private create(url: any): Subject<MessageEvent> {
    //console.log("In web Service Socket URL ",url)
    let ws = new WebSocket(url);

    let observable = Observable.create((obs: Observer<MessageEvent>) => {
      ws.onmessage = obs.next.bind(obs);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = obs.complete.bind(obs);
      return ws.close.bind(ws);
    });
    let observer = {
      next: (data: Object) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      }
    };
    return Subject.create(observer, observable);
  }
}