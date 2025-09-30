import {Meta, StoryObj} from '@storybook/angular';
import {TicketCardComponent} from './ticket-card.component';
import {Status} from '../models/ticket.model';


const meta: Meta<TicketCardComponent> = {
  title: 'Kanban/TicketCard',
  component: TicketCardComponent,
  tags: ['autodocs'],
}

export default meta;
type Story = StoryObj<TicketCardComponent>;

export const Default: Story = {
  args:{
    ticket:{
      id: '1',
      title: 'Implement authentication',
      description: 'Set up user authentication using JWT.',
      status: Status.Backlog
    }
  }
}
