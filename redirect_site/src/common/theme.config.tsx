import { createTheme, type CSSVariablesResolver } from "@mantine/core";

// mantine configuration
export const theme = createTheme({
  primaryColor: "violet",
  primaryShade: { light: 6, dark: 9 },
  fontFamily: "Inter",
  respectReducedMotion: true,
  radius: {
    xs: "8px",
    lg: "8px",
    xl: "8px",
    md: "8px",
    sm: "8px",
  },
  fontSizes: {
    // 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    xs: "16px",
    sm: "16px",
  },
  colors: {
    dark: [
      "#d5d7e0",
      "#acaebf",
      "#8c8fa3",
      "#666980",
      "#4d4f66",
      "#34354a",
      "#2b2c3d",
      "#1d1e30",
      "#0c0d21",
      "#01010a",
    ],
  },
  headings: {
    sizes: {
      h1: {
        fontSize: "48px",
      },
    },
  },
  other: {
    sidebarGrayLight: "#495057",
    sidebarGrayDark: "#adb5bd",
    sidebarTextHoverLight: "#212529",
    sidebarTextHoverDark: "#f8f9fa",
  },
});

export const resolver: CSSVariablesResolver = (th) => ({
  variables: {},
  light: {
    "--mantine-color-sidebar-gray": th.other.sidebarGrayLight as string,
    "--mantine-color-sidebar-text-hover": th.other
      .sidebarTextHoverLight as string,
  },
  dark: {
    "--mantine-color-sidebar-gray": th.other.sidebarGrayDark as string,
    "--mantine-color-sidebar-text-hover": th.other
      .sidebarTextHoverDark as string,
  },
});
