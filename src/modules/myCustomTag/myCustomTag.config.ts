// myCustomTag.config.ts
// #section Imports
import type { TagBase, TagMode, TagSize } from './myCustomTag.d';
// #end-section
// #variable DEFAULT_TAG_PROPS
export const DEFAULT_TAG_PROPS: TagBase = {
  label: '',
  backgroundColor: '#e0e0e0',
  textColor: '#000000',
  withBorder: true,
}
// #end-variable
// #variable DEFAULT_TAG_CONFIG
export const DEFAULT_TAG_CONFIG = {
  mode: 'view' as TagMode,
  size: 'small' as TagSize
}
// #end-variable
