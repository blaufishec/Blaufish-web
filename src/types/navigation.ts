export type NavView =
  | 'inicio'
  | 'quienes-somos'
  | 'responsabilidad-social'
  | 'productos'
  | 'calidad-producto'
  | 'distribucion'
  | 'cadena-frio'
  | 'trazabilidad'
  | 'certificaciones'
  | 'contacto';

export interface SubCategory {
  id: NavView;
  title: string;
  description: string;
}

export interface NavCategory {
  id: string;
  title: string;
  subcategories?: SubCategory[];
}
