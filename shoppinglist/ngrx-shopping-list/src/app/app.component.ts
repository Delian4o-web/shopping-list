import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { v4 as uuid } from "uuid";

import { ShoppingItem } from "../app/store/models/shopping-item-model";
import { AppState } from "../app/store/models/app-state.model";
import {
  AddItemAction,
  DeleteItemAction
} from "../app/store/actions/shopping.actions";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  shoppingItems: Observable<Array<ShoppingItem>>;
  newShoppingItem: ShoppingItem = { id: "", name: "" };

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.shoppingItems = this.store.select(store => store.shopping);
  }

  addItem() {
    this.newShoppingItem.id = uuid(); //generate unique id
    this.store.dispatch(new AddItemAction(this.newShoppingItem));
    this.newShoppingItem = { id: "", name: "" };
  }

  deleteItem(id: string) {
    this.store.dispatch(new DeleteItemAction(id));
  }
}
