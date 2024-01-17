import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {TokenService} from "./token.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {Product} from "../models/product.model";
import {generateManyProducts} from "../models/product.mock";
import {environment} from "../../environments/environment";
import {Auth} from "../models/auth.model";

describe('AuthService', () => {
  let authService: AuthService;
  let tokenService: TokenService
  let httpControler: HttpTestingController


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        TokenService,
      ]
    });
    authService = TestBed.inject(AuthService);
    httpControler = TestBed.inject(HttpTestingController);
    tokenService = TestBed.inject(TokenService);
  });

  afterEach(() => {
    httpControler.verify();
  })

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  describe('test for login', () => {
    it('should return a token', () => {

      const mockData: Auth = {
        access_token: '121212'
      }

      const email = 'email@mail.com'
      const password = '123'

      authService.login(email,password)
        .subscribe((data) => {
          expect(data).toEqual(mockData)
          //doneFn();
        });

      // http config
      const url = `${environment.API_URL}/api/v1/auth/login`;
      const req = httpControler.expectOne(url);
      req.flush(mockData);


    })



    it('should call token service', () => {

      const mockData: Auth = {
        access_token: '121212'
      }
      spyOn(tokenService, "saveToken").and.callThrough()

      const email = 'email@mail.com'
      const password = '123'

      authService.login(email,password)
        .subscribe((data) => {
          expect(tokenService.saveToken).toHaveBeenCalledTimes(1)
          expect(tokenService.saveToken).toHaveBeenCalledOnceWith('121212')
          //doneFn();
        });

      // http config
      const url = `${environment.API_URL}/api/v1/auth/login`;
      const req = httpControler.expectOne(url);
      req.flush(mockData);


    })



  })





});
