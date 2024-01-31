import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Product } from "../search.component";

@Component({
  selector: 'app-list-items',
  standalone: true,
  imports: [],
  template: `
    <p>list-items works!</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListItemsComponent {
  @Input({ required: true }) products?: Product[] | null;
}
