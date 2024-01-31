import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [RouterLink],
  template: `
    <nav class="fixed flex z-50 w-full bg-white px-6 h-20 border-b border-slate-300">
      <img src="assets/svg/logo.svg" height="100" width="100" class="cursor-pointer" routerLink="">
    </nav>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {}
