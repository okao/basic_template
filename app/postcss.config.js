module.exports = {
  syntax: "postcss-scss",
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    require("postcss-import"),
  ],
};
