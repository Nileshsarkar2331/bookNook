import { dark } from "@clerk/themes";

export const bookNookClerkTheme = {
  baseTheme: dark,

  variables: {
    colorPrimary: "#8B5E3C", // sepia brown
    colorBackground: "#F5EFE6", // parchment
    colorText: "#3E2F23",
    colorInputBackground: "#FBF7F2",
    colorInputText: "#3E2F23",
    borderRadius: "10px",
    fontFamily: "Georgia, 'Times New Roman', serif",
  },

  elements: {
    card: "bg-cream border border-sepia/30 shadow-page",
    headerTitle: "text-2xl font-display text-primary",
    headerSubtitle: "italic text-muted-foreground",

    /* INPUTS */
    formFieldInput:
      "bg-cream border border-sepia/30 text-foreground focus:border-muted-gold focus:ring-muted-gold",

    /* PRIMARY BUTTON */
    formButtonPrimary:
      "bg-primary hover:bg-muted-gold text-white font-semibold tracking-wide",

    /* 🔥 SOCIAL BUTTONS = SAME AS CONTINUE 🔥 */
    socialButtonsBlockButton:
      "bg-primary hover:bg-muted-gold text-white border-none font-semibold tracking-wide",

    socialButtonsBlockButtonText: "text-white",

    socialButtonsProviderIcon: "brightness-0 invert", // makes icons white

    /* DIVIDER */
    dividerLine: "bg-sepia/30",
    dividerText: "text-muted-foreground",

    /* FOOTER */
    footerActionLink: "text-primary hover:underline",
  },
};
