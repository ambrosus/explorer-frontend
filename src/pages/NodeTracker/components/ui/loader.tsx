import cn from 'clsx';

export type LoaderSizeTypes = 'large' | 'medium' | 'small';
export type LoaderVariantTypes = 'blink' | 'scaleUp';
export interface LoaderTypes
  extends React.HTMLAttributes<HTMLDivElement | HTMLSpanElement> {
  tag?: 'div' | 'span';
  size?: LoaderSizeTypes;
  variant?: LoaderVariantTypes;
  showOnlyThreeDots?: boolean;
  className?: string;
}

const variants = {
  blink: 'animate-blink',
  scaleUp: 'animate-scale-up',
};
const sizes = {
  small: 'w-1.5 h-1.5',
  medium: 'w-2.5 h-2.5',
  large: 'w-3 h-3',
};

export default function Loader({
  tag = 'div',
  size = 'medium',
  variant = 'scaleUp',
  className,
}: LoaderTypes) {
  let Component = tag;
  return (
    <Component className={cn('flex gap-2', className)}>
      <span
        className={cn(
          'bg-neutral-100 rounded-full',
          variants[variant],
          sizes[size],
        )}
      />
      <span
        className={cn(
          'animation-delay-200 bg-neutral-100 rounded-full',
          variants[variant],
          sizes[size],
        )}
      />
      <span
        className={cn(
          'animation-delay-500 bg-neutral-100 rounded-full',
          variants[variant],
          sizes[size],
        )}
      />
    </Component>
  );
}
