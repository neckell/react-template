import { borderRadius } from './_borderRadius';
import { colors } from './_colors';
import { elevations } from './_elevantions';
import { opacities } from './_opacities';
import { spacing } from './_spacing';
import { textStyles } from './_textStyles';
import { breakpoints } from './_breakpoints';
import { sizesResponsive } from './_sizesResponsive';

const oldColors = {
  primary: '#2d9cdb',
  blue: {
    100: 'linear-gradient(to bottom, rgb(90, 150, 252) 1%, rgb(55, 115, 220))',
    200: 'linear-gradient(to bottom, rgb(90, 150, 252, .45) 1%, rgb(55, 115, 220, .45))',
    300: '#48cdf8',
    500: '#2d9cdb',
  },
  orange: {
    100: 'linear-gradient(to bottom, rgb(253, 188, 115) 1%, rgb(255, 165, 63))',
    200: 'linear-gradient(to bottom, rgb(253, 188, 115, .45) 1%, rgb(255, 165, 63, .45))',
    300: '#fdbc73',
    700: '#ffa53f',
  },
  red: {
    100: '#d67878',
  },
  grey: {
    300: '#f1f1f1',
    400: '#F7F7F8',
    500: '#647180',
    600: '#647180',
  },
  teal: {
    100: 'linear-gradient(to bottom, rgb(5, 233, 234), rgb(38, 203, 204))',
    200: 'linear-gradient(to bottom, rgb(5, 233, 234, .45), rgb(38, 203, 204, .45))',
    300: '#05e9ea',
    500: '#023F80',
  },
  white: {
    500: '#fafafa',
    600: '#ffffff',
  },
  black: {
    100: 'rgb(0, 0, 0, 0.26)',
    500: '#373E45',
  },
  'palette-primary-p-1-p-1': '#023F80',
  'palette-primary-p-1-p-1-02': '#d2f1f1',
  'palette-primary-p-2-p-2': '#DD2457',
  'palette-primary-p-3-p-3': '#1AAAAD',
  'palette-primary-p-4-p-4': '#FECF2F',
  'palette-primary-p-5-p-5': '#FFA53F',
  'palette-message-note-light': '#FFF4CD',
  'palette-primary-p-6-p-6': '#B6C5D5',
  'palette-primary-p-7-p-7': '#647180',
  'palette-neutral-n-1': '#373E45',
  'palette-neutral-n-2': '#647180',
  'palette-neutral-n-3': '#B6C5D5',
  'palette-neutral-n-4': '#DEE8F3',
  'palette-neutral-n-5': '#F7FAFE',
  'palette-message-error': '#DD2457',
  'palette-message-error-light': '#FFF0F4',
  'palette-message-warning': '#FECF2F',
  'palette-message-info': '#479EF8',
  'palette-message-success': '#1AAAAD',
  'palette-message-success-light': '#E0FBFD',
  'palette-buttons-primary-hover': '#002A55',
  'palette-buttons-primary-pressed': '#1AAAAD',
  'palette-buttons-primary-disabled': '#B6C5D5',
  'palette-input-disabled-text': '#647180',
  'palette-input-enabled-text': '#373E45',
  'palette-gradient-green': 'linear-gradient(to bottom, #05e9ea, #26cbcc)',
  'palette-gradient-green-hover':
    'linear-gradient(to bottom, #06e1e3, #20b9ba)',
  'palette-gradient-green-focus':
    'linear-gradient(to bottom, #05e9ea, #26cbcc)',
  'palette-gradient-green-pressed':
    'linear-gradient(to bottom, #06aaab, #20b9ba)',
  'palette-gradient-green-toggle':
    'linear-gradient(to bottom, #54c789, #10b45b)',
  'palette-gradient-blue': 'linear-gradient(to bottom, #5a96fc, #3773dc)',
  'palette-gradient-orange': 'linear-gradient(to bottom, #fdbc73 1%, #ffa53f)',
  'palette-gradient-blue-datepicker-start':
    'linear-gradient( 90deg, rgba(32, 186, 187, 0) 50%, rgba(32, 186, 187, 0.4) 50% )',
  'palette-gradient-blue-datepicker-end':
    'linear-gradient( 90deg, rgba(32, 186, 187, 0.4) 50%, rgba(32, 186, 187, 0) 50% )',
  'palette-background-cards-white': '#ffffff',
  'palette-buttons-tertiary-pressed': '#076568',
  'palette-input-link-normal': '#0A7FE4',
  'palette-input-link-hover': '#002A55',
  'palette-background-cards-grays': '#F7FAFE',
  'palette-background-datepicker': '#a9deec',
  'colores-gris-4': '#999999',
  'colores-notificaciones': '#00cccc',
  'prisma-blue': '#023F86',
  'prisma-green': '#00B0B4',
  'prisma-red': '#e51b54',
  'prisma-color-primary': '#373E45',
  'palette-background-cards': '#FFFFFF',
  'link-color': '#0A7FE4',
  'text-light-gray': '#647180',
  'text-gray': '#647180',
  'text-dark-gray': '#373E45',
  'btn-secondary-border': '#023F80',
  'btn-secondary-hover': '#002A55',
  'btn-secondary-disabled': '#B6C5D5',
  'border-row-table': '#e8e8e8',
  'border-grey-walkthrough': '#979797',
};

const sizes = {
  none: '0px',
  sm: '4px',
  md: '8px',
  lg: '16px',
};

const theme = {
  borderRadius,
  colors,
  elevations,
  oldColors,
  opacities,
  sizes,
  spacing,
  textStyles,
  breakpoints,
  sizesResponsive,
};
export default theme;
