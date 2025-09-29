import { KanbanBoardComponent } from './kanban-board.component';
import confetti from 'canvas-confetti';
import {Store} from '@ngrx/store';
import {Dialog, DialogRef} from '@angular/cdk/dialog';
import * as TicketActions from '../store/ticket.action';
import {Status, Ticket} from '../models/ticket.model';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import moment from 'moment';
jest.mock('canvas-confetti', () => jest.fn());

describe('KanbanBoardComponent', () => {
  let component: KanbanBoardComponent;
  let storeMock: jest.Mocked<Store<any>>;
  let dialogMock: jest.Mocked<Dialog>;


  beforeEach( () => {
    storeMock = {
      select: jest.fn().mockReturnValue({ subscribe: jest.fn() }),
      dispatch: jest.fn()
    } as any;

    dialogMock = {
      open: jest.fn().mockReturnValue({ closed: { subscribe: jest.fn() } } as any)
    } as any;

    component = new KanbanBoardComponent(storeMock, dialogMock);
    (component as any).store = storeMock;
    (component as any).dialog = dialogMock;
  });

  afterEach(()=> {
    jest.clearAllMocks();
  })

  describe('openCreate()', () => {
    it('should not dispatch if dialog result is undefined', () => {
      const dialogRefMock = {
        closed: { subscribe: (fn: any) => fn(undefined) },
      } as Partial<DialogRef<any>>;

      dialogMock.open.mockReturnValue(dialogRefMock as DialogRef<any>);
      component.openCreate();
      expect(storeMock.dispatch).not.toHaveBeenCalled();
    });

    it('should dispatch createTicket if dialog returns valid title', () => {
      const dialogRefMock = {
        closed: { subscribe: (fn: any) => fn({ title: ' New Ticket ', description: 'Desc' }) },
      } as Partial<DialogRef<any>>;

      dialogMock.open.mockReturnValue(dialogRefMock as DialogRef<any>);
      component.openCreate();
      expect(storeMock.dispatch).toHaveBeenCalledWith(
        TicketActions.createTicket({ title: ' New Ticket ', description: 'Desc' })
      );
    });
  });

  describe('idsExcept()', () => {
    it('should return all ids except the one passed in', () => {
      const all = component['allIds'];
      const result = component.idsExcept(component.backlogId);
      expect(result).toEqual(all.filter((x) => x !== component.backlogId));
    });
  });

  describe('onDrop()', () => {
    let mockTicket: Ticket;

    beforeEach(() => {
      mockTicket = { id: '1', title: 'Ticket 1', description: '', status: Status.Todo, createdAt: moment() };
    });

    function createDrop(event: Partial<CdkDragDrop<Ticket[]>>, status: Status): any {
      return { event: { item: { data: mockTicket }, ...event }, status };
    }

    it('should dispatch moveTicket if status changes', () => {
      mockTicket.status = Status.Todo;
      const drop = createDrop({ item: { data: mockTicket } } as any, Status.Done);

      component.onDrop(drop);

      expect(storeMock.dispatch).toHaveBeenCalledWith(
        TicketActions.moveTicket({ id: '1', status: Status.Done })
      );
    });

    it('should not dispatch if status is unchanged', () => {
      mockTicket.status = Status.Todo;
      const drop = createDrop({ item: { data: mockTicket } } as any, Status.Todo);

      component.onDrop(drop);
      expect(storeMock.dispatch).not.toHaveBeenCalled();
    });

    it('should fire confetti when dropped into Done with MouseEvent', () => {
      mockTicket.status = Status.Todo;
      const mouseEvent = new MouseEvent('drop', { clientX: 100, clientY: 200 });
      const drop = createDrop(
        { item: { data: mockTicket }, event: mouseEvent } as any,
        Status.Done
      );
      component.onDrop(drop);
      expect(confetti).toHaveBeenCalled();
    });
  });


});
