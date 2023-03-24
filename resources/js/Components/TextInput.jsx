import { forwardRef, useEffect, useRef } from "react";

import Proptypes from "prop-types";

export default forwardRef(function TextInput(
    {
        type = "text",
        name,
        id,
        value,
        defaultValue,
        variant = "primary",
        className,
        autoComplete,
        required,
        isFocused,
        handleChange,
        placeholder,
        isError,
    },
    ref
) {
    // guna untuk validasi apa yg boleh dan di terima oleh component input
    TextInput.propTypes = {
        type: Proptypes.oneOf(["text", "email", "password", "number", "file"]),
        name: Proptypes.string,
        value: Proptypes.oneOfType([Proptypes.string, Proptypes.number]),
        defaultValue: Proptypes.oneOfType([Proptypes.string, Proptypes.number]),
        className: Proptypes.string,
        variant: Proptypes.oneOf(["primary", "error", "primary-outline"]),
        autoComplete: Proptypes.string,
        required: Proptypes.bool,
        isFocused: Proptypes.bool,
        handleChange: Proptypes.func,
        placeholder: Proptypes.string,
        isError: Proptypes.bool,
    };

    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    // ${isError && "input-error"} => ketika ada error maka tampikan error, seperti ternary if

    return (
        <div className="flex flex-col items-start">
            <input
                type={type}
                name={name}
                id={id}
                value={value}
                defaultValue={defaultValue}
                className={`rounded-2xl bg-form-bg py-[13px] px-7 w-full ${
                    isError && "input-error"
                }  input-${variant} ${className}`}
                ref={input}
                autoComplete={autoComplete}
                required={required}
                onChange={(e) => handleChange(e)}
                placeholder={placeholder}
            />
        </div>
    );
});
