import type { Preview } from "@storybook/react";
import "../app/globals.css";

// export const parameters = {
//   actions: { argTypesRegex: "^on[A-Z].*" },
// };

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
