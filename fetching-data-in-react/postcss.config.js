import postcssModules from "postcss-modules";

export default {
  plugins: [
    postcssModules({
      generateScopedName: "[name]__[local]___[hash:base64:5]", // Customize the generated class names
    }),
  ],
};
