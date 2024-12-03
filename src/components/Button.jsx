import React from "react";

export default function Button({
    children,
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className = "",
    border = "rounded-lg",
    ...props
}) {
    return (
        <button className={`px-4 py-2 ${bgColor} ${textColor} ${className} ${border}`} {...props}>
            {children}
        </button>
    );
}

 