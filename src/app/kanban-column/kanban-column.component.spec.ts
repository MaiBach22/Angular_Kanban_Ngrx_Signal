import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanColumnComponent } from './kanban-column.component';
import {Status, Ticket} from '../models/ticket.model';
import moment from 'moment';
import {CdkDragDrop} from '@angular/cdk/drag-drop';

describe('KanbanColumnComponent', () => {
  let component: KanbanColumnComponent;

  beforeEach(async () => {
   component = new KanbanColumnComponent()
  });

  describe('trackById', () => {
    it('should return ticket id', () => {
      const ticket: Ticket = {
        id: '123',
        title: 'Test ticket',
        description: 'desc',
        status: Status.Backlog,
        createdAt: moment()
      };

      expect(component.trackById(0, ticket)).toBe('123');
    });
  });

  describe('drop', () => {
    it('should emit dropped event with status and event', () => {
      const mockTicket: Ticket = {
        id: '1',
        title: 'Ticket 1',
        description: '',
        status: Status.Todo,
        createdAt: moment(),
      };

      const fakeEvent = {
        previousIndex: 0,
        currentIndex: 1,
        item: { data: mockTicket },
        container: {} as any,
        previousContainer: {} as any,
        isPointerOverContainer: true,
        distance: { x: 0, y: 0 },
      } as CdkDragDrop<Ticket[]>;

      component.status = Status.InProgress;

      const spy = jest.fn();
      component.dropped.subscribe(spy);

      component.drop(fakeEvent);

      expect(spy).toHaveBeenCalledWith({
        event: fakeEvent,
        status: Status.InProgress,
      });
    });
  });

});
