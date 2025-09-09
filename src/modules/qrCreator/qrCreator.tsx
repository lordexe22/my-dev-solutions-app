// src\modules\qrCreator\qrCreator.tsx

// #section Imports
// import { useEffect, useRef, useState } from 'react'
import style from './qrCreator.module.css'
import CollapsibleContainer from '../collapsibleContainer/collapsibleContainer';
import { useQRCreator } from './qrCreator.hooks';
// #end-section

// #component QRCreator
const QRCreator = () => {

  // #hook useQRCreator
  const {
    url, setUrl,
    width, setWidth,
    height, setHeight,
    margin, setMargin,
    setImage,
    dotsStyle, setDotsStyle,
    colorType, setColorType,
    dotsColor, setDotsColor,
    gradientType, setGradientType,
    gradientColors, setGradientColors,
    rotation, setRotation,
    cornersSquareStyle, setCornersSquareStyle,
    cornersSquareColor, setCornersSquareColor,
    cornersSquareColorType, setCornersSquareColorType,
    cornersSquareGradientType, setCornersSquareGradientType,
    cornersSquareGradientColors, setCornersSquareGradientColors,
    cornersSquareRotation, setCornersSquareRotation,
    cornerSquareRotationRef,
    qrRef,
    qrCode,
    rotationRef,
  } = useQRCreator()
  // #end-hook


  return (
    <>
      <div className={style.container}>
        {/* #section options-menu */}
        <div className={style['options-menu']}>
          {/* #section Basic Options */}
          <CollapsibleContainer title="Basic Options">
            <div className={style['options-group']}>
              {/* #section URL input */}
              <label>
                URL
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
                Width
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'space-around' }}>
                  <input
                    type="range"
                    min={100}
                    max={350}
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value))}
                    className={style['size-input']}
                  />
                  <div style={{ minWidth: '40px', textAlign: 'right' }}>{width} px</div>
                </div>
              </label>
              {/* #end-section */}
              {/* #section height input */}
              <label>
                Height
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'space-around' }}>
                  <input
                    type="range"
                    min={100}
                    max={350}
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className={style['size-input']}
                  />
                  <div style={{ minWidth: '40px', textAlign: 'right' }}>{height} px</div>
                </div>
              </label>
              {/* #end-section */}
              {/* #section margin input */}
              <label>
                Margin
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'space-around' }}>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={margin}
                    onChange={(e) => setMargin(Number(e.target.value))}
                    className={style['size-input']}
                  />
                  <div style={{ minWidth: '40px', textAlign: 'right' }}>{margin} px</div>
                </div>
              </label>
              {/* #end-section */}
              {/* #section image input */}
              <label>
                Center Image:
                <div style={{display:'flex', }}>
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
                  <button 
                    onClick={() => setImage(undefined)}
                  >remove</button>
                </div>
              </label>
              {/* #end-section */}
            </div>
          </CollapsibleContainer>
          {/* #end-section */}
          {/* #section Dots Options */}
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
          {/* #section Corners Square Options */}
          <CollapsibleContainer title="Corners Square Options">
            <div className={style['options-group']}>
              {/* #section corners square style */}
              <label>
                Corner Square Style:
                <select
                  value={cornersSquareStyle}
                  onChange={(e) =>
                    setCornersSquareStyle(
                      e.target.value as
                        | 'square'
                        | 'dot'
                        | 'extra-rounded'
                        | 'classy'
                        | 'classy-rounded'
                    )
                  }
                >
                  <option value="square">Square</option>
                  <option value="dot">Dot</option>
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
                  value={cornersSquareColorType}
                  onChange={(e) =>
                    setCornersSquareColorType(e.target.value as 'single' | 'gradient')
                  }
                >
                  <option value="single">Single Color</option>
                  <option value="gradient">Color Gradient</option>
                </select>
              </label>
              {/* #end-section */}
              {/* #section single color */}
              {cornersSquareColorType === 'single' && (
                <label>
                  Corner Square Color:
                  <input
                    type="color"
                    value={cornersSquareColor}
                    onChange={(e) => setCornersSquareColor(e.target.value)}
                  />
                </label>
              )}
              {/* #end-section */}
              {/* #section gradient type */}
              {cornersSquareColorType === 'gradient' && (
                <label>
                  Gradient type:
                  <select
                    value={cornersSquareGradientType}
                    onChange={(e) =>
                      setCornersSquareGradientType(e.target.value as 'linear' | 'radial')
                    }
                  >
                    <option value="linear">Linear</option>
                    <option value="radial">Radial</option>
                  </select>
                </label>
              )}
              {/* #end-section */}
              {/* #section gradient colors */}
              {cornersSquareColorType === 'gradient' && (
                <label>
                  Gradient colors:
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <input
                      type="color"
                      value={cornersSquareGradientColors[0]}
                      onChange={(e) =>
                        setCornersSquareGradientColors([
                          e.target.value,
                          cornersSquareGradientColors[1],
                        ])
                      }
                    />
                    <input
                      type="color"
                      value={cornersSquareGradientColors[1]}
                      onChange={(e) =>
                        setCornersSquareGradientColors([
                          cornersSquareGradientColors[0],
                          e.target.value,
                        ])
                      }
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setCornersSquareGradientColors([
                          cornersSquareGradientColors[1],
                          cornersSquareGradientColors[0],
                        ])
                      }
                      style={{ border: 'none', fontSize: '1.5rem' }}
                    >
                      🔄
                    </button>
                  </div>
                </label>
              )}
              {/* #end-section */}
              {/* #section rotation */}
              {cornersSquareColorType === 'gradient' &&
                cornersSquareGradientType === 'linear' && (
                  <label>
                    Rotation:
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <input
                        type="range"
                        min={0}
                        max={360}
                        value={cornersSquareRotation}
                        onChange={(e) => {
                          const value = Number(e.target.value)
                          setCornersSquareRotation(value)
                          cornerSquareRotationRef.current = value
                          qrCode.current.update({
                            cornersSquareOptions: {
                              type: cornersSquareStyle,
                              gradient: {
                                type: cornersSquareGradientType,
                                rotation: (value * Math.PI) / 180,
                                colorStops: [
                                  { offset: 0, color: cornersSquareGradientColors[0] },
                                  { offset: 1, color: cornersSquareGradientColors[1] },
                                ],
                              },
                            },
                          })
                        }}
                        className={style['size-input']}
                      />
                      <div style={{ minWidth: '30px', maxWidth: '30px' }}>
                        {cornersSquareRotation}°
                      </div>
                    </div>
                  </label>
                )}
              {/* #end-section */}
            </div>
          </CollapsibleContainer>
          {/* #end-section */}

        </div>
        {/* #end-section */}
        {/* #section display-qr-section */}
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
