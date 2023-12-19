import { PropsWithChildren } from "react";

export enum CustomButtonTypes {
  PRIMARY = "PRIMARY",
  ICON_BUTTON = "SECONDARY",
}

export interface CustomButtonProps extends PropsWithChildren {
  type: CustomButtonTypes;
  disable?: boolean;
  onClick?: () => void;
  className?: string;
  hide?: boolean;
}
