import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { DayEvents } from 'src/app/models/day.events';

@Component({
  selector: 'app-add-events',
  templateUrl: './add-events.component.html',
  styleUrls: ['./add-events.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddEventsComponent{

  newDayEvent: FormGroup;
  dayEventsType = [
    { key: 'fiesta', value: 'Праздничные дни' },
    { key: 'sessions', value: 'Мероприятия' },
    { key: 'other', value: 'Пометки / Другое'},
  ];

  get eventName(): AbstractControl {
    return this.newDayEvent.get('eventName');
  }

  get eventType(): AbstractControl {
    return this.newDayEvent.get('eventType');
  }

  get budget(): AbstractControl {
    return this.newDayEvent.get('budget');
  }

  get address(): AbstractControl {
    return this.newDayEvent.get('address');
  }

  get time(): AbstractControl {
    return this.newDayEvent.get('time');
  }

  get note(): AbstractControl {
    return this.newDayEvent.get('note');
  }

  constructor(
    public dialogRef: MatDialogRef<AddEventsComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DayEvents,
  ) {
    this.newDayEvent = this.formBuilder.group({
      eventName: new FormControl(this.data?.name || null),
      eventType: new FormControl(this.data?.type || this.dayEventsType[0].key),
      budget: new FormControl(this.data?.budget || null),
      address: new FormControl(this.data?.address || null),
      time: new FormControl(this.data?.time || null),
      note: new FormControl(this.data?.note || null),
    });
    // this.eventType.valueChanges
    //   .subscribe(value => {
    //     this.changeControls(value);
    //   });
  }

  changeControlsValidators(evType: string): void {
    this.clearFormValidators();
    this.eventName.setValidators([Validators.required]);

    switch(evType) {
      case 'fiesta':
        this.budget.setValidators([Validators.required]);
        this.updateFormValidators();
        break;
      case 'sessions':
        this.address.setValidators([Validators.required]);
        this.time.setValidators([Validators.required]);
        this.updateFormValidators();
        break;
      case 'other':
        this.note.setValidators([Validators.required]);
        this.updateFormValidators();
        break;
    }
  }

  clearFormValidators(): void {
    this.budget.clearValidators();
    this.address.clearValidators();
    this.time.clearValidators();
    this.note.clearValidators();
  }

  updateFormValidators(): void {
    this.eventName.updateValueAndValidity();
    this.budget.updateValueAndValidity();
    this.address.updateValueAndValidity();
    this.time.updateValueAndValidity();
    this.note.updateValueAndValidity();
  }

  getControls(formGroup: FormGroup): any {
    return formGroup.controls;
  }

  showError(formGroup: FormGroup, fieldName: string): boolean {
    return this.getControls(formGroup)[fieldName]
              && this.getControls(formGroup)[fieldName].invalid
              && (this.getControls(formGroup)[fieldName].touched || this.getControls(formGroup)[fieldName].dirty);
  }

  getErrorMessage(formField) {
    switch (formField) {
      case 'eventName':
        const eventNameErrors = this.getControls(this.newDayEvent).eventName.errors;
        if (eventNameErrors.required) {
          return 'Не указано название события';
        }
        break;
      // case 'eventType':
      //   const eventTypeErrors = this.getControls(this.newDayEvent).eventType.errors;
      //   if (eventTypeErrors.required) {
      //     return 'Не указано тип события';
      //   }
      //   break;
      case 'budget':
        const budgetErrors = this.getControls(this.newDayEvent).budget.errors;
        if (budgetErrors.required) {
          return 'Не указано бюджет события';
        }
      case 'address':
        const addressErrors = this.getControls(this.newDayEvent).address.errors;
        if (addressErrors.required) {
          return 'Не указано адрес события';
        }
        break;
      case 'time':
        const timeErrors = this.getControls(this.newDayEvent).time.errors;
        if (timeErrors.required) {
          return 'Не указано время события';
        }
        break;
      case 'note':
        const noteErrors = this.getControls(this.newDayEvent).note.errors;
        if (noteErrors.required) {
          return 'Не указано заметки события';
        }
    }
  }

  onSaveEvents(): void {
    this.changeControlsValidators(this.eventType.value);
    const formControls = this.newDayEvent.controls;

    Object.keys(formControls).forEach(field => {
      const control = formControls[field];
      control.markAsTouched({ onlySelf: true });
    });
    if (this.newDayEvent.valid) {
      const eventsFormData = this.getData(this.eventType.value);
      this.dialogRef.close(eventsFormData);
    }
  }

  getData(evType): any {
    switch(evType) {
      case 'fiesta':
        return {
          name: this.eventName.value,
          type: this.eventType.value,
          budget: this.budget.value,
        };
      case 'sessions':
        return {
          name: this.eventName.value,
          type: this.eventType.value,
          address: this.address.value,
          time: this.time.value,
        };
      case 'other':
        return {
          name: this.eventName.value,
          type: this.eventType.value,
          note: this.note.value,
        };
    }
  }
}
