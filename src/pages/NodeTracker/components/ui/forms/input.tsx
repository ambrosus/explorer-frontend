import cn from 'clsx';
import { forwardRef } from 'react';

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label?: string;
  error?: string;
  className?: string;
  useUppercaseLabel?: boolean;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, type = 'text', className, ...props }, ref) => (
    <div>
      <label>
        {label && (
          <span className={cn('block font-medium')}>
            {label}
            {props.required && (
              <sup className="inline-block text-[13px] text-red-500 ltr:ml-1 rtl:mr-1">
                *
              </sup>
            )}
          </span>
        )}
        <input
          type={type}
          ref={ref}
          {...props}
          className={cn(
            'w-full bg-white rounded-[82px] px-4 py-2.7 text-black-600 placeholder:text-black-600/60 border border-solid border-black-600/10 text-base transition focus:outline-none',
            className,
            {
              'invalid:border-alert-100 invalid:bg-alert-5': error,
            },
          )}
        />
      </label>
      {error && (
        <span role="alert" className="mt-2 block">
          {error}
        </span>
      )}
    </div>
  ),
);

Input.displayName = 'Input';
export default Input;
