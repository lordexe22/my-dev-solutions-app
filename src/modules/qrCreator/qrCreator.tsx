// src\modules\qrCreator\qrCreator.tsx

// #section Imports
import { useEffect, useRef, useState } from 'react'
import QRCodeStyling from 'qr-code-styling'
import style from './qrCreator.module.css'
import CollapsibleContainer from '../collapsibleContainer/collapsibleContainer';
// #end-section

// #component QRCreator
const QRCreator = () => {
  // #state [url, setUrl] - the URL to encode in the QR code
  const [url, setUrl] = useState('')
  // #end-state
  // #state [width, setWidth] - the width of the QR code
  const [width, setWidth] = useState(250)
  // #end-state
  // #state [height, setHeight] - the height of the QR code
  const [height, setHeight] = useState(250)
  // #end-state
  // #state [margin, setMargin] - the margin around the QR code
  const [margin, setMargin] = useState(10);
  // #end-state
  // #state [image, setImage] - the URL of the image to place in the center of the QR code
  const [image, setImage] = useState('');
  // #end-state
  // #state [dotsStyle, setDotsStyle] - the style of the dots in the QR code
  const [dotsStyle, setDotsStyle] = useState<'square' | 'dots' | 'rounded' | 'extra-rounded' | 'classy' | 'classy-rounded'>('square');
  // #end-state
  // #state [colorType, setColorType] - type of coloring (single color or gradient)
  const [colorType, setColorType] = useState<'single' | 'gradient'>('single');
  // #end-state
  // #state [dotsColor, setDotsColor] - the single color for the dots
  const [dotsColor, setDotsColor] = useState('#000000');
  // #end-state
  // #state [gradientType, setGradientType] - type of gradient (linear or radial)
  const [gradientType, setGradientType] = useState<'linear' | 'radial'>('linear');
  // #end-state
  // #state [gradientColors, setGradientColors] - two colors for the gradient
  const [gradientColors, setGradientColors] = useState<[string, string]>(['#000000', '#ff0000']);
  // #end-state
  // #state [rotation, setRotation] - rotation of the gradient (solo para UI, no afecta re-render)
  const [rotation, setRotation] = useState(0);
  // #end-state

  // #variable qrRef - reference to the div element where the QR code will be rendered by using qr-code-styling library
  const qrRef = useRef<HTMLDivElement | null>(null)
  // #end-variable
  // #variable qrCode - instance of QRCodeStyling to generate and manipulate the QR code
  const qrCode = useRef(
    new QRCodeStyling({
      width,
      height,
      type: "svg",
      data: "",
      margin, 
      dotsOptions: {
        color: dotsColor,
        type: dotsStyle
      },
      backgroundOptions: {
        color: "#fff"        
      },
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 5
      },
      cornersSquareOptions:{
        color: '000',
        type: 'square'
      },
      cornersDotOptions:{
        color: '000',
        type: 'square'
      }
    })
  )
  // #end-variable

  // #variable rotationRef - mantiene el valor actual de rotación sin causar re-render
  const rotationRef = useRef(0);
  // #end-variable
  
  useEffect(() => {
    if (qrRef.current) {
      qrCode.current.append(qrRef.current)
    }
  }, [])

  useEffect(() => {
    const dotsOptions: Record<string, unknown> = {
      type: dotsStyle,
      gradient: undefined,
      color: undefined
    }

    if (colorType === 'single') {
      dotsOptions.color = dotsColor
    } else {
      dotsOptions.gradient = {
        type: gradientType,
        rotation: (rotationRef.current * Math.PI) / 180,
        colorStops: [
          { offset: 0, color: gradientColors[0] },
          { offset: 1, color: gradientColors[1] }
        ]
      }
    }

    qrCode.current.update({
      data: url,
      width,
      height,
      margin,
      image: image || undefined,
      dotsOptions
    })
  }, [url, width, height, margin, image, dotsStyle, colorType, dotsColor, gradientType, gradientColors])
  // 👆 rotation eliminado de dependencias para que no fuerce renderizado continuo

return (
    <>
      <div className={style.container}>
        {/* #section options-menu - show the configuration options */}
        <div className={style['options-menu']}>
          {/* #section Basic Options - basic configuration options for the QR code */}
          <CollapsibleContainer title="Basic Options">
            <div className={style['options-group']}>
              {/* #section URL input */}
              <label>
                URL:
                <input
                  name='url-input'
                  type="text"
                  placeholder="Enter URL"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className={style['url-input']}
                />
              </label>
              {/* #end-section */}
              {/* #section width input */}
              <label>
                Width (px)
                <input
                  type="number"
                  min={100}
                  max={500}
                  value={width}
                  onChange={(e) => setWidth(Number(e.target.value))}
                  className={style['size-input']}
                  placeholder="Width"
                />
              </label>
              {/* #end-section */}
              {/* #section height input */}
              <label>
                Height (px)
                <input
                  type="number"
                  min={100}
                  max={500}
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className={style['size-input']}
                  placeholder="Height"
                />
              </label>
              {/* #end-section */}
              {/* #section margin input */}
              <label>
                Margin (px)
                <input
                  type="number"
                  min={0}
                  max={50}
                  value={margin}
                  onChange={(e) => setMargin(Number(e.target.value))}
                  className={style['size-input']}
                  placeholder="Margin"
                />
              </label>
              {/* #end-section */}
              {/* #section image input */}
              <label>
                Center Image:
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      const objectUrl = URL.createObjectURL(file)
                      setImage(objectUrl)
                    }
                  }}
                  className={style['url-input']}
                />
              </label>
              {/* #end-section */}
            </div>
          </CollapsibleContainer>
          {/* #end-section */}
          {/* #section Dots Options - style configuration options for the QR code dots */}
          <CollapsibleContainer title="Dots Options">
            <div className={style['options-group']}>
              {/* #section dots style */}
              <label>
                Dots Style:
                <select
                  value={dotsStyle}
                  onChange={(e) => setDotsStyle(e.target.value as 'square' | 'dots' | 'rounded' | 'extra-rounded' | 'classy' | 'classy-rounded')}
                >
                  <option value="square">Square</option>
                  <option value="dots">Dots</option>
                  <option value="rounded">Rounded</option>
                  <option value="extra-rounded">Extra rounded</option>
                  <option value="classy">Classy</option>
                  <option value="classy-rounded">Classy rounded</option>
                </select>
              </label>
              {/* #end-section */}
              {/* #section color type */}
              <label>
                Color Type:
                <select
                  value={colorType}
                  onChange={(e) => setColorType(e.target.value as 'single' | 'gradient')}
                >
                  <option value="single">Single Color</option>
                  <option value="gradient">Color Gradient</option>
                </select>
              </label>
              {/* #end-section */}
              {/* #section dots color */}
              {colorType === 'single' && (
                <>
                  <label>
                    Dots Color:
                    <input
                      type="color"
                      value={dotsColor}
                      onChange={(e) => setDotsColor(e.target.value)}
                    />
                  </label>
                </>
              )}
              {/* #end-section */}
              {/* #section gradient type */}
              {colorType === 'gradient' && (
                <label>
                  Gradient type:
                  <select
                    value={gradientType}
                    onChange={(e) => setGradientType(e.target.value as 'linear' | 'radial')}
                  >
                    <option value="linear">Linear</option>
                    <option value="radial">Radial</option>
                  </select>
                </label> 
              )}
              {/* #end-section */}
              {/* #section dots color */}
              {colorType === 'gradient' && (
                <label>
                  Dots colors:
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <input
                      type="color"
                      value={gradientColors[0]}
                      onChange={(e) => setGradientColors([e.target.value, gradientColors[1]])}
                    />
                    <input
                      type="color"
                      value={gradientColors[1]}
                      onChange={(e) => setGradientColors([gradientColors[0], e.target.value])}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setGradientColors([gradientColors[1], gradientColors[0]])
                      }
                      style={{  border: 'none', fontSize: '1.5rem'}}
                    >
                    🔄
                    </button>
                  </div>
                </label>
              )}
              {/* #end-section */}
              {/* #section rotation */}
              {colorType === 'gradient' && gradientType === 'linear' && (
                <label>
                  Rotation:
                  <div style={{display: 'flex', gap: '10px'}}>
                    <input
                      type="range"
                      min={0}
                      max={360}
                      value={rotation}
                      onChange={(e) => {
                        const value = Number(e.target.value)
                        setRotation(value) // solo UI
                        rotationRef.current = value
                        qrCode.current.update({
                          dotsOptions: {
                            type: dotsStyle,
                            gradient: {
                              type: gradientType,
                              rotation: (value * Math.PI) / 180,
                              colorStops: [
                                { offset: 0, color: gradientColors[0] },
                                { offset: 1, color: gradientColors[1] }
                              ]
                            }
                          }
                        })
                      }}
                      className={style['size-input']}
                    />
                    <div style={{minWidth:'30px', maxWidth:'30px'}}>{rotation}°</div>
                  </div>
                </label>
              )}
              {/* #end-section */}
            </div>
          </CollapsibleContainer>
          {/* #end-section */}
        </div>
        {/* #end-section */}
        {/* #section display-qr-section - show the generated QR code */}
        <div className={style['display-qr-section']}>
          <div ref={qrRef}></div>
          <button>Download SVG</button>
        </div>
        {/* #end-section */}
      </div>
    </>
  )

}
export default QRCreator
// #end-component

/** #info
 * Aquí `rotation` se mantiene como estado solo para mostrar en la UI,
 * mientras que `rotationRef` guarda el valor real que se usa al actualizar el QR.
 * El `useEffect` principal ya no depende de `rotation`, evitando renders continuos.
 * El QR se actualiza inmediatamente en el `onChange` del slider sin causar re-render.
 */
