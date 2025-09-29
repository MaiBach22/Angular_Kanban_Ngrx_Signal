import { createFeatureSelector, createSelector } from "@ngrx/store";
import { selectAllTickets, TicketState } from "./ticket.reducer";
import { Status } from "../models/ticket.model";

export const selectTicketState = createFeatureSelector<TicketState>('tickets');
export const allTickets = createSelector(selectTicketState, selectAllTickets);

export const ticketsByStatus = (status: Status) => createSelector(allTickets, tickets => tickets.filter(t => t.status === status));