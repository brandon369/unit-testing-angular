import {Component} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../models/product.model";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  products: Product[] = [];

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productService.getAllSimple().subscribe(res => {
      this.products = res
    })
  }

   limpiarJSON(jsonString: string): string | null {
    try {
      const data = JSON.parse(jsonString);

      if (Array.isArray(data) && data.length > 0) {
        return data[0];
      } else {
        return null;
      }
    } catch (error) {
      // Si la cadena no es un JSON válido, se maneja el error
      return null;
    }
  }


}
