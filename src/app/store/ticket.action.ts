import { createAction, props } from "@ngrx/store";
import { Status } from "../models/ticket.model";

export const createTicket = createAction(
    '[Ticket] create',
    props<{title:string; description?: string}>()

);

export const moveTicket = createAction(
    '[Ticket] move',
    props<{id: string; status: Status}>()
)