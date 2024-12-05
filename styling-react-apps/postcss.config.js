import postcssModules from "postcss-modules";

export default {
  plugins: [
    /* postcssModules({
      generateScopedName: "[name]__[local]___[hash:base64:5]", // Matches class naming conventions
      getJSON: (cssFileName, json) => {
        console.log(`CSS Modules JSON for ${cssFileName}:`, json);
      },
    }),*/
  ],
};
