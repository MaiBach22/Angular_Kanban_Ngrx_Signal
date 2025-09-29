import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule, DialogRef } from '@angular/cdk/dialog';
import { FormsModule } from '@angular/forms';
import { TicketDialogResult } from '../models/ticket.model';
@Component({
  selector: 'app-create-ticket',
  standalone: true,
  imports: [CommonModule, FormsModule, DialogModule],
  templateUrl: './create-ticket.component.html',
  styleUrl: './create-ticket.component.css'
})
export class CreateTicketComponent {
  title = signal<string>('');
  description= signal<string>('');
  constructor(private ref: DialogRef){}
  close(){this.ref.close()}
  submit(){
    const ticket= this.title().trim();
    if(ticket){
      this.ref.close({title: ticket, description: this.description()}  as TicketDialogResult)
    }
  }
}
