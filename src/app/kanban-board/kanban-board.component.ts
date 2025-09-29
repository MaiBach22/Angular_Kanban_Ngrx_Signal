import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { KanbanColumnComponent } from "../kanban-column/kanban-column.component";
import { Store } from '@ngrx/store';
import { Status, Ticket, TicketDialogResult } from '../models/ticket.model';
import * as TicketSelectors from '../store/ticket.selectors';
import * as TicketActions from '../store/ticket.action';
import { CreateTicketComponent } from '../create-ticket/create-ticket.component';
import confetti from 'canvas-confetti';
@Component({
  selector: 'app-kanban-board',
  standalone: true,
  imports: [CommonModule, DragDropModule, DialogModule, KanbanColumnComponent],
  templateUrl: './kanban-board.component.html',
  styleUrl: './kanban-board.component.css'
})
export class KanbanBoardComponent {
  private store = inject(Store);
  private dialog = inject(Dialog);
  Status = Status;

readonly backlogId = Status.Backlog + '-list';
readonly todoId = Status.Todo + '-list';
readonly inProgressId = Status.InProgress + '-list';
readonly doneId = Status.Done + '-list';

readonly allIds = [this.backlogId, this.todoId, this.inProgressId, this.doneId];

  backlog = this.store.select(TicketSelectors.ticketsByStatus(Status.Backlog));
  todo = this.store.select(TicketSelectors.ticketsByStatus(Status.Todo));
  inProgress = this.store.select(TicketSelectors.ticketsByStatus(Status.InProgress));
  done = this.store.select(TicketSelectors.ticketsByStatus(Status.Done));

  openCreate() {
    this.dialog.open<TicketDialogResult>(CreateTicketComponent, { ariaLabel: 'Create new ticket', disableClose: true }).closed.subscribe((res: TicketDialogResult | undefined) => {
      if (res?.title?.trim()) {
        this.store.dispatch(TicketActions.createTicket({ title: res.title, description: res.description }));
      }
    });
  }

  idsExcept(id: string) {
  return this.allIds.filter(x => x !== id);
}

onDrop(dropData: { event: CdkDragDrop<Ticket[]>; status: Status }) {
  const { event, status: targetStatus } = dropData;
  const ticket = event.item.data as Ticket;

  if (ticket.status !== targetStatus) {
    this.store.dispatch(
      TicketActions.moveTicket({ id: ticket.id, status: targetStatus })
    );

    if (targetStatus === Status.Done) {
      let x = window.innerWidth / 2;
      let y = window.innerHeight / 2;
      const e = event.event;

      if (e instanceof MouseEvent) {
        x = e.clientX;
        y = e.clientY;
      } else if (e instanceof TouchEvent && e.touches.length) {
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
      }

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { x: x / window.innerWidth, y: y / window.innerHeight }
      });
    }
  }
}

}
