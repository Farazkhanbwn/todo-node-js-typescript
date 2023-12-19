import React from "react";
import { CustomInputFieldProps } from "./custom-input.types";

export const CustomInputField: React.FC<CustomInputFieldProps> = ({
  name,
  type,
  placeholder = "",
  value = "",
  onChange,
  readOnly,
  className,
  required = false,
  errorMessage = "",
}) => {
  return (
    <div>
      <input
        type={type}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        defaultValue={value.toString() ?? ""}
        className={`block w-full rounded-md border border-gray-200 bg-white py-2.5 pl-10 pr-12 text-sm shadow-lg font-satoshi font-medium focus:border-black focus:outline-none focus:ring-0 ${className}`}
        readOnly={readOnly}
        required={required}
      />
      {errorMessage && <div>{errorMessage}</div>}
    </div>
  );
};
