import { Component } from '@angular/core';
import { HelloService } from 'src/app/services/hello.service';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.css'],
})
export class HelloComponent {
  messageId: number = 1;
  message: any;

  constructor(private helloService: HelloService) {}

  fetchMessage(): void {
    if (this.messageId != null) {
      this.helloService.getHelloMessageById(this.messageId).subscribe(
        (data) => {
          this.message = data;
        },
        (error) => {
          console.error('Error fetching hello message', error);
          this.message = null;
        }
      );
    }
  }
}
