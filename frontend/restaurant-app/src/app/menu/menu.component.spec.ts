import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuComponent } from './menu.component';
import { of } from 'rxjs';
import {MenuService} from "../menu.service";
import {MenuPosition} from "../models/menu-positions";

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let mockMenuService: any;

  beforeEach(async () => {
    mockMenuService = jasmine.createSpyObj(['getAllMenuPositions', 'createMenuPosition', 'updateMenuPosition', 'deleteMenuPosition']);
    await TestBed.configureTestingModule({
      declarations: [ MenuComponent ],
      providers: [
        { provide: MenuService, useValue: mockMenuService }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAllMenuPositions on init', () => {
    mockMenuService.getAllMenuPositions.and.returnValue(of([]));
    component.ngOnInit();
    expect(mockMenuService.getAllMenuPositions).toHaveBeenCalled();
  });

  it('should call createMenuPosition when createMenuPosition is called', () => {
    const newMenuPosition: MenuPosition = { id: '1', name: 'Test', description: 'Test', price: 10 };
    mockMenuService.createMenuPosition.and.returnValue(of(newMenuPosition));
    component.createMenuPosition(newMenuPosition);
    expect(mockMenuService.createMenuPosition).toHaveBeenCalledWith(newMenuPosition);
  });
});

