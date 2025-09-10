import { useEffect, useRef, useState, type RefObject } from 'react'
import { qrCode } from './qrCreator.config';
import type { ColorType } from './qrCreator.d'
import type { DotType, GradientType, Gradient, CornerSquareType } from 'qr-code-styling';

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
  const [data, setData] = useState<string | undefined>(qrCode._options.data);
  const [width, setWidth] = useState<number>(qrCode._options.width);
  const [height, setHeight] = useState<number>(qrCode._options.height);
  const [margin, setMargin] = useState<number>(qrCode._options.margin);

  useEffect(() => {
    if (!qrContainerRef.current) return

    qrContainerRef.current.innerHTML = '' // limpiar contenedor

    qrCode.update?.({
      data,
      width,
      height,
      margin,
    })

    qrCode.append(qrContainerRef.current) // renderizar QR
  }, [data, width, height, margin, qrContainerRef])

  return {
    data, setData,
    width, setWidth,
    height, setHeight,
    margin, setMargin
  }
}
// #end-hook
// #hook useDotsOptions
export const useDotsOptions = ({ qrContainerRef }: { qrContainerRef: RefObject<HTMLDivElement | null> }) => {
  const [dotType, setDotType] = useState<DotType>(qrCode._options.dotsOptions.type)
  const [colorType, setColorType] = useState<ColorType>('single')
  const [dotColor, setDotColor] = useState<string>(qrCode._options.dotsOptions.color)
  const [gradientType, setGradientType] = useState<GradientType>('linear')
  const [gradientColors, setGradientColors] = useState<string[]>(['#000000', '#008000'])

  useEffect(() => {
    if (!qrContainerRef.current) return

    qrContainerRef.current.innerHTML = '' // limpiar contenedor

    const dotsOptions: Partial<typeof qrCode._options.dotsOptions> = { type: dotType }

    if (colorType === 'single') {
      dotsOptions.color = dotColor
      dotsOptions.gradient = undefined // limpiar gradiente si existía
    } else if (colorType === 'gradient') {
      const gradient: Gradient = {
        type: gradientType,
        colorStops: gradientColors.map((color, index) => ({
          offset: index / (gradientColors.length - 1),
          color
        }))
      }
      dotsOptions.gradient = gradient
      dotsOptions.color = undefined // limpiar color plano si existía
    }

    qrCode.update?.({ dotsOptions })
    qrCode.append(qrContainerRef.current)
  }, [dotType, colorType, dotColor, gradientType, gradientColors, qrContainerRef])

  return {
    dotType, setDotType,
    colorType, setColorType,
    dotColor, setDotColor,
    gradientType, setGradientType,
    gradientColors, setGradientColors
  }
}

// #end-hook
// #hook useCornersSquareOptions
export const useCornersSquareOptions = ({ qrContainerRef }: { qrContainerRef: RefObject<HTMLDivElement | null> }) => {
  const [CSType, setCSType] = useState<CornerSquareType | 'none'>(
    qrCode._options.cornersSquareOptions?.type || 'square'
  )
  const [CSColorType, setCSColorType] = useState<ColorType>('single') 
  const [CSColor, setCSColor] = useState<string>(qrCode._options.cornersSquareOptions?.color || '#000000')
  const [CSGradientType, setCSGradientType] = useState<'linear' | 'radial'>('linear')
  const [CSGradientColors, setCSGradientColors] = useState<string[]>(['#000000', '#008000'])

  useEffect(() => {
    if (!qrContainerRef.current) return

    qrContainerRef.current.innerHTML = '' // limpiar contenedor

    const cornersOptions = qrCode._options.cornersSquareOptions ? { ...qrCode._options.cornersSquareOptions } : {}

    // Tipo de corner
    cornersOptions.type = CSType === 'none' ? undefined : CSType

    // Color
    if (CSColorType === 'single') {
      cornersOptions.color = CSColor
      cornersOptions.gradient = undefined
    } else if (CSColorType === 'gradient') {
      cornersOptions.gradient = {
        type: CSGradientType,
        colorStops: CSGradientColors.map((color, index) => ({
          offset: index / (CSGradientColors.length - 1),
          color
        }))
      }
      cornersOptions.color = undefined
    }

    qrCode.update?.({ cornersSquareOptions: cornersOptions })
    qrCode.append(qrContainerRef.current)
  }, [CSType, CSColorType, CSColor, CSGradientType, CSGradientColors, qrContainerRef])

  return {
    CSType, setCSType, 
    CSColorType, setCSColorType, 
    CSColor, setCSColor, 
    CSGradientType, setCSGradientType, 
    CSGradientColors, setCSGradientColors
  }
}
// #end-hook


