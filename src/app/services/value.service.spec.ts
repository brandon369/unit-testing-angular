import {TestBed} from '@angular/core/testing';

import {ValueService} from './value.service';
import {waitForAsync} from "@angular/core/testing";

describe('ValueService', () => {
  let service: ValueService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValueService]
    });
    service = TestBed.inject(ValueService)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  describe('Test for getValue', () => {
    it('Should return "my value"', () => {
      expect(service.getValue()).toBe('my value');
    });
  });

  describe('Test for setValue', () => {
    it('Should change the value', () => {
      expect(service.getValue()).toBe('my value');
      service.setValue('change');
      expect(service.getValue()).toBe('change');
    });
  });

  describe('Test for getPromiseValue', () => {
    it('Should return "value" from promise', (doneFn) => {
      service.getPromiseValue()
        .then((value) => {
          expect(value).toBe('value');
          doneFn();
        });
    });

    it('Should return "value" from promise using async', async () => {
      const rta = await service.getPromiseValue();
      expect(rta).toBe('value');
    });
  });

  describe('Tests for getObservableValue', () => {
    //AAA
    it('should return "observable value" from a promise', waitForAsync(() => {
      service.getObservableValue().subscribe(
        {
          next: (v) => expect(v).toBe('observable value')
        }
      )
    }))
  });

});
