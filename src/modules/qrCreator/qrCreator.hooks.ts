// src\modules\qrCreator\qrCreator.hooks.ts

// #section Imports
import { useEffect, useRef, useState, type RefObject } from 'react'
import { qrCode } from './qrCreator.config';
import type { ColorType } from './qrCreator.d'
import type { DotType, GradientType, Gradient, CornerSquareType, CornerDotType } from 'qr-code-styling';
// #end-section

// #hook useQRContainerRef
/**
 * Create and manage a reference for the DOM element that will contain the QR code.
 *
 * This hook initializes a container reference and appends the QR code when the component mounts.
 * It is required for updating or re-rendering the QR code when its data or styles change.
 *
 * @returns {{
 *   qrContainerRef: RefObject<HTMLDivElement>
 * }} A reference to the QR code container element.
 */
export const useQRContainerRef = () => {
  const qrContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (qrContainerRef.current) {
      qrContainerRef.current.innerHTML = ''
      qrCode.append(qrContainerRef.current)
    }
  }, [])

  return {
    qrContainerRef
  }
}
// #end-hook
// #hook useBasicOptions
/**
 * Manage the basic options for the QR code: data, width, height, and margin.
 *
 * This hook exposes state setters for each option and automatically re-renders
 * the QR code inside the provided container when any of them change.
 *
 * @param {Object} params
 * @param {RefObject<HTMLDivElement | null>} params.qrContainerRef - Reference to the container where the QR code will be rendered.
 *
 * @returns {{
 *   data: string | undefined,
 *   setData: Dispatch<SetStateAction<string | undefined>>,
 *   width: number,
 *   setWidth: Dispatch<SetStateAction<number>>,
 *   height: number,
 *   setHeight: Dispatch<SetStateAction<number>>,
 *   margin: number,
 *   setMargin: Dispatch<SetStateAction<number>>
 * }} The current QR options and their setters.
 */
export const useBasicOptions = ({ qrContainerRef }: { qrContainerRef: RefObject<HTMLDivElement | null> }) => {
  // #state [data, setData]
  const [data, setData] = useState<string | undefined>(qrCode._options.data);
  // #end-state
  // #state [width, setWidth]
  const [width, setWidth] = useState<number>(qrCode._options.width);
  // #end-state
  // #state [height, setHeight]
  const [height, setHeight] = useState<number>(qrCode._options.height);
  // #end-state
  // #state [margin, setMargin]
  const [margin, setMargin] = useState<number>(qrCode._options.margin);
  // #end-state
  // #event updateQRCode
  useEffect(() => {
    // #step 1 - check container existence
    if (!qrContainerRef.current) return
    // #end-step
    // #step 2 - clear container
    qrContainerRef.current.innerHTML = '' // limpiar contenedor
    // #end-step
    // #step 3 - update QR code options
    qrCode.update?.({ data, width, height, margin })
    // #end-step
    // #step 4 - render QR code
    qrCode.append(qrContainerRef.current)
    // #end-step
  }, [data, width, height, margin, qrContainerRef])
  // #end-event
  // #section return
  return {
    data, setData,
    width, setWidth,
    height, setHeight,
    margin, setMargin
  }
  // #end-section
}
// #end-hook
// #hook useDotsOptions
/**
 * Manage the dot options for the QR code: type, color, and gradient.
 *
 * @param {Object} params
 * @param {RefObject<HTMLDivElement | null>} params.qrContainerRef - Container for the QR code.
 *
 * @returns {Object} Dot options and their setters.
 */
export const useDotsOptions = ({ qrContainerRef }: { qrContainerRef: RefObject<HTMLDivElement | null> }) => {
  // #state [dotType, setDotType]
  const [dotType, setDotType] = useState<DotType>(qrCode._options.dotsOptions.type)
  // #end-state
  // #state [colorType, setColorType]
  const [colorType, setColorType] = useState<ColorType>('single')
  // #end-state
  // #state [dotColor, setDotColor]
  const [dotColor, setDotColor] = useState<string>(qrCode._options.dotsOptions.color)
  // #end-state
  // #state [gradientType, setGradientType]
  const [gradientType, setGradientType] = useState<GradientType>('linear')
  // #end-state
  // #state [gradientColors, setGradientColors]
  const [gradientColors, setGradientColors] = useState<string[]>(['#000000', '#008000'])
  // #end-state
  // #state [gradientRotation, setGradientRotation]
  const [gradientRotation, setGradientRotation] = useState<number>(0)
  // #end-state
  // #event updateDotsOptions
  useEffect(() => {
    // #step 1 - check container existence
    if (!qrContainerRef.current) return
    // #end-step
    // #step 2 - clear container
    qrContainerRef.current.innerHTML = ''
    // #end-step
    // #step 3 - construct dotsOptions object
    const dotsOptions: Partial<typeof qrCode._options.dotsOptions> = { type: dotType }

    if (colorType === 'single') {
      dotsOptions.color = dotColor
      dotsOptions.gradient = undefined
    } else if (colorType === 'gradient') {
      const gradient: Gradient = {
        type: gradientType,
        rotation: gradientRotation * Math.PI / 180,
        colorStops: gradientColors.map((color, index) => ({
          offset: index / (gradientColors.length - 1),
          color
        }))
      }
      dotsOptions.gradient = gradient
      dotsOptions.color = undefined
    }
    // #end-step-buildDotsOptions
    // #step 4 - update and render QR code
    qrCode.update?.({ dotsOptions })
    qrCode.append(qrContainerRef.current)
    // #end-step
  }, [dotType, colorType, dotColor, gradientType, gradientColors, gradientRotation, qrContainerRef])
  // #end-event
  // #section return
  return {
    dotType, setDotType,
    colorType, setColorType,
    dotColor, setDotColor,
    gradientType, setGradientType,
    gradientColors, setGradientColors,
    gradientRotation, setGradientRotation
  }
  // #end-section
}
// #end-hook
// #hook useCornersSquareOptions
/**
 * Manage the corner square options for the QR code: type, color, and gradient.
 *
 * @param {Object} params
 * @param {RefObject<HTMLDivElement | null>} params.qrContainerRef - Container for the QR code.
 *
 * @returns {Object} Corner square options and their setters.
 */
export const useCornersSquareOptions = ({ qrContainerRef }: { qrContainerRef: RefObject<HTMLDivElement | null> }) => {
  // #state [CSType, setCSType]
  const [CSType, setCSType] = useState<CornerSquareType | 'none'>(
    qrCode._options.cornersSquareOptions?.type || 'square'
  )
  // #end-state
  // #state [CSColorType, setCSColorType]
  const [CSColorType, setCSColorType] = useState<ColorType>('single') 
  // #end-state
  // #state [CSColor, setCSColor]
  const [CSColor, setCSColor] = useState<string>(qrCode._options.cornersSquareOptions?.color || '#000000')
  // #end-state
  // #state [CSGradientType, setCSGradientType]
  const [CSGradientType, setCSGradientType] = useState<'linear' | 'radial'>('linear')
  // #end-state
  // #state [CSGradientColors, setCSGradientColors]
  const [CSGradientColors, setCSGradientColors] = useState<string[]>(['#000000', '#008000'])
  // #end-state
  // #state [CSGradientRotation, setCSGradientRotation]
  const [CSGradientRotation, setCSGradientRotation] = useState<number>(0)
  // #end-state
  // #event updateCornersSquareOptions
  useEffect(() => {
    // #step 1 - check container existence
    if (!qrContainerRef.current) return
    // #end-step
    // #step 2 - clear container
    qrContainerRef.current.innerHTML = ''
    // #end-step
    // #step 3 - construct cornersOptions object
    const cornersOptions = qrCode._options.cornersSquareOptions ? { ...qrCode._options.cornersSquareOptions } : {}

    cornersOptions.type = CSType === 'none' ? undefined : CSType

    if (CSColorType === 'single') {
      cornersOptions.color = CSColor
      cornersOptions.gradient = undefined
    } else if (CSColorType === 'gradient') {
      cornersOptions.gradient = {
        type: CSGradientType,
        rotation: CSGradientRotation * Math.PI / 180, 
        colorStops: CSGradientColors.map((color, index) => ({
          offset: index / (CSGradientColors.length - 1),
          color
        }))
      }
      cornersOptions.color = undefined
    }
    // #end-step
    // #step 4 - update and render QR code
    qrCode.update?.({ cornersSquareOptions: cornersOptions })
    qrCode.append(qrContainerRef.current)
    // #end-step
  }, [CSType, CSColorType, CSColor, CSGradientType, CSGradientColors, CSGradientRotation, qrContainerRef])
  // #end-event
  // #section return
  return {
    CSType, setCSType, 
    CSColorType, setCSColorType, 
    CSColor, setCSColor, 
    CSGradientType, setCSGradientType, 
    CSGradientColors, setCSGradientColors,
    CSGradientRotation, setCSGradientRotation
  }
  // #end-section
}
// #end-hook
// #hook useCornersDotOptions
/**
 * Manage the corner dot options for the QR code: type, color, and gradient.
 *
 * @param {Object} params
 * @param {RefObject<HTMLDivElement | null>} params.qrContainerRef - Container for the QR code.
 *
 * @returns {Object} Corner dot options and their setters.
 */
export const useCornersDotOptions = ({ qrContainerRef }: { qrContainerRef: RefObject<HTMLDivElement | null> }) => {
  // #state [CDType, setCDType]
  const [CDType, setCDType] = useState<CornerDotType | 'none'>(
    qrCode._options.cornersDotOptions?.type ?? 'square'
  )
  // #end-state
  // #state [CDColorType, setCDColorType]
  const [CDColorType, setCDColorType] = useState<ColorType>(
    qrCode._options.cornersDotOptions?.gradient ? 'gradient' : 'single'
  )
  // #end-state
  // #state [CDColor, setCDColor]
  const [CDColor, setCDColor] = useState<string>(
    qrCode._options.cornersDotOptions?.color ?? '#000000'
  )
  // #end-state
  // #state [CDGradientType, setCDGradientType]
  const [CDGradientType, setCDGradientType] = useState<GradientType>('linear')
  // #end-state
  // #state [CDGradientColors, setCDGradientColors]
  const [CDGradientColors, setCDGradientColors] = useState<string[]>(['#000000', '#008000'])
  // #end-state
  // #state [CDGradientRotation, setCDGradientRotation]
  const [CDGradientRotation, setCDGradientRotation] = useState<number>(0)
  // #end-state
  // #event updateCornersDotOptions
  useEffect(() => {
    // #step 1 - check container existence
    if (!qrContainerRef.current) return
    // #end-step
    // #step 2 - clear container
    qrContainerRef.current.innerHTML = ''
    // #end-step
    // #step 3 - construct cornersDotOptions object
    const cornersDotOptions = qrCode._options.cornersDotOptions
      ? { ...qrCode._options.cornersDotOptions }
      : {}

    cornersDotOptions.type = CDType === 'none' ? undefined : CDType

    if (CDColorType === 'single') {
      cornersDotOptions.color = CDColor
      cornersDotOptions.gradient = undefined
    } else if (CDColorType === 'gradient') {
      cornersDotOptions.color = undefined
      cornersDotOptions.gradient = {
        type: CDGradientType,
        rotation: CDGradientType === 'linear' ? (CDGradientRotation * Math.PI) / 180 : undefined,
        colorStops: CDGradientColors.map((color, index) => ({
          offset: index / (CDGradientColors.length - 1),
          color,
        })),
      }
    }
    // #end-step
    // #step 4 - update and render QR code
    qrCode.update?.({ cornersDotOptions })
    qrCode.append(qrContainerRef.current)
    // #end-step
  }, [CDType, CDColorType, CDColor, CDGradientType, CDGradientColors, CDGradientRotation, qrContainerRef])
  // #end-event
  // #section return
  return {
    CDType, setCDType,
    CDColorType, setCDColorType,
    CDColor, setCDColor,
    CDGradientType, setCDGradientType,
    CDGradientColors, setCDGradientColors,
    CDGradientRotation, setCDGradientRotation
  }
  // #end-section
}
// #end-hook

