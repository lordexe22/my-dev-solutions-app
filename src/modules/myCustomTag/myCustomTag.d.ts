/* src\modules\myCustomTag\myCustomTag.d.ts */
// #type TagSize
export type TagSize = 'small' | 'medium' | 'large';
// #end-type
// #type TagMode
export type TagMode = 'view' | 'edit';
// #end-type
// #type TagActionsType
export type TagActionsType = 
  | { type: 'ADD', payload: { data: TagBase } }
  | { type : 'REMOVE', payload: { index: number }}
  | { type: 'UPDATE', payload: { index: number, data: TagBase } }
// #end-type
// #interface TagBase
export interface TagBase {
  /** Texto visible en la etiqueta */
  label: string;
  /** Color de fondo en formato HEX, RGB o nombre CSS */
  backgroundColor?: string;
  /** Color del texto en formato HEX, RGB o nombre CSS */
  textColor?: string;
  /** Mostrar borde alrededor de la etiqueta, usa textColor como color */
  withBorder?: boolean;
  /** Icono de la etiqueta */
  icon?: string;
}
// #end-interface
// #interface TagProps
export interface TagProps {
  /** Define el modo del componente */
  mode: TagMode;
  /** Usado en modo edit: callback cuando cambia el valor */
  onChange?: (value: string) => void;
  /** Usado en modo edit: callback al confirmar edición/creación */
  onSubmit?: (value: string) => void;
  /** Usado en modo edit: callback para eliminar la etiqueta */
  onDelete?: () => void;
}
// #end-interface
