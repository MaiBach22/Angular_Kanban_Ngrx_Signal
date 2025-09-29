import * as moment from 'moment';

export type TicketId = string;

export enum Status {
  Backlog = 'backlog',
  Todo = 'todo',
  InProgress = 'in-progress',
  Done = 'done'
}

export interface Ticket {
  id: TicketId;
  title: string;
  description?: string;
  createdAt?: moment.Moment;
  status: Status

}

export interface TicketDialogResult {
  title: string;
  description?: string;
}