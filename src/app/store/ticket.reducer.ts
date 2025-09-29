import { createReducer, on } from "@ngrx/store";
import {createEntityAdapter, EntityState} from "@ngrx/entity"
import * as TicketActions from './ticket.action'
import { Status, Ticket } from "../models/ticket.model";
import moment from 'moment';

export interface TicketState extends EntityState<Ticket>{}
export const adapter = createEntityAdapter<Ticket>();
export const initialState: TicketState = adapter.getInitialState();

export const ticketReducer = createReducer(
    initialState,
    on(TicketActions.createTicket, (state, {title, description}) => adapter.addOne({
        id: crypto.randomUUID(),
        title: title.trim(),
        description,
        createdAt: moment(),
        status: Status.Backlog
    }, state)),
    on(TicketActions.moveTicket, (state, {id, status})=>{
        console.log('Reducer moving ticket', id, 'to', status);
        return  adapter.updateOne({id, changes:{status}}, state)
    })
)

export const {selectAll: selectAllTickets} = adapter.getSelectors()