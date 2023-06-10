import { Component, OnInit } from '@angular/core';
import {MenuService} from "../menu.service";
import {MenuPosition} from "../models/menu-positions";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  menuPositions: MenuPosition[] = [];
  selectedMenuPosition: any;
  newMenuPosition: MenuPosition = {id: '', name: '', price: 0, description: ''};
  private ngUnsubscribe = new Subject<void>();

  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
    this.loadMenuPositions();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  loadMenuPositions(): void {
    this.menuService.getAllMenuPositions().pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      data => {
        this.menuPositions = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  selectMenuPosition(id: string): void {
    this.menuService.getMenuPositionById(id).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      data => {
        this.selectedMenuPosition = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  createMenuPosition(menuPosition: any): void {
    this.menuService.createMenuPosition(menuPosition).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      data => {
        this.menuPositions.push(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  updateMenuPosition(id: string, updatedMenuPosition: any): void {
    this.menuService.updateMenuPosition(id, updatedMenuPosition).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      data => {
        let existingMenuPosition = this.menuPositions.find(mp => mp.id === id);
        if (existingMenuPosition) {
          Object.assign(existingMenuPosition, data);
        } else {
          console.error(`Couldn't find menu position with id ${id}`);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteMenuPosition(id: string): void {
    this.menuService.deleteMenuPosition(id).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      () => {
        this.menuPositions = this.menuPositions.filter(mp => mp.id !== id);
      },
      error => {
        console.log(error);
      }
    );
  }
}
