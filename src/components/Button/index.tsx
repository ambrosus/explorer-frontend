export default function Button({
  children,
  className,
  size,
  type,
  ...props
}: ButtonProps) {
  const classNames = [
    'ui-button',
    `ui-button__${size}`,
    `ui-button__${type}`,
    ...(className ? [className] : []),
  ];

  return (
    <button className={classNames.join(' ')} {...props}>
      {children}
    </button>
  );
}

interface ButtonProps {
  children?: any;
  className?: string;
  size: 'small' | 'medium' | 'large';
  type: 'primary' | 'secondary' | 'tertiary' | 'plain';
  onClick?: (e?: any) => void;
  disabled?: boolean;
}
