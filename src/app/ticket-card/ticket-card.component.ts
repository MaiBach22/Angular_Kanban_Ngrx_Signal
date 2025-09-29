import { Component, Input } from '@angular/core';
import {Status, Ticket} from '../models/ticket.model';
@Component({
  selector: 'app-ticket-card',
  standalone: true,
  templateUrl: './ticket-card.component.html'
})
export class TicketCardComponent {
  @Input({required: true}) ticket!: Ticket;
  protected readonly Status = Status;
}
