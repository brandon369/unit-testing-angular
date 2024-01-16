import {TestBed} from '@angular/core/testing';
import {ProductService} from "./product.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {CreateProductDTO, Product, UpdateProductDTO} from "../models/product.model";
import {environment} from "../../environments/environment";
import {generateManyProducts, generateOneProduct} from "../models/product.mock";
import {HttpStatusCode} from "@angular/common/http";

describe('ProductService', () => {
  let productService: ProductService
  let httpControler: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });
    productService = TestBed.inject(ProductService);
    httpControler = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpControler.verify();
  })

  it('should be created', () => {
    expect(productService).toBeTruthy();
  });

  describe('test for getAllSimple', () => {
    it('should return a product list', () => {
      const mockData: Product[] = generateManyProducts(2)

      productService.getAllSimple()
        .subscribe((data) => {
          //Assert
          expect(data.length).toEqual(mockData.length);
          //doneFn();
        });

      // http config
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpControler.expectOne(url);
      req.flush(mockData);


    })

  })


  describe('test for getAll', () => {
    it('should return a product list', () => {
      const mockData: Product[] = generateManyProducts(3)

      productService.getAll()
        .subscribe((data) => {
          //Assert
          expect(data.length).toEqual(mockData.length);
          // expect(data).toEqual(mockData)
          //doneFn();
        });

      // http config
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpControler.expectOne(url);
      req.flush(mockData);


    })
    it('should return product list with taxes', () => {
      const mockData: Product[] = [
        {
          ...generateOneProduct(),
          price: 100, // 100 * .19 = 19
        },
        {
          ...generateOneProduct(),
          price: 200, // 200 * .19 = 38
        },
        {
          ...generateOneProduct(),
          price: 0, // 200 * .19 = 38
        },
        {
          ...generateOneProduct(),
          price: -100, // 200 * .19 = 38
        }
      ]
      productService.getAll()
        .subscribe((data) => {
          //Assert
          expect(data.length).toEqual(mockData.length);
          expect(data[0].taxes).toEqual(19);
          expect(data[1].taxes).toEqual(38);
          expect(data[2].taxes).toEqual(0);
          expect(data[3].taxes).toEqual(0);
          //doneFn();
        });

      // http config
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpControler.expectOne(url);
      req.flush(mockData);

    })


    it('should send query params limit 10 and offset 3', () => {
      const mockData: Product[] = generateManyProducts(3)
      const limit = 10
      const offset = 3

      productService.getAll(limit, offset)
        .subscribe((data) => {
          //Assert
          expect(data.length).toEqual(mockData.length);
          //doneFn();
        });

      // http config
      const url = `${environment.API_URL}/api/v1/products?limit=${limit}&offset=${offset}`;
      const req = httpControler.expectOne(url);
      req.flush(mockData);

      const params = req.request.params;
      expect(params.get('limit')).toEqual(`${limit}`);
      expect(params.get('offset')).toEqual(`${offset}`);


    })


  })


  describe('test for create', () => {

    it('sould return a new product', (doneFn) => {
      const mockData = generateOneProduct()
      const dto: CreateProductDTO = {
        title: 'new Product',
        price: 100,
        images: ['img'],
        description: 'bla',
        categoryId: 12
      }

      productService.create({...dto}).subscribe(data => {
        expect(data).toEqual(mockData)
        doneFn()
      })

      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpControler.expectOne(url);
      req.flush(mockData);
      expect(req.request.body).toEqual(dto)
      expect(req.request.method).toEqual('POST')

    })
  })

  describe('test for update', () => {

    it('sould update a  product', (doneFn) => {
      const mockData = generateOneProduct()
      const dto: UpdateProductDTO = {
        title: 'new Product',
      }

      productService.update(mockData.id, {...dto}).subscribe(data => {
        expect(data).toEqual(mockData)
        doneFn()
      })

      const url = `${environment.API_URL}/api/v1/products/${mockData.id}`;
      const req = httpControler.expectOne(url);
      req.flush(mockData);
      expect(req.request.body).toEqual(dto)
      expect(req.request.method).toEqual('PUT')

    })
  })
  describe('test for delete', () => {

    it('sould delete a  product', (doneFn) => {
      const mockData = true
      const productId = '1'


      productService.delete(productId).subscribe(data => {
        expect(data).toEqual(true)
        doneFn()
      })

      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpControler.expectOne(url);
      req.flush(mockData);
      expect(req.request.method).toEqual('DELETE')

    })
  })


  describe('test getOne', () => {

    it('should return a product', (doneFn) => {
      // Arrange
      const mockData: Product = generateOneProduct();
      const id = '1';
      // Act
      productService.getOne(id).subscribe((data) => {
        // Assert
        expect(data).toEqual(mockData);
        doneFn();
      });
      //http config
      const url = `${environment.API_URL}/api/v1/products/${id}`;
      const req = httpControler.expectOne(url);
      req.flush(mockData);
      expect(req.request.method).toEqual('GET');
    });

    it('should return the right msg when the status code is 404', (doneFn) => {
      // Arrange
      const id = '1';
      const msgError = '404 message';
      const mockError = {
        status: HttpStatusCode.NotFound,
        statusText: msgError,
      };
      // Act
      productService.getOne(id).subscribe({
        error: (error) => {
          // assert
          expect(error).toEqual('El producto no existe');
          doneFn();
        },
      });
      //http config
      const url = `${environment.API_URL}/api/v1/products/${id}`;
      const req = httpControler.expectOne(url);
      req.flush(msgError, mockError);
      expect(req.request.method).toEqual('GET');
    });

    it('should return the right msg when the status code is 409', (doneFn) => {
      // Arrange
      const id = '1';
      const msgError = '409 message';
      const mockError = {
        status: HttpStatusCode.Conflict,
        statusText: msgError,
      };
      // Act
      productService.getOne(id).subscribe({
        error: (error) => {
          // assert
          expect(error).toEqual('Algo esta fallando en el server');
          doneFn();
        },
      });
      //http config
      const url = `${environment.API_URL}/api/v1/products/${id}`;
      const req = httpControler.expectOne(url);
      req.flush(msgError, mockError);
      expect(req.request.method).toEqual('GET');
    });

    it('should return the right msg when the status code is 401', (doneFn) => {
      // Arrange
      const id = '1';
      const msgError = '409 message';
      const mockError = {
        status: HttpStatusCode.Unauthorized,
        statusText: msgError,
      };
      // Act
      productService.getOne(id).subscribe({
        error: (error) => {
          // assert
          expect(error).toEqual('No estas permitido');
          doneFn();
        },
      });
      //http config
      const url = `${environment.API_URL}/api/v1/products/${id}`;
      const req = httpControler.expectOne(url);
      req.flush(msgError, mockError);
      expect(req.request.method).toEqual('GET');
    });
  })

});

