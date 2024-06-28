import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product/product.service';
import { MatDialog } from '@angular/material/dialog';
import { DetailSaleService } from 'src/app/service/sale/detail-sale.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss']
})
export class VentasComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter<void>();
  productos: Product[] = []; // Lista de productos disponibles
  carrito: Product[] = []; // Carrito de compras

   close() {
    this.closeSidenav.emit();
  }

  constructor(
    private productService: ProductService,
    private detailSaleService: DetailSaleService // Inyecta DetailSaleService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCarrito();
  }

  loadProducts() {
    this.productService.getProducts().subscribe(
      (products: Product[]) => {
        this.productos = products;
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );
  }

  loadCarrito() {
    this.detailSaleService.getProductSale().subscribe(
      (carrito: Product[]) => {
        this.carrito = carrito;
      },
      (error) => {
        console.error('Error fetching cart items', error);
      }
    );
  }

  agregarAlCarrito(producto: Product) {
    // Añadir producto al carrito usando DetailSaleService
    this.detailSaleService.addProductSale(producto);
    console.log('Producto agregado al carrito:', producto);
  }

  eliminarDelCarrito(index: number) {
    // Eliminar producto del carrito usando DetailSaleService
    const product = this.carrito[index];
    this.detailSaleService.deleteProductSale(product._id);
    console.log('Producto eliminado del carrito:', index);
  }

  calcularTotal() {
    // Calcular el total del carrito en base al carrito actual
    return this.carrito.reduce((acc, item) => acc + item.price, 0);
  }

  pagar() {
    // Lógica para realizar el pago
    console.log('Realizar pago. Total:', this.calcularTotal());
    alert('Pago realizado con éxito. Total: ' + this.calcularTotal());
  }
}