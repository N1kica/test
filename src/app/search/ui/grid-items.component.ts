import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Product } from "../search.component";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-grid-items',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink],
  template: `
    <ng-container *ngFor="let product of products">
      <div class="grid grid-cols-1 sm:grid-cols-[1fr_2fr] items-center sm:items-start gap-8 bg-white px-10 py-8 rounded-xl group">
        <div class="flex justify-center items-center h-[200px] rounded-2xl {{ product.uid ? 'animate-fade' : 'w-full bg-gray-300 animate-pulse m-auto' }}">
          <img *ngIf="product.uid" [src]="product.image" [routerLink]="['/product', product.uid]" class="transition-transform hover:scale-110 max-h-[200px] cursor-pointer"/>
        </div>
        <div *ngIf="product.uid; else loading" class="lg:flex h-full">
          <div class="mb-4">
            <h4>{{ product.name }}</h4>
            <h2>{{ product.model }}</h2>
            <p>{{ product.description }}</p>
          </div>
          <div class="flex flex-col items-center sm:items-start lg:items-end gap-4 justify-between">
            <h3 class="text-teal-500 font-bold sm:text-right self-start lg:self-end">{{ product.price }}</h3>
            <button
              class="transition-[opacity,background,color] opacity-0 group-hover:opacity-100 hover:text-white hover:bg-neutral-500 duration-500 border-slate-500 text-slate-700"
              [routerLink]="['/product', product.uid]"
            >Više</button>
          </div>
        </div>
      </div>
    </ng-container>
    <ng-template #loading>
      <div class="lg:flex h-full">
        <div class="mb-4 flex-grow">
          <div class="h-4 w-64 bg-gray-300 rounded-lg animate-pulse mb-2"></div>
          <div class="h-8 w-1/2 bg-gray-300 rounded-lg animate-pulse mb-8"></div>
          <div class="h-4 w-1/4 bg-gray-300 rounded-lg animate-pulse mb-2"></div>
          <div class="h-12 w-full bg-gray-300 rounded-lg animate-pulse"></div>
        </div>
        <div class="mt-2 h-6 w-20 bg-gray-300 rounded-lg animate-pulse mb-2"></div>
      </div>  
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridItemsComponent {
  @Input({ required: true }) products?: Product[] | null;
}
