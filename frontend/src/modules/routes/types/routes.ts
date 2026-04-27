export interface NavItem {
  id: number;
  name: string;
  route: string;
  icon: string;
  routeOrder?: number | null;
}

export interface NavResponse {
  navigation: NavItem[];
}
