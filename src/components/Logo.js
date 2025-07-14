import React from 'react';

export default function Logo({ style = {}, compact = false, ...props }) {
    if (compact) {
        // Set AF font size back to 128px and ensure it is fully visible and centered
        return (
            <svg
                width="300"
                height="160"
                viewBox="0 0 520 160"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={style}
                {...props}
            >
                <defs>
                    <linearGradient id="blue-gradient" x1="0" y1="0" x2="0" y2="1" gradientTransform="scale(1, 1.2)">
                        <stop offset="0%" stopColor="#60A5FA" />
                        <stop offset="60%" stopColor="#2563EB" />
                        <stop offset="100%" stopColor="#1E3A8A" />
                    </linearGradient>
                    <pattern id="wave" patternUnits="userSpaceOnUse" width="40" height="20">
                        <path d="M0 10 Q 10 0, 20 10 T 40 10" fill="none" stroke="#93C5FD" strokeWidth="2" />
                    </pattern>
                    <mask id="text-mask-compact">
                        <text
                            x="260"
                            y="120"
                            fontFamily="'Poppins', 'Inter', Arial, sans-serif"
                            fontWeight="bold"
                            fontSize="128"
                            letterSpacing="8"
                            textAnchor="middle"
                            alignmentBaseline="middle"
                            fill="white"
                        >
                            AF
                        </text>
                    </mask>
                </defs>
                <g mask="url(#text-mask-compact)">
                    <rect x="0" y="0" width="520" height="160" fill="url(#blue-gradient)" />
                    <rect x="0" y="0" width="520" height="160" fill="url(#wave)" opacity="0.35" />
                </g>
            </svg>
        );
    }
    // Full logo
    return (
        <svg
            width="300"
            height="80"
            viewBox="0 0 520 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={style}
            {...props}
        >
            <defs>
                <linearGradient id="blue-gradient" x1="0" y1="0" x2="0" y2="1" gradientTransform="scale(1, 1.2)">
                    <stop offset="0%" stopColor="#60A5FA" />
                    <stop offset="60%" stopColor="#2563EB" />
                    <stop offset="100%" stopColor="#1E3A8A" />
                </linearGradient>
                <pattern id="wave" patternUnits="userSpaceOnUse" width="40" height="20">
                    <path d="M0 10 Q 10 0, 20 10 T 40 10" fill="none" stroke="#93C5FD" strokeWidth="2" />
                </pattern>
                <mask id="text-mask">
                    <text
                        x="10"
                        y="85"
                        fontFamily="'Poppins', 'Inter', Arial, sans-serif"
                        fontWeight="bold"
                        fontSize="85"
                        letterSpacing="4"
                        textAnchor="start"
                        alignmentBaseline="middle"
                        fill="white"
                    >
                        AUTOFLOW
                    </text>
                </mask>
            </defs>
            <g mask="url(#text-mask)">
                <rect x="0" y="0" width="520" height="120" fill="url(#blue-gradient)" />
                <rect x="0" y="0" width="520" height="120" fill="url(#wave)" opacity="0.35" />
            </g>
        </svg>
    );
}
