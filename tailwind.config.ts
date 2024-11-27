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
        200: 'rgb(var(--color-blue-200) / <alpha-value>)',
      },
      neutral: {
        100: 'rgb(var(--color-neutral-100) / <alpha-value>)',
        200: 'rgb(var(--color-neutral-200) / <alpha-value>)',
        300: 'rgb(var(--color-neutral-300) / <alpha-value>)',
        400: 'rgb(var(--color-neutral-400) / <alpha-value>)',
        500: 'rgb(var(--color-neutral-500) / <alpha-value>)',
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
      blink: 'blink 1.4s infinite both',
      'scale-up': 'scaleUp 500ms infinite alternate',
    },
    keyframes: {
      scaleUp: {
        '0%': { transform: 'scale(0)' },
        '100%': { transform: 'scale(1)' },
      },
    },
    letterSpacing: {
      tightest: '0.216px',
    },
    fontSize: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '30px',
      '4xl': '36px',
      '5xl': '48px',
      '6xl': '60px',
      '7xl': '72px',
      5.5: '22px',
    },
    spacing: {
      px: '1px',
      0: '0',
      0.5: '2px',
      1: '4px',
      1.5: '6px',
      2: '8px',
      2.5: '10px',
      3: '12px',
      3.5: '14px',
      4: '16px',
      5: '20px',
      6: '24px',
      7: '28px',
      8: '32px',
      9: '36px',
      10: '40px',
      11: '44px',
      12: '48px',
      14: '56px',
      16: '64px',
      20: '80px',
      24: '96px',
      28: '112px',
      32: '128px',
      36: '144px',
      40: '160px',
      44: '176px',
      48: '192px',
      52: '208px',
      56: '224px',
      60: '240px',
      64: '256px',
      72: '288px',
      80: '320px',
      96: '384px',
    },
    extend: {
      padding: {
        2.7: '11px',
      },
      maxWidth: {
        'screen-xl': 'var(--container-width)',
      },
      lineHeight: {
        3: '12px',
        4: '16px',
        5: '20px',
        6: '24px',
        6.5: '26px',
        7: '28px',
        8: '32px',
        9: '36px',
        10: '40px',
      },
      borderRadius: ({ theme }) => ({
        ...theme('spacing'),
        md: '6px',
        lg: '8px',
        xl: '12px',
        '4xl': '32px',
        circle: '50%',
      }),
      borderWidth: ({ theme }) => ({
        1: '1px',
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
