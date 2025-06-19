import React from 'react'
import Image from 'next/image'

type PropType = {
  selected: boolean
  index: number
  onClick: () => void
  src: string
  alt: string
}

export const Thumbnail: React.FC<PropType> = (props) => {
  const { selected, onClick, src, alt } = props

  return (
    <div
      className={'embla-thumbs__slide'.concat(
        selected ? ' embla-thumbs__slide--selected' : ''
      )}
    >
      <button
        onClick={onClick}
        type="button"
        className="embla-thumbs__slide__number"
        style={{
          padding: 0,
          border: 'none',
          background: 'none',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image
          src={src}
          alt={alt}
          width={80}
          height={48}
          style={{
            borderRadius: 8,
            objectFit: 'cover',
            border: selected ? '2px solid #f1a01e' : '2px solid transparent',
            boxShadow: selected ? '0 0 0 2px #fdba51' : undefined,
            transition: 'border 0.2s, box-shadow 0.2s',
            width: '100%',
            height: 'auto',
          }}
        />
      </button>
    </div>
  )
}
