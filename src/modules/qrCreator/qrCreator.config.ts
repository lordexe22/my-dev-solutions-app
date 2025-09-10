// src\modules\qrCreator\qrCreator.config.ts

import QRCodeStyling from 'qr-code-styling'
import type { Options } from 'qr-code-styling';

export const defaultConfigOptions: Options = {
  type: 'svg', // 'canvas' | 'svg'
  shape: 'square', // 'square' | 'circle'
  width: 250,
  height: 250,
  margin: 10,
  data: undefined, // empty input
  image: undefined, // no image
  dotsOptions:{
    type: 'square',
    color: 'black',
    gradient: undefined,
    roundSize: undefined
  },
  cornersSquareOptions: {
    type: 'square',
    color: 'black',
    gradient: undefined
  }
}

export const defaultCustomConfigOptions = {
  colorStyle: 'single'
}

/** qrCode */
export const qrCode = new QRCodeStyling(defaultConfigOptions);