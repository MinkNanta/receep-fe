module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontSize: {
      "9xl": ["144px", { lineHeight: "144px" }],
      "8xl": ["128px", { lineHeight: "128px" }],
      "7xl": ["72px", { lineHeight: "72px" }],
      "6xl": ["60px", { lineHeight: "60px" }],
      "5xl": ["48px", { lineHeight: "58px", letterSpacing: "-0.04em" }],
      "4xl": ["30px", { lineHeight: "36px" }],
      "3xl": ["30px", { lineHeight: "36px" }],
      "2xl": ["24px", { lineHeight: "32px" }],
      lg: ["20px", { lineHeight: "28px" }],
      x: ["18px", { lineHeight: "28px" }],
      base: ["16px", { lineHeight: "24px" }],
      sm: ["14px", { lineHeight: "16px" }],
      xs: ["12px", { lineHeight: "14px" }],
    },
    extend: {
      colors: {
        main: {
          400: "#FE734D",
          200: "#FFC3B3",
          100: "#FFEBE6",
        },
      },
      boxShadow: {
        sm: "15px 20px 45px rgba(233, 233, 233, 0.25)",
        button: "0px 10px 40px rgba(254, 114, 76, 0.33)",
        card: "18.2143px 18.2143px 36.4286px rgba(211, 209, 216, 0.25)",
      },
    },
  },

  plugins: [],
};
