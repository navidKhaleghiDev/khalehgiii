import type { Preview } from '@storybook/react';
import { themes } from '@storybook/theming';
import '../src/App.css';
import { ModeDecorator } from './modeDecorator';
export const decorators = [ModeDecorator];

export const preview = {
  parameters: {
    darkMode: {
      default: 'light',
      dark: { ...themes.dark },
      light: { ...themes.light },
    },
  },
};

export const globalTypes = {
  scheme: {
    name: 'Scheme',
    description: 'Updating the theme',
    defaultValue: 'light',
    toolbar: {
      icon: 'mirror',
      items: ['light', 'dark'],
      dynamicTitle: true,
    },
  },
};
