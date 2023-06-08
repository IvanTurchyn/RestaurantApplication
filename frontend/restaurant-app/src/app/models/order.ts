import { User } from './user';
import {MenuPosition} from "./menu-positions";


export enum OrderStatus {
  IN_PROGRESS = "IN_PROGRESS",
  READY_FOR_PICKUP = "READY_FOR_PICKUP"
}

export interface Order {
  id: string;
  client: User;
  items: MenuPosition[];
  status: OrderStatus;
}
