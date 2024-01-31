import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { map, Observable, switchMap } from "rxjs";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { AsyncPipe, NgIf } from "@angular/common";
import { ActivatedRoute } from "@angular/router";

interface Product {
  uid?: string;
  name?: string;
  description?: string;
  image?: string;
  model?: string;
  price?: string;
}
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NgIf, AsyncPipe],
  template: `
    <ng-container *ngIf="product$ | async as product; else loading">
      <ng-container *ngIf="product.uid; else error">
        <p>uid: {{  product.uid  }}</p>
        <p>name: {{ product.name }}</p>
        <p>model: {{ product.model }}</p>
        <p>description: {{ product.description }}</p>
      </ng-container>
      <ng-template #error>
        product doesn't exist!
      </ng-template>
    </ng-container>
    <ng-template #loading>
      <div class="grid gap-2 m-1">
        <div class="h-4 w-64 bg-gray-300 rounded-lg animate-pulse"></div>
        <div class="h-4 w-1/2 bg-gray-300 rounded-lg animate-pulse"></div>
        <div class="h-4 w-1/4 bg-gray-300 rounded-lg animate-pulse"></div>
        <div class="h-4 bg-gray-300 rounded-lg animate-pulse"></div>
      </div>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent {
  private store = inject(AngularFirestore);
  private storage = inject(AngularFireStorage);
  private route = inject(ActivatedRoute);

  product$: Observable<Product | undefined> = this.route.params.pipe(
    switchMap(params =>
      this.store.collection('products').doc<Product>(params['uid']).snapshotChanges().pipe(
        map(snapshot =>
          snapshot.payload.exists ? snapshot.payload.data() : {}
        )
      )
    )
  );
}
