import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {MenuPosition} from "./models/menu-positions";


@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private apiUrl = 'http://localhost:8080/api/menu-positions';

  constructor(private http: HttpClient) { }

  getAllMenuPositions(): Observable<MenuPosition[]> {
    return this.http.get<MenuPosition[]>(this.apiUrl);
  }

  getMenuPositionById(id: string): Observable<MenuPosition> {
    return this.http.get<MenuPosition>(`${this.apiUrl}/${id}`);
  }

  createMenuPosition(menuPosition: MenuPosition): Observable<MenuPosition> {
    return this.http.post<MenuPosition>(this.apiUrl, menuPosition);
  }

  updateMenuPosition(id: string, updatedMenuPosition: MenuPosition): Observable<MenuPosition> {
    return this.http.put<MenuPosition>(`${this.apiUrl}/${id}`, updatedMenuPosition);
  }

  deleteMenuPosition(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
