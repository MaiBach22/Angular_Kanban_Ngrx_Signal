import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Status, Ticket } from '../models/ticket.model';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TicketCardComponent } from "../ticket-card/ticket-card.component";
@Component({
  selector: 'app-kanban-column',
  standalone: true,
  imports: [DragDropModule, TicketCardComponent],
  templateUrl: './kanban-column.component.html',
  styleUrl: './kanban-column.component.css'
})
export class KanbanColumnComponent {

  @Input() label!: string;
  @Input() status!: Status;
  @Input() tickets: Ticket[] | null = [];
  @Input() connectedTo: string[] = [];
  @Output() dropped = new EventEmitter<{ event: CdkDragDrop<Ticket[]>; status: Status }>();

   trackById = (_: number, t: Ticket) => t.id;

 drop(event: CdkDragDrop<Ticket[]>) {
    this.dropped.emit({ event, status: this.status });
  }
}

