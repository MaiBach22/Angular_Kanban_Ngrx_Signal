import { CreateTicketComponent } from './create-ticket.component';
import {DialogRef} from '@angular/cdk/dialog';

describe('CreateTicketComponent', () => {
  let component: CreateTicketComponent;
  let dialogRefMock: jest.Mocked<DialogRef<any>>

  beforeEach(() => {
  dialogRefMock = {
    close: jest.fn()
  } as any

    component = new CreateTicketComponent(dialogRefMock);
  });

  it('should initialize with empty title and description', () => {
    expect(component.title()).toBe('');
    expect(component.description()).toBe('')
  });

  it('should close the dialog without data when close() is called', () => {
    component.close();
    expect(dialogRefMock.close).toHaveBeenCalledWith();
  });


  it('should not close with ticket data if title is empty', () => {
    component.title.set('');
    component.description.set('Some description');
    component.submit();
    expect(dialogRefMock.close).not.toHaveBeenCalled();
  });

  it('should close with ticket data if title is provided', () => {
    component.title.set('New Ticket');
    component.description.set('Some description');
    component.submit();
    expect(dialogRefMock.close).toHaveBeenCalledWith({
      title: 'New Ticket',
      description: 'Some description'
    });
  });

  it('should trim title before submitting', () => {
    component.title.set('   Trimmed Ticket   ');
    component.description.set('Description');
    component.submit();
    expect(dialogRefMock.close).toHaveBeenCalledWith({
      title: 'Trimmed Ticket',
      description: 'Description'
    });
  })

});
