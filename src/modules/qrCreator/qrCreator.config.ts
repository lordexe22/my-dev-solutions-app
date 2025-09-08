// src\modules\qrCreator\qrCreator.config.ts

import QRCodeStyling from "qr-code-styling"


export const qrCodeConfig = new QRCodeStyling({
  // #section basicOptions
  width: 200,
  height: 200,
  type: "svg", // 'canvas' | 'svg'
  margin: 0,
  data: undefined,
  image: undefined,
  // #end-section
  // #section dotsOptions
  dotsOptions:{
    type: "square",
    color: '#ff0000',
    roundSize: undefined,
    gradient: undefined
  },
  // #end-section
})