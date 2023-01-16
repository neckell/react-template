import { spacing } from './_spacing';

const gap = spacing['spacing-6'];

// SI SE AGREGA UN NUEVO BREAKPOINT HAY QUE AGREGAR LA FUNCION DE MEDIA QUERY PARA ESE NUEVO BREAKPOINT
export const breakpoints = {
  xxs: {
    size: '0px',
    columns: 4,
    gap: gap,
    min: '0px',
    max: '767px',
  },
  xs: {
    size: '768px',
    columns: 8,
    gap: gap,
    min: '768px',
    max: '1023px',
  },
  s: {
    size: '1024px',
    columns: 8,
    gap: gap,
    min: '1024px',
    max: '1279px',
  },
  m: {
    size: '1280px',
    columns: 8,
    gap: gap,
    min: '1280px',
    max: '1365px',
  },
  l: {
    size: '1366px',
    columns: 12,
    gap: gap,
    min: '1366px',
    max: '1599px',
  },
};
