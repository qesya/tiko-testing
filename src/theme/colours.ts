// COLOURS: A constant object holding color values
export const COLOURS = {
  white: '#FFFFFF',
  black: '#000000',
  primary: '#1E63EC',
  gray100: '#E3E3E3',
  gray200: '#B0B0B2',
  gray300: '#707173',
  green100: '#E3F4EA',
  green200: '#29B45F',
  red: '#FA3E3E',
  transparent: 'transparent',
};

export const colourSelector = (colour: string) =>
  `${colour}` as keyof typeof COLOURS;
