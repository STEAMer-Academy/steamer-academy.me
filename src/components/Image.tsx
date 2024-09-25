// src/components/Image.tsx
import React from 'react';

type Layout = 'responsive' | 'intrinsic' | 'fixed' | 'fill';
type ObjectFit = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';

type ImageProps = {
  src: string;
  alt: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  loading?: 'lazy' | 'eager';
  layout?: Layout;
  objectFit?: ObjectFit;  // New objectFit prop
};

const Image: React.FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  loading = 'lazy',
  layout = 'responsive',  // Default layout
  objectFit = 'cover',    // Default objectFit
}) => {
  const styles = {
    responsive: {
      maxWidth: '100%',
      height: 'auto',
      objectFit: objectFit,
    },
    intrinsic: {
      width: width,
      height: height,
      objectFit: objectFit,
    },
    fixed: {
      width: width,
      height: height,
      objectFit: objectFit,
    },
    fill: {
      width: '100%',
      height: '100%',
      objectFit: objectFit,
    },
  };

  return (
    <img
      src={src}
      alt={alt}
      width={layout !== 'fill' ? width : undefined}
      height={layout !== 'fill' ? height : undefined}
      className={className}
      loading={loading}
      style={styles[layout]}  // Apply dynamic styles based on layout and objectFit
    />
  );
};

export default Image;

