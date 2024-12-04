import React from "react";

export default function Button({
    children,
    type = "button",
    className = "",
    ...props
}) {
    return (
        <button
            type={type}
            className={`px-4 py-2 rounded-lg text-black bg-gradient-to-b from-[#fff] via-[#f4d6a1b8] to-[#f4c98ab8] shadow-md hover:shadow-lg relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f4d6a1] transition-all duration-300 ${className}`}
            {...props}
        >
            <span
                className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-white/50 to-transparent opacity-60 rounded-lg pointer-events-none"
                style={{
                    background: "linear-gradient(45deg, rgba(255,255,255,0.5) 0%, transparent 100%)",
                    transform: "translateY(-100%)",
                }}
            ></span>
            {children}
        </button>
    );
}


 