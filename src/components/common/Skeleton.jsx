import React from 'react';

const SkeletonComponent = ({ className = '', variant = 'text', width, height }) => {
  const variants = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
    card: 'rounded-2xl',
  };

  const style = {
    width: width || '100%',
    height: height || (variant === 'text' ? '1rem' : 'auto'),
  };

  return (
    <div
      className={`animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] shimmer ${variants[variant]} ${className}`}
      style={style}
    />
  );
};

export const CardSkeleton = () => (
  <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
    <div className="flex items-start justify-between">
      <div className="space-y-2 flex-1">
        <SkeletonComponent className="h-6 w-3/4" variant="text" />
        <SkeletonComponent className="h-4 w-1/2" variant="text" />
      </div>
      <SkeletonComponent className="h-8 w-20" variant="rectangular" />
    </div>
    <SkeletonComponent className="h-4 w-full" variant="text" />
    <SkeletonComponent className="h-4 w-2/3" variant="text" />
    <div className="flex gap-2 pt-2">
      <SkeletonComponent className="h-6 w-16" variant="rectangular" />
      <SkeletonComponent className="h-6 w-16" variant="rectangular" />
      <SkeletonComponent className="h-6 w-16" variant="rectangular" />
    </div>
  </div>
);

export const Skeleton = SkeletonComponent;
export default SkeletonComponent;
