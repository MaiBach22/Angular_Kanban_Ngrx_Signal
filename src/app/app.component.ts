import { Component } from '@angular/core';
import { KanbanBoardComponent } from "./kanban-board/kanban-board.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [KanbanBoardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'kanban';
}
