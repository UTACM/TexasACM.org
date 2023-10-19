import presetUno from "@unocss/preset-uno";
import presetWebFonts from "@unocss/preset-web-fonts";
import transformerDirectives from "@unocss/transformer-directives";
import transformerVariantGroup from "@unocss/transformer-variant-group";
import { defineConfig, presetAttributify, presetIcons } from "unocss";
// import presetIcons from "@unocss/preset-icons/browser";

export default defineConfig({
  content: {
    filesystem: ["{app,components}/**/*.{jsx,ts,tsx}"],
  },
  rules: [
    [
      "btn-transition",
      {
        transition: "color 180ms, border-color 150ms, background-color 150ms, box-shadow 150ms, transform 50ms",
      },
    ],
    [
      "ring-offset-0",
      {
        "--un-ring-offset-width": "0px",
      },
    ],
  ],
  shortcuts: {
    focusable: "outline-none ring-2 ring-transparent focus-visible:ring-blue-500/60",
    link: "cursor-pointer relative transition duration-100 ease-out active:scale-95 text-primary hover:text-accent after:(absolute left-0.4 right-0.4 h-2px scale-x-95 bg-accent opacity-0 transition duration-250 ease-out-expo content-empty -translate-y-0.5 -bottom-0.5) hover:after:(opacity-100 !translate-y-0 !scale-x-100 left-0.2 right-0.2)",
  },
  theme: {
    easing: {
      "in-out-expo": "cubic-bezier(.46, 0, .21, 1)",
      "out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
    },
    colors: {
      primary: "#c15b05",
      accent: "#ffa500",
    },
  },

  presets: [
    presetUno(),
    presetWebFonts({
      provider: "google",
      fonts: {
        sans: {
          name: "Raleway",
          weights: ["500", "700"],
        },
        montserrat: {
          name: "Montserrat",
          weights: ["700"],
        },
      },
    }),
    // presetIcons({
    //   collections: {
    //     heroicons: () => import("@iconify-json/heroicons-solid/icons.json").then((i) => i.default),
    //   },
    // }),
    presetIcons({
      cdn: "https://esm.sh/",
    }),
    presetAttributify(),
  ],
  transformers: [transformerVariantGroup(), transformerDirectives()],
});
