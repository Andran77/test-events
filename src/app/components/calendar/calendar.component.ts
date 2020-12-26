import { ViewChild, ViewEncapsulation } from '@angular/core';
import { Component } from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';
import { Moment } from 'moment';
import * as moment from 'moment';
import { EventsService } from '../../services/events.service';
import { MatDialog } from '@angular/material/dialog';
import { AddEventsComponent } from 'src/app/modals/add-events/add-events.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CalendarComponent {

  @ViewChild('calendar') calendar: MatCalendar<Moment>;
  selectedDate = moment();

  constructor(
    private eventsService: EventsService,
    public dialog: MatDialog,
  ) {}

  monthSelected() {
    this.eventsService.getEvents(this.selectedDate.format('YYYY-MM-DD'));
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddEventsComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addDayEvent(result);
      }
    });
  }

  addDayEvent(event) {
    const newEvent = {
      ...event,
      date: this.selectedDate.format('YYYY-MM-DD'),
      id: moment().valueOf()
    };
    this.eventsService.setEvents(newEvent);
  }
}
