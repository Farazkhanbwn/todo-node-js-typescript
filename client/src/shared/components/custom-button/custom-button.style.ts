import { CustomButtonTypes } from "./custom-button.types";

const primaryButtonStyles =
  "rounded-full border border-black bg-black py-1.5 px-5 text-sm text-white transition-all hover:bg-white hover:text-black";

const iconButtonStyles =
  "hover:border-gray-700 hover:text-gray-700 absolute inset-y-0 right-0 my-1.5 mr-1.5 flex w-10 items-center justify-center rounded border border-gray-200 font-sans text-sm font-medium text-gray-400";

export const customButtonStyles = Object.freeze({
  [CustomButtonTypes.PRIMARY]: primaryButtonStyles,
  [CustomButtonTypes.ICON_BUTTON]: iconButtonStyles,
});
