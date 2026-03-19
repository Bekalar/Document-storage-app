export interface NavItem {
  id: number;
  name: string;
  route: string;
  icon: string;
  order?: number | null;
}

export interface NavResponse {
  navigation: NavItem[];
}
