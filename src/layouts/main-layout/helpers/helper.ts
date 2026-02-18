import { type Theme } from "@mui/material/styles";

export function getDrawerSxTransitionMixin(
  isExpanded: boolean,
  property: string,
) {
  return {
    transition: (theme: Theme) =>
      theme.transitions.create(property, {
        easing: theme.transitions.easing.sharp,
        duration: isExpanded
          ? theme.transitions.duration.enteringScreen
          : theme.transitions.duration.leavingScreen,
      }),
  };
}

export function getDrawerWidthTransitionMixin(isExpanded: boolean) {
  return {
    ...getDrawerSxTransitionMixin(isExpanded, "width"),
    overflowX: "hidden",
  };
}

export const DRAWER_WIDTH = 240; // px
export const MINI_DRAWER_WIDTH = 90; // px
