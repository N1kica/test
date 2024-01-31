import { AsyncPipe, NgFor } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { interval, map, startWith } from "rxjs";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [AsyncPipe, NgFor],
  template: `
    <div class="bg-red-500 h-10"></div>
    <div class="p-4">Timer: {{ interval$ | async }}</div>
    <button 
      (click)="true" 
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >ASD</button>

    <div class="mt-2 flex -space-x-1 overflow-hidden">
      <img *ngFor="let i of [1, 2, 3]" class="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  interval$ = interval(1000).pipe(
    map(number => number+=1),
    startWith(0)
  );
}

