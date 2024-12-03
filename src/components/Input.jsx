import React, { useId } from 'react'

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref) {
    const id = useId()
    return (
    <div className="w-full">
        {label && (
            <label
                className="inline-block mb-1 pl-1"
                htmlFor={id}
            >
                {label}
            </label>
        )}
        <input
            type={type}
            className={`px-3 py-2 bg-transparent text-black border-b border-gray-300 outline-none focus:border-b-2 focus:border-gray-400 duration-200 w-full ${className}`}
            ref={ref}
            {...props}
            id={id}
        />
    </div>
);
})

export default Input