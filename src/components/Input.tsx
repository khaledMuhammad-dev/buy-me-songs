import React from "react";
import styles from "@styles/Form.module.scss";

const { input_wrapper, active, helper, color, danger } = styles;

interface InputProps {
  [key: string]: any;
}
export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  InputProps,
}) => {
  const { value } = InputProps;

  return (
    <div>
      <div className={input_wrapper}>
        <div className={error ? danger : color}>
          <input {...InputProps} />
          <label className={value?.trim() ? active : ""}>{label}</label>
        </div>
      </div>
      {error && <p className={helper}>{helperText}</p>}
    </div>
  );
};
