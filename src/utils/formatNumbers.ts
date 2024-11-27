import { formatEther as ethersFormatEther } from '@ethersproject/units';
import { useCallback, useMemo } from 'react';

type Nullish<T> = T | null | undefined;
type NumberFormatOptions = Intl.NumberFormatOptions;

const FIVE_DECIMALS_MAX_TWO_DECIMALS_MIN: NumberFormatOptions = {
  notation: 'standard',
  maximumFractionDigits: 5,
  minimumFractionDigits: 2,
};

const NO_DECIMALS: NumberFormatOptions = {
  notation: 'standard',
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
};

const NO_DECIMALS_CURRENCY: NumberFormatOptions = {
  notation: 'standard',
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
  currency: 'USD',
  style: 'currency',
};

const THREE_DECIMALS: NumberFormatOptions = {
  notation: 'standard',
  maximumFractionDigits: 3,
  minimumFractionDigits: 3,
};

const TWO_DECIMALS: NumberFormatOptions = {
  notation: 'standard',
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
};

const SHORTHAND_ONE_DECIMAL: NumberFormatOptions = {
  notation: 'compact',
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
};

const TWO_DECIMALS_CURRENCY: NumberFormatOptions = {
  notation: 'standard',
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
  currency: 'USD',
  style: 'currency',
};

const EIGHT_DECIMALS_CURRENCY: NumberFormatOptions = {
  notation: 'standard',
  maximumFractionDigits: 8,
  minimumFractionDigits: 2,
  currency: 'USD',
  style: 'currency',
};

const SHORTHAND_CURRENCY_TWO_DECIMALS: NumberFormatOptions = {
  notation: 'compact',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  currency: 'USD',
  style: 'currency',
};

const SEVEN_SIG_FIGS__SCI_NOTATION_CURRENCY: NumberFormatOptions = {
  notation: 'scientific',
  minimumSignificantDigits: 7,
  maximumSignificantDigits: 7,
  currency: 'USD',
  style: 'currency',
};

const ONE_SIG_FIG_CURRENCY: NumberFormatOptions = {
  notation: 'standard',
  minimumSignificantDigits: 1,
  maximumSignificantDigits: 1,
  currency: 'USD',
  style: 'currency',
};

const THREE_SIG_FIGS_CURRENCY: NumberFormatOptions = {
  notation: 'standard',
  minimumSignificantDigits: 3,
  maximumSignificantDigits: 3,
  currency: 'USD',
  style: 'currency',
};

const SHORTHAND_TWO_DECIMALS: NumberFormatOptions = {
  notation: 'compact',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};

const SHORTHAND_TWO_DECIMALS_NO_TRAILING_ZEROS: NumberFormatOptions = {
  notation: 'compact',
  maximumFractionDigits: 2,
};

const SIX_SIG_FIGS_TWO_DECIMALS: NumberFormatOptions = {
  notation: 'standard',
  maximumSignificantDigits: 6,
  minimumSignificantDigits: 3,
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
};

type HardCodedInputFormat =
  | {
      input: number;
      prefix?: string;
      hardcodedOutput?: undefined;
    }
  | {
      input?: undefined;
      prefix?: undefined;
      hardcodedOutput: string;
    };

type FormatterBaseRule = { formatterOptions: NumberFormatOptions };
type FormatterExactRule = {
  upperBound?: undefined;
  exact: number;
} & FormatterBaseRule;
type FormatterUpperBoundRule = {
  upperBound: number;
  exact?: undefined;
} & FormatterBaseRule;

type FormatterRule = (FormatterExactRule | FormatterUpperBoundRule) & {
  hardCodedInput?: HardCodedInputFormat;
};

const tokenNonTxFormatter: FormatterRule[] = [
  { exact: 0, formatterOptions: NO_DECIMALS },
  {
    upperBound: 0.001,
    hardCodedInput: { input: 0.001, prefix: '<' },
    formatterOptions: THREE_DECIMALS,
  },
  { upperBound: 1, formatterOptions: THREE_DECIMALS },
  { upperBound: 1e6, formatterOptions: TWO_DECIMALS },
  { upperBound: 1e15, formatterOptions: SHORTHAND_TWO_DECIMALS },
  {
    upperBound: Infinity,
    hardCodedInput: { input: 999_000_000_000_000, prefix: '>' },
    formatterOptions: SHORTHAND_TWO_DECIMALS_NO_TRAILING_ZEROS,
  },
];

const tokenTxFormatter: FormatterRule[] = [
  { exact: 0, formatterOptions: NO_DECIMALS },
  {
    upperBound: 0.00001,
    hardCodedInput: { input: 0.00001, prefix: '<' },
    formatterOptions: FIVE_DECIMALS_MAX_TWO_DECIMALS_MIN,
  },
  { upperBound: 1, formatterOptions: FIVE_DECIMALS_MAX_TWO_DECIMALS_MIN },
  { upperBound: 10000, formatterOptions: SIX_SIG_FIGS_TWO_DECIMALS },
  { upperBound: Infinity, formatterOptions: TWO_DECIMALS },
];

const wholeNumberFormatter: FormatterRule[] = [
  { upperBound: Infinity, formatterOptions: NO_DECIMALS },
];

const fiatGasPriceFormatter: FormatterRule[] = [
  { exact: 0, formatterOptions: NO_DECIMALS_CURRENCY },
  {
    upperBound: 0.01,
    hardCodedInput: { input: 0.01, prefix: '<' },
    formatterOptions: TWO_DECIMALS_CURRENCY,
  },
  { upperBound: 1e6, formatterOptions: TWO_DECIMALS_CURRENCY },
  { upperBound: Infinity, formatterOptions: SHORTHAND_CURRENCY_TWO_DECIMALS },
];

const chartFiatValueFormatter: FormatterRule[] = [
  // if token stat value is 0, we probably don't have the data for it, so show '-' as a placeholder
  {
    exact: 0,
    hardCodedInput: { hardcodedOutput: '-' },
    formatterOptions: ONE_SIG_FIG_CURRENCY,
  },
  { upperBound: 1.05, formatterOptions: EIGHT_DECIMALS_CURRENCY },
  { upperBound: 1e6, formatterOptions: TWO_DECIMALS_CURRENCY },
  { upperBound: Infinity, formatterOptions: SHORTHAND_CURRENCY_TWO_DECIMALS },
];

const fiatTokenQuantityFormatter: FormatterRule[] = [
  { exact: 0, formatterOptions: TWO_DECIMALS_CURRENCY },
  ...fiatGasPriceFormatter,
];

const fiatTokenPricesFormatter: FormatterRule[] = [
  { exact: 0, formatterOptions: TWO_DECIMALS_CURRENCY },
  {
    upperBound: 0.00000001,
    hardCodedInput: { input: 0.00000001, prefix: '<' },
    formatterOptions: ONE_SIG_FIG_CURRENCY,
  },
  { upperBound: 1, formatterOptions: THREE_SIG_FIGS_CURRENCY },
  { upperBound: 1e6, formatterOptions: TWO_DECIMALS_CURRENCY },
  { upperBound: 1e16, formatterOptions: SHORTHAND_CURRENCY_TWO_DECIMALS },
  {
    upperBound: Infinity,
    formatterOptions: SEVEN_SIG_FIGS__SCI_NOTATION_CURRENCY,
  },
];

const tokenQuantityStatsFormatter: FormatterRule[] = [
  // if token stat value is 0, we probably don't have the data for it, so show '-' as a placeholder
  {
    exact: 0,
    hardCodedInput: { hardcodedOutput: '-' },
    formatterOptions: NO_DECIMALS,
  },
  {
    upperBound: 0.01,
    hardCodedInput: { input: 0.01, prefix: '<' },
    formatterOptions: TWO_DECIMALS,
  },
  { upperBound: 1000, formatterOptions: TWO_DECIMALS },
  { upperBound: Infinity, formatterOptions: SHORTHAND_ONE_DECIMAL },
];

export enum NumberType {
  // used for token quantities in non-transaction contexts (e.g. portfolio balances)
  TokenNonTx = 'token-non-tx',

  // used for token quantity stats where shorthand is okay (e.g. pool stats balances)
  TokenQuantityStats = 'token-quantity-stats',

  // used for token quantities in transaction contexts (e.g. swap, send)
  TokenTx = 'token-tx',

  ChartFiatValue = 'chart-fiat-value',

  // whole number formatting
  WholeNumber = 'whole-number',

  FiatTokenQuantity = 'fiat-token-quantity',

  // fiat prices everywhere except Token Details flow
  FiatTokenPrice = 'fiat-token-price',
}

type FormatterType = NumberType | FormatterRule[];
const TYPE_TO_FORMATTER_RULES = {
  [NumberType.TokenQuantityStats]: tokenQuantityStatsFormatter,
  [NumberType.TokenNonTx]: tokenNonTxFormatter,
  [NumberType.TokenTx]: tokenTxFormatter,
  [NumberType.WholeNumber]: wholeNumberFormatter,
  [NumberType.ChartFiatValue]: chartFiatValueFormatter,
  [NumberType.FiatTokenQuantity]: fiatTokenQuantityFormatter,
  [NumberType.FiatTokenPrice]: fiatTokenPricesFormatter,
};

function getFormatterRule(
  input: number,
  type: FormatterType,
  conversionRate?: number,
): FormatterRule {
  const rules = Array.isArray(type) ? type : TYPE_TO_FORMATTER_RULES[type];
  for (const rule of rules) {
    const shouldConvertInput = rule.formatterOptions.currency && conversionRate;
    const convertedInput = shouldConvertInput ? input * conversionRate : input;

    if (
      (rule.exact !== undefined && convertedInput === rule.exact) ||
      (rule.upperBound !== undefined && convertedInput < rule.upperBound)
    ) {
      return rule;
    }
  }

  throw new Error(
    `formatter for type ${type} not configured correctly for value ${input}`,
  );
}

interface FormatNumberOptions {
  input: Nullish<number>;
  type?: FormatterType;
  placeholder?: string;
  locale?: 'en-US';
  localCurrency?: 'USD';
  conversionRate?: number;
}

function formatNumber({
  input,
  type = NumberType.TokenNonTx,
  placeholder = '-',
  locale = 'en-US',
  localCurrency = 'USD',
  conversionRate,
}: FormatNumberOptions): string {
  if (input === null || input === undefined) {
    return placeholder;
  }

  const { hardCodedInput, formatterOptions } = getFormatterRule(
    input,
    type,
    conversionRate,
  );

  if (formatterOptions.currency) {
    input = conversionRate ? input * conversionRate : input;
    formatterOptions.currency = localCurrency;
    formatterOptions.currencyDisplay = 'narrowSymbol';
  }

  if (!hardCodedInput) {
    return new Intl.NumberFormat(locale, formatterOptions).format(input);
  }

  if (hardCodedInput.hardcodedOutput) {
    return hardCodedInput.hardcodedOutput;
  }

  const { input: hardCodedInputValue, prefix } = hardCodedInput;
  if (hardCodedInputValue === undefined) return placeholder;
  return (
    (prefix ?? '') +
    new Intl.NumberFormat(locale, formatterOptions).format(hardCodedInputValue)
  );
}

interface FormatCurrencyAmountOptions {
  amount: any;
  type?: FormatterType;
  placeholder?: string;
  locale?: 'en-US';
  localCurrency?: 'USD';
  conversionRate?: number;
}

function formatCurrencyAmount({
  amount,
  type = NumberType.TokenNonTx,
  placeholder,
  locale = 'en-US',
  localCurrency = 'USD',
  conversionRate,
}: FormatCurrencyAmountOptions): string {
  return formatNumber({
    input: amount ? parseFloat(amount) : undefined,
    type,
    placeholder,
    locale,
    localCurrency,
    conversionRate,
  });
}

interface FormatEtherOptions {
  input: Nullish<number | string>;
  type: FormatterType;
  locale?: 'en-US';
  localCurrency?: 'USD';
}

function formatEther({
  input,
  type,
  locale,
  localCurrency,
}: FormatEtherOptions) {
  if (input === null || input === undefined) return '-';
  return formatNumber({
    input: parseFloat(ethersFormatEther(input.toString())),
    type,
    locale,
    localCurrency,
  });
}

// Constructs an object that injects the correct locale and local currency into each of the above formatter functions.
export function useFormatter() {
  type LocalesType = 'locale' | 'localCurrency' | 'conversionRate';

  const formatEtherwithLocales = useCallback(
    (options: Omit<FormatEtherOptions, LocalesType>) =>
      formatEther({
        ...options,
        locale: 'en-US',
        localCurrency: 'USD',
      }),
    [],
  );

  const formatNumberWithLocales = useCallback(
    (options: Omit<FormatNumberOptions, LocalesType>) =>
      formatNumber({
        ...options,
        locale: 'en-US',
        localCurrency: 'USD',
        conversionRate: 0,
      }),
    [],
  );

  const formatCurrencyAmountWithLocales = useCallback(
    (options: any) =>
      formatCurrencyAmount({
        ...options,
      }),
    [],
  );

  return useMemo(
    () => ({
      formatCurrencyAmount: formatCurrencyAmountWithLocales,
      formatEther: formatEtherwithLocales,
      formatNumber: formatNumberWithLocales,
    }),
    [
      formatCurrencyAmountWithLocales,
      formatEtherwithLocales,
      formatNumberWithLocales,
    ],
  );
}
