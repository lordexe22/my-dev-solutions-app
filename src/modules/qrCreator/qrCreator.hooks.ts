// src\modules\qrCreator\qrCreator.hooks.ts
// #section Imports
import { useEffect, useRef, useState } from 'react'
import { qrCodeConfig } from './qrCreator.config'
import type { DotsStylesType } from './qrCreator.d'
// #end-section
// #hook useQRCreator 
export const useQRCreator = () => {
  // #state list
  // #state [url, setUrl] - basicOption
  const [url, setUrl] = useState(qrCodeConfig._options.data)
  // #end-state
  // #state [width, setWidth] - basicOption
  const [width, setWidth] = useState(qrCodeConfig._options.width)
  // #end-state
  // #state [height, setHeight] - basicOption
  const [height, setHeight] = useState(qrCodeConfig._options.height)
  // #end-state
  // #state [margin, setMargin] - basicOption
  const [margin, setMargin] = useState(qrCodeConfig._options.margin)
  // #end-state
  // #state [image, setImage] - basicOption
  const [image, setImage] = useState(qrCodeConfig._options.image)
  // #end-state

  // #state [dotsStyle, setDotsStyle] - dotsOptions
  const [dotsStyle, setDotsStyle] = useState<DotsStylesType>(qrCodeConfig._options.dotsOptions.type)
  // #end-state
  // #state [dotsColor, setDotsColor] - dotsOptions
  const [dotsColor, setDotsColor] = useState(qrCodeConfig._options.dotsOptions.color)
  // #end-state
  // #state [colorType, setColorType] - dotsOptions
  const [colorType, setColorType] = useState<'single' | 'gradient'>('single')
  // #end-state
  // #state [gradientType, setGradientType] - dotsOptions
  const [gradientType, setGradientType] = useState<'linear' | 'radial'>('linear')
  // #end-state
  // #state [gradientColors, setGradientColors] - dotsOptions
  const [gradientColors, setGradientColors] = useState<[string, string]>(['#000000', '#ff0000'])
  // #end-state
  // #state [rotation, setRotation] - dotsOptions
  const [rotation, setRotation] = useState(0)
  // #end-state

  // #state [cornersSquareStyle, setCornersSquareStyle] - cornersSquareOptions
  const [cornersSquareStyle, setCornersSquareStyle] = useState(qrCodeConfig._options.cornersSquareOptions?.type)
  // #end-state
  // #state [cornersSquareColor, setCornersSquareColor] - cornersSquareOptions
  const [cornersSquareColor, setCornersSquareColor] = useState(qrCodeConfig._options.cornersSquareOptions?.color)
  // #end-state
  // #state [cornersSquareColorType, setCornersSquareColorType] - cornersSquareOptions
  const [cornersSquareColorType, setCornersSquareColorType] = useState<'single' | 'gradient'>('single')
  // #end-state
  // #state [cornersSquareGradientType, setCornersSquareGradientType] - cornersSquareOptions
  const [cornersSquareGradientType, setCornersSquareGradientType] = useState<'linear' | 'radial'>('linear')
  // #end-state
  // #state [cornersSquareGradientColors, setCornersSquareGradientColors] - cornersSquareOptions
  const [cornersSquareGradientColors, setCornersSquareGradientColors] = useState<[string, string]>(['#000000', '#ff0000'])
  // #end-state
  // #state [cornersSquareRotation, setCornersSquareRotation] - cornersSquareOptions
  const [cornersSquareRotation, setCornersSquareRotation] = useState(0)
  // #end-state
  // #end-state
  
  // #variable list
  // #variable qrRef
  const qrRef = useRef<HTMLDivElement | null>(null)
  // #end-variable
  // #variable qrCode
  const qrCode = useRef(qrCodeConfig)
  // #end-variable
  // #variable rotationRef
  const rotationRef = useRef(0)
  // #end-variable
  // #variable cornerSquareRotationRef
  const cornerSquareRotationRef = useRef(0)
  // #end-variable
  // #end-variable

  // #function list
  // #function attachQRCodeToDOM
  const attachQRCodeToDOM = () => {
    if (qrRef.current) {
      qrCode.current.append(qrRef.current)
    }
  }
  // #end-function
  // #function updateCommonQRCodeData 
  const updateCommonQRCodeData = () => {
    qrCode.current.update({
      data: url,
      width,
      height,
      margin,
      image: image || undefined
    })
  }
  // #end-function
  // #function updateDotsOptionsQRCodeData
  const updateDotsOptionsQRCodeData = () => {
    const dotsOptions: Record<string, unknown> = {
      type: dotsStyle,
      color: colorType === 'single' ? dotsColor : undefined,
      roundSize: qrCodeConfig._options.dotsOptions.roundSize,
      gradient: undefined
    }
    if (colorType === 'gradient') {
      dotsOptions.gradient = {
        type: gradientType,
        rotation: (rotationRef.current * Math.PI) / 180,
        colorStops: [
          { offset: 0, color: gradientColors[0] },
          { offset: 1, color: gradientColors[1] }
        ]
      }
    }
    qrCode.current.update({ dotsOptions })
  }
  // #end-function
  // #function updateCornerSquareQRCodeData
  const updateCornerSquareQRCodeData = () => {
    const cornersSquareOptions: Record<string, unknown> = {
      type: cornersSquareStyle,
      color: cornersSquareColor,
      gradient: undefined
    }
    if(cornersSquareColorType === 'gradient'){
      cornersSquareOptions.gradient = {
        type: cornersSquareGradientType,
        rotation: (cornerSquareRotationRef.current * Math.PI) / 180,
        colorStops: [
          { offset: 0, color: cornersSquareGradientColors[0]},
          { offset: 1, color: cornersSquareGradientColors[1]},
        ]
      }
    }
    qrCode.current.update({ cornersSquareOptions })
  }
  // #end-function

  // #event - useEffect list
  useEffect(attachQRCodeToDOM, [])
  useEffect(updateCommonQRCodeData, [width, height, margin, image, url])
  useEffect(updateDotsOptionsQRCodeData, [dotsStyle, colorType, dotsColor, gradientType, gradientColors])
  useEffect(updateCornerSquareQRCodeData, [cornersSquareStyle, cornersSquareColor, cornersSquareColorType, cornersSquareGradientType, cornersSquareGradientColors])
  // #end-event
  // #section return
  return {
    url,
    setUrl,
    width,
    setWidth,
    height,
    setHeight,
    margin,
    setMargin,
    setImage,
    dotsStyle,
    setDotsStyle,
    colorType,
    setColorType,
    dotsColor,
    setDotsColor,
    gradientType,
    setGradientType,
    gradientColors,
    setGradientColors,
    rotation,
    setRotation,
    cornersSquareStyle,
    setCornersSquareStyle,
    cornersSquareColor,
    setCornersSquareColor,
    cornersSquareColorType,
    setCornersSquareColorType,
    cornersSquareGradientType,
    setCornersSquareGradientType,
    cornersSquareGradientColors,
    setCornersSquareGradientColors,
    cornersSquareRotation,
    setCornersSquareRotation,
    cornerSquareRotationRef,
    qrRef,
    qrCode,
    rotationRef
  }
  // #end-section
}
// #end-hook