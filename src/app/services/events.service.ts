import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as moment from 'moment';
import { DayEvents } from '../models/day.events';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  dayEvents = new BehaviorSubject<DayEvents[]>([]);

  someEvents: DayEvents[] = [
    { id: 1, date: moment().format('YYYY-MM-DD'), name: 'Баня', type: 'fiesta', budget: 25},
    { id: 2, date: moment().format('YYYY-MM-DD'), name: 'Домой после бани', type: 'sessions', address: '3-я улица Строителей, 25, кв. 12', time: '23:30'},
    { id: 3, date: moment().format('YYYY-MM-DD'), name: 'По дороге домой', type: 'other', note: 'Купить цветы'},
  ];

  constructor() {
    const result = this.someEvents.filter(item => item.date === moment().format('YYYY-MM-DD'));
    this.dayEvents.next(result);
  }

  getEvents(date: string): void {
    const result = this.someEvents.filter(item => item.date === date);
    this.dayEvents.next(result);
  }

  setEvents(newEvents: DayEvents): void {
    this.someEvents.push(newEvents);
    const result = this.someEvents.filter(item => item.date === newEvents.date);
    this.dayEvents.next(result);
  }

  editEvents(changedEvents: DayEvents): void {
    this.someEvents.map(item => {
      if(item.id === changedEvents.id) {
        item.name = changedEvents.name;
        item.type = changedEvents.type;
        changedEvents.budget ? item.budget = changedEvents.budget : null;
        changedEvents.address ? item.address = changedEvents.address : null;
        changedEvents.time ? item.time = changedEvents.time : null;
        changedEvents.note ? item.note = changedEvents.note : null;
      }
    });
    this.getEvents(changedEvents.date);
  }

  deleteEvents(id: number, date: string): void {
    this.someEvents = this.someEvents.filter(item => item.id !== id);
    this.getEvents(date);
  }
}
