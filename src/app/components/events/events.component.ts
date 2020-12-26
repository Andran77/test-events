import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEventsComponent } from 'src/app/modals/add-events/add-events.component';
import { DayEvents } from '../../models/day.events';
import { EventsService } from '../../services/events.service'

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EventsComponent implements OnInit {

  actualEvents: DayEvents[];

  constructor(
    private eventsService: EventsService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.eventsService.dayEvents.subscribe((data) => {
      this.actualEvents = data;
    });
  }

  deleteEvents(actualEvent: DayEvents): void {
    this.eventsService.deleteEvents(actualEvent.id, actualEvent.date);
  }

  editEvents(actualEvent: DayEvents): void {
    const dialogRef = this.dialog.open(AddEventsComponent, {
      data: actualEvent,
    });

    dialogRef.afterClosed().subscribe(editedEvent => {
      if (editedEvent) {
        this.editDayEvent(actualEvent, editedEvent);
      }
    });
  }

  editDayEvent(actualEvent: DayEvents, editedEvent: any): void {
    const newEvent = {
      id: actualEvent.id,
      date: actualEvent.date,
      ...editedEvent,
    };
    this.eventsService.editEvents(newEvent);
  }
}
