import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    loadComponent: () =>
      import("./home/home.component").then((m) => m.HomeComponent)
  },
  {
    path: "search",
    loadComponent: () =>
      import("./search/search.component").then((m) => m.SearchComponent)
  },
  {
    path: "product",
    loadComponent: () =>
      import("./product/product.component").then((m) => m.ProductComponent)
  },
  {
    path: "product/:uid",
    loadComponent: () =>
      import("./product/product.component").then((m) => m.ProductComponent)
  },
];
