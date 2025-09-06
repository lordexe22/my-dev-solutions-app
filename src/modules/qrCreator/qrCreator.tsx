// src\modules\qrCreator\qrCreator.tsx

// src\modules\qrCreator\qrCreator.tsx

import { useEffect, useRef, useState } from 'react'
import QRCodeStyling from 'qr-code-styling'
import style from './qrCreator.module.css'
import CollapsibleContainer from '../collapsibleContainer/collapsibleContainer';

const QRCreator = () => {
  // #state (url, setUrl) - the URL to encode in the QR code
  const [url, setUrl] = useState('')
  // #end-state
  // #state (width, setWidth) - the width of the QR code
  const [width, setWidth] = useState(250)
  // #end-state
  // #state (height, setHeight) - the height of the QR code
  const [height, setHeight] = useState(250)
  // #end-state

  const qrRef = useRef<HTMLDivElement | null>(null)
  const qrCode = useRef(
    new QRCodeStyling({
      width: 250,
      height: 250,
      type: "svg",
      data: "",
      dotsOptions: {
        color: "#000",
        type: "rounded"
      },
      backgroundOptions: {
        color: "#fff"
      }
    })
  )

  useEffect(() => {
    if (qrRef.current) {
      qrCode.current.append(qrRef.current)
    }
  }, [])

  useEffect(() => {
    qrCode.current.update({
      data: url,
      width,
      height
    })
  }, [url, width, height])

  return (
    <>
      <div className={style.container}>
        {/* #section options-menu - show the configuration options */}
        <div className={style['options-menu']}>
          <CollapsibleContainer title="Basic Options">
            <div className={style['options-group']}>
              <input
                name='url-input'
                type="text"
                placeholder="Enter URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className={style['url-input']}
              />
              <input
                type="number"
                min={100}
                max={500}
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                className={style['size-input']}
                placeholder="Width"
              />
              <input
                type="number"
                min={100}
                max={500}
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className={style['size-input']}
                placeholder="Height"
              />
            </div>
          </CollapsibleContainer>
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

/** #info
 * useRef permite hacer referencia a un elemento del DOM o a un valor que persiste entre renderizados sin causar un nuevo renderizado 
 * cuando cambia. En este caso se usa para referenciar el contenedor del código QR en el DOM (ver <div ref={qrRef}></div>) y para mantener la instancia de QRCodeStyling.
 * En otras palabras, la libreria QRCodeStyling pasa a tener el control total del elemento del DOM referenciado por qrRef y puede manipularlo directamente
 * al modificar sus propiedades.
 */