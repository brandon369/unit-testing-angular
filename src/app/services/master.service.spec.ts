import { TestBed } from '@angular/core/testing';

import { MasterService } from './master.service';
import {ValueService} from "./value.service";
import {ValueFakeService} from "./value-fake.service";

describe('MasterService', () => {
  let masterService: MasterService;
  let valueServiceSpy: jasmine.SpyObj<ValueService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ValueService', ['getValue']);
    TestBed.configureTestingModule({
      providers: [MasterService, {provide: ValueService, useValue: spy}]
    });
    masterService = TestBed.inject(MasterService);
    valueServiceSpy = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>;
  });

  it('should be created', () => {
    expect(masterService).toBeTruthy();
  });

  // it('should return "my Value" from the real service', () => {
  //   const valueService = new ValueService()
  //   const masterService = new MasterService(valueService)
  //   expect(masterService.getValue()).toBe('my value');
  // });
  //
  //
  // it('should return "valuie" from the fake service', () => {
  //   const fakeValueService = new ValueFakeService()
  //   const masterService = new MasterService(fakeValueService as unknown as ValueService)
  //   expect(masterService.getValue()).toBe('fake value');
  // });
  //
  // it('should return "valuie" from the fake service', () => {
  //   const fake = { getValue:()=>'fake from obj' }
  //   const masterService = new MasterService(fake as ValueService)
  //   expect(masterService.getValue()).toBe('fake from obj');
  // });

  it('should call to getValue from ValueService', () => {
    valueServiceSpy.getValue.and.returnValue('fake value')
    expect(masterService.getValue()).toBe('fake value')
    // masterService.getValue();
    expect(valueServiceSpy.getValue).toHaveBeenCalled();

  });



});
