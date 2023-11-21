export interface SimpleValueKey {
  id: string;
  value: string;
}
export type AlertType = 'error' | 'warning' | 'info' | 'success';
export interface AlertRedux {
  title: string;
  type: AlertType;
  open: boolean;
}
