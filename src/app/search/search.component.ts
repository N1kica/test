import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AsyncPipe } from "@angular/common";
import { combineLatest, map, Observable, of, startWith, switchMap } from "rxjs";
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { GridItemsComponent } from "./ui/grid-items.component";

export interface Product {
  uid?: string;
  name?: string;
  description?: string;
  image?: string;
  model?: string;
  price?: string;
}

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [AsyncPipe, GridItemsComponent],
  template: `
    <div class="flex justify-center items-center h-80 bg-search text-white mx-[-2rem]">
      <h1>SEARCH</h1>
    </div>
    <app-grid-items class="grid gap-6 py-8 mx-auto max-w-screen-2xl" [products]="products$ | async" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent {
  private store = inject(AngularFirestore);
  private storage = inject(AngularFireStorage);
  
  products$: Observable<Product[] | null> = this.store.collection<Product>('products').valueChanges().pipe(
    switchMap((products) => {
      return products.length > 0
        ? combineLatest(products.map(product => this.storage.ref(product.image!).getDownloadURL().pipe(
          map(image => ({
            ...product,
            image: image,
          }))
        )))
        : // if there are no products selected, return falsy, so we can show
        // "empty selection"
        of(null);
    }),
    // return a skeleton by default, to prevent "empty selection" as well
    // as provide an ability to introduce ghost design.
    startWith([{},{},{}])
  );
}
