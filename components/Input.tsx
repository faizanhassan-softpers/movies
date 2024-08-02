import { FC } from "react";

interface InputProps {
  id: string;
  label: string;
  placeholder: string;
  type: string;
  className?: string;
  value?: any;
  onChange?: any;
  containerClass?: string;
  error?: {
    message: string;
    hasError: boolean;
  };
  name?: string;
}

const Input: FC<InputProps> = ({
  id = "inputField",
  label = "",
  placeholder = "Email",
  type = "text",
  className = "",
  value,
  onChange,
  containerClass,
  error,
  name,
  ...props
}) => {
  return (
    <div className={`${containerClass}`}>
      <div className={`relative`}>
        <input
          type={type}
          id={id}
          className={`peer rounded-[10px] max-w-xs bg-Input text-white placeholder-transparent font-montserrat font-normal w-[300px] h-[45px] text-body-small pl-4 focus:bg-white focus:outline-none focus:border-Background focus:text-Background ${className} ${
            error?.hasError ? "border-2 border-red-500" : ""
          }`}
          placeholder={placeholder}
          {...props}
          value={value}
          onChange={onChange}
          name={name}
        />
        {label && (
          <label
            htmlFor={id}
            className="absolute left-4 top-1/2 text-white transition-transform transform -translate-y-1/2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-body-small peer-focus:-translate-y-12 peer-focus:text-white peer-focus:left-0 peer-placeholder-shown:opacity-100 opacity-0"
          >
            {label}
          </label>
        )}
      </div>
      {error?.hasError && (
        <div className="text-red-500 text-sm mt-1">{error.message}</div>
      )}
    </div>
  );
};

export default Input;
