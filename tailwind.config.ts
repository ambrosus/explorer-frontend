import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  safelist: [
    {
      pattern: /bg|text-(success|info|warning|orange|danger|gray)-(100)/, // You can display all the colors that you need
      variants: [],
    },
  ],
  theme: {
    colors: ({ colors }) => ({
      white: colors.white,
      current: colors.current,
      transparent: colors.transparent,
      success: {
        100: 'rgb(var(--color-success) / <alpha-value>)',
      },
      warning: {
        100: 'rgb(var(--color-warning) / <alpha-value>)',
      },
      orange: {
        100: 'rgb(var(--color-orange) / <alpha-value>)',
      },
      danger: {
        100: 'rgb(var(--color-danger) / <alpha-value>)',
      },
      info: {
        100: 'rgb(var(--color-info) / <alpha-value>)',
      },
      gray: {
        100: 'rgb(var(--color-gray) / <alpha-value>)',
      },
      blue: {
        100: 'rgb(var(--color-blue-100) / <alpha-value>)',
      },
      neutral: {
        100: 'rgb(var(--color-neutral-100) / <alpha-value>)',
        200: 'rgb(var(--color-neutral-200) / <alpha-value>)',
        300: 'rgb(var(--color-neutral-300) / <alpha-value>)',
      },
      black: {
        100: 'rgb(var(--color-black-100) / <alpha-value>)',
        200: 'rgb(var(--color-black-200) / <alpha-value>)',
        300: 'rgb(var(--color-black-300) / <alpha-value>)',
        400: 'rgb(var(--color-black-400) / <alpha-value>)',
        500: 'rgb(var(--color-black-500) / <alpha-value>)',
        600: 'rgb(var(--color-black-600) / <alpha-value>)',
        700: 'rgb(var(--color-black-700) / <alpha-value>)',
      },
    }),
    boxShadow: {
      button:
        '0px 1px 3px 0px rgba(47, 43, 67, 0.10), 0px -1px 0px 0px rgba(47, 43, 67, 0.10) inset',
    },
    animation: {
      blink: 'blink 1.4s infinite both;',
      'scale-up': 'scaleUp 500ms infinite alternate',
    },
    keyframes: {
      scaleUp: {
        '0%': { transform: 'scale(0)' },
        '100%': { transform: 'scale(1)' },
      },
    },
    extend: {
      padding: {
        2.7: '11px',
      },
      maxWidth: {
        'screen-xl': 'var(--container-width)',
      },
      lineHeight: {
        6.5: '1.625rem',
      },
      borderRadius: ({ theme }) => ({
        ...theme('spacing'),
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '4xl': '32px',
        circle: '50%',
      }),
      fontFamily: {
        inter: ['var(--font-inter)'],
      },
      borderWidth: ({ theme }) => ({
        1: '1px',
      }),
      fontSize: ({ theme }) => ({
        ...theme('spacing'),
        5.5: '1.375rem',
      }),
      width: ({ theme }) => ({
        ...theme('spacing'),
        container: 'var(--container-width)',
      }),
    },
  },
  corePlugins: {
    container: false,
  },
  plugins: [],
};
export default config;
