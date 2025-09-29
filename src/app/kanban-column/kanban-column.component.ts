import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Status, Ticket } from '../models/ticket.model';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TicketCardComponent } from "../ticket-card/ticket-card.component";
import {NgClass} from '@angular/common';
@Component({
  selector: 'app-kanban-column',
  standalone: true,
  imports: [DragDropModule, TicketCardComponent, NgClass],
  templateUrl: './kanban-column.component.html'
})
export class KanbanColumnComponent {
  protected readonly Status = Status;

  @Input() label!: string;
  @Input() status!: Status;
  @Input() tickets: Ticket[] = [];
  @Input() connectedTo: string[] = [];
  @Output() dropped = new EventEmitter<{ event: CdkDragDrop<Ticket[]>; status: Status }>();

  trackById = (_: number, t: Ticket) => t.id;

  drop(event: CdkDragDrop<Ticket[]>) {
    this.dropped.emit({ event, status: this.status });
  }

}

