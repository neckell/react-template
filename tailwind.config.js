/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        'ct-warning-2': '#b58700',
        'ct-error-2': '#b93f3f',
        'ct-error-3': '#ff7a7a'
      },
      animation: {
        'fade-in': 'fadeIn 1.5s ease-in-out',
        'bounce': 'bounce 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounce: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(10px)' },
        }
      },
      container: {
        center: true,
        padding: '1rem',
        screens: {
          // xs: '430px',
          lg: '1125px',
          xl: '1125px',
          '2xl': '1125px',
        },
      },
    },
  },
  plugins: [require('tailwind-scrollbar'), require("@tailwindcss/typography"), require('daisyui'),
    // function ({ addUtilities }) {
    // const newUtilities = {
    // ".scrollbar-thin": {
    //   scrollbarWidth: "initial",
    //   scrollbarColor: "rgb(31 41 55) rgb(29 35 42)",
    // },
    // ".scrollbar-webkit": {
    //   "&::-webkit-scrollbar": {
    //     width: "16px"
    //   },
    //   "&::-webkit-scrollbar-track": {
    //     background: "white"
    //   },
    //   "&::-webkit-scrollbar-thumb": {
    //     backgroundColor: "rgb(31 41 55)",
    //     borderRaduis: "20px",
    //     border: "1px solid white"
    //   }
    // }
    // }
    // addUtilities(newUtilities, ["responsive", "hover"])
    // }
  ],
  daisyui: {
    themes: [
      {
        light: {
          "base-100": "#ffffff",
          "base-200": "#F2F2F2",
          "base-300": "#E5E6E6",
          "base-content": "#161515",
          "primary": "#F28A7A",
          "primary-content": "#121212",
          "secondary": "#83A6D8",
          "secondary-content": "#121212",
          "accent": "#fdba74",
          "accent-content": "#000d12",
          "neutral": "#d1d5db",
          "neutral-content": "#1c1917",
          "info": "#12a7d7",
          "info-content": "#000d12",
          "success": "#81C41C",
          "success-content": "#001305",
          "warning": "#f59e0b",
          "warning-content": "#0f0500",
          "error": "#EB8484",
          "error-content": "#060505",
        }
      },
      {
        dark: {
          "base-100": "#1f2937",
          "base-200": "#1a242f",
          "base-300": "#161e27",
          "base-content": "#e2e8f0",
          "primary": "#F28A7A",
          "primary-content": "#1a1a1a",
          "secondary": "#83A6D8",
          "secondary-content": "#1a1a1a",
          "accent": "#fdba74",
          "accent-content": "#1a1a1a",
          "neutral": "#374151",
          "neutral-content": "#e5e7eb",
          "info": "#0ea5e9",
          "info-content": "#e5f7ff",
          "success": "#508c05",
          "success-content": "#f0fff0",
          "warning": "#fbbf24",
          "warning-content": "#0f0500",
          "error": "#EB8484",
          "error-content": "#fff1f1"
        }
      }
    ], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: "dark", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  },
};
