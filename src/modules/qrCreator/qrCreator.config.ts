// src\modules\qrCreator\qrCreator.config.ts

import QRCodeStyling from 'qr-code-styling'
import type { Options, DownloadOptions } from 'qr-code-styling';

export const defaultConfigOptions: Options = {
  type: 'canvas', // 'canvas' | 'svg'
  shape: 'square', // 'square' | 'circle'
  width: 250,
  height: 250,
  margin: 10,
  data: '', // empty input
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
  },
  cornersDotOptions: {
    type: 'square',
    color: 'black',
    gradient: undefined
  },
  backgroundOptions:{
    color: 'white',
    gradient: undefined,
    round: undefined
  },
  image: undefined,
  imageOptions: {
    saveAsBlob: undefined,
    hideBackgroundDots: undefined,
    imageSize: 1,
    margin: 0,
    crossOrigin: undefined, // 'anonymous' | 'use-credentials' | undefined
  },
  qrOptions:{
    typeNumber: 0,
    mode: 'Byte', 
    errorCorrectionLevel: 'M', 
  },
}

export const defaultCustomConfigOptions = {
  colorStyle: 'single'
}

export const defaultDownloadOptions: DownloadOptions = {
  name: 'qr-code',
  extension: 'png', // "svg" | "png" | "jpeg" | "webp"
}

/** qrCode */
export const qrCode = new QRCodeStyling(defaultConfigOptions);