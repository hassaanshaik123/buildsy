import React from "react";

export function BuildsyLogo({
  size = "md",
  className = "",
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizeClasses =
    size === "sm"
      ? "text-xl tracking-tight"
      : size === "lg"
      ? "text-3xl tracking-tight"
      : "text-2xl tracking-tight";

  return (
    <span
      className={`font-extrabold text-[#0c1510] inline-flex items-baseline select-none ${sizeClasses} ${className}`}
    >
      buildsy<span className="text-[#198754]">.</span>
    </span>
  );
}

export function GreenBrushUnderline({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-auto ${className}`}
      preserveAspectRatio="none"
    >
      <path
        d="M3 12.5C78.5 5.2 198.2 3.8 317 11.5"
        stroke="#4ca977"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <path
        d="M12 15.5C96.5 9.8 214.2 8.9 308 14.2"
        stroke="#7bc49c"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeOpacity="0.7"
      />
    </svg>
  );
}

export function SparkleRays({ className = "" }: { className?: string }) {
  return (
    <svg
      width="46"
      height="44"
      viewBox="0 0 46 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M37 4L33 19"
        stroke="#145334"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        d="M16 11L25 23"
        stroke="#145334"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        d="M4 29L19 32"
        stroke="#145334"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ToolBrandIcon({
  logoKey,
  size = 36,
}: {
  logoKey: string;
  size?: number;
}) {
  const key = (logoKey || "").toLowerCase();

  if (key.includes("next")) {
    return (
      <div
        style={{ width: size, height: size }}
        className="rounded-lg bg-[#0c1116] text-white flex items-center justify-center font-bold text-base shrink-0 shadow-xs"
      >
        N
      </div>
    );
  }

  if (key.includes("supabase")) {
    return (
      <div
        style={{ width: size, height: size }}
        className="rounded-lg bg-[#e8f8f0] flex items-center justify-center shrink-0"
      >
        <svg
          width={size * 0.62}
          height={size * 0.62}
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M13.5 2L4.5 13.5H12L10.5 22L19.5 10.5H12L13.5 2Z"
            fill="#1eb86a"
          />
        </svg>
      </div>
    );
  }

  if (key.includes("stripe")) {
    return (
      <div
        style={{ width: size, height: size }}
        className="rounded-lg bg-[#635bff] text-white flex items-center justify-center font-extrabold text-base shrink-0 shadow-xs"
      >
        S
      </div>
    );
  }

  if (key.includes("webflow")) {
    return (
      <div
        style={{ width: size, height: size }}
        className="rounded-lg bg-[#146ef5] text-white flex items-center justify-center font-extrabold text-sm shrink-0 shadow-xs italic"
      >
        W
      </div>
    );
  }

  if (key.includes("framer")) {
    return (
      <div
        style={{ width: size, height: size }}
        className="rounded-lg bg-[#111827] text-white flex items-center justify-center shrink-0 shadow-xs"
      >
        <svg
          width={size * 0.5}
          height={size * 0.5}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M4 2h16v7h-8L4 2zm0 7h8l8 7H4V9zm0 7h8v6l-8-6z" />
        </svg>
      </div>
    );
  }

  if (key.includes("firebase")) {
    return (
      <div
        style={{ width: size, height: size }}
        className="rounded-lg bg-[#fff7ed] flex items-center justify-center shrink-0"
      >
        <svg
          width={size * 0.58}
          height={size * 0.58}
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M5 18L8.5 3.5L13 10L15.5 6L19 18L12 22L5 18Z"
            fill="#f59e0b"
          />
          <path d="M12 22L19 18L15.5 6L12 22Z" fill="#ea580c" />
        </svg>
      </div>
    );
  }

  if (key.includes("mongo")) {
    return (
      <div
        style={{ width: size, height: size }}
        className="rounded-lg bg-[#ecfdf5] flex items-center justify-center shrink-0"
      >
        <svg
          width={size * 0.58}
          height={size * 0.58}
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 2C8 6.5 6.5 10.5 6.5 14C6.5 17.5 9 20 12 21.5C15 20 17.5 17.5 17.5 14C17.5 10.5 16 6.5 12 2Z"
            fill="#15803d"
          />
        </svg>
      </div>
    );
  }

  if (key.includes("razorpay")) {
    return (
      <div
        style={{ width: size, height: size }}
        className="rounded-lg bg-[#eff6ff] flex items-center justify-center shrink-0"
      >
        <svg
          width={size * 0.58}
          height={size * 0.58}
          viewBox="0 0 24 24"
          fill="none"
        >
          <path d="M15.5 3L7 14H12.5L10 21L19 9.5H13.5L15.5 3Z" fill="#0284c7" />
        </svg>
      </div>
    );
  }

  if (key.includes("lemon")) {
    return (
      <div
        style={{ width: size, height: size }}
        className="rounded-lg bg-[#fef2f2] flex items-center justify-center shrink-0"
      >
        <span className="text-base">🍋</span>
      </div>
    );
  }

  if (key.includes("figma")) {
    return (
      <div
        style={{ width: size, height: size }}
        className="rounded-lg bg-[#1e1e1e] flex items-center justify-center shrink-0"
      >
        <svg
          width={size * 0.52}
          height={size * 0.52}
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle cx="9" cy="6" r="3" fill="#F24E1E" />
          <circle cx="15" cy="6" r="3" fill="#FF7262" />
          <circle cx="9" cy="12" r="3" fill="#A259FF" />
          <circle cx="15" cy="12" r="3" fill="#1ABCFE" />
          <circle cx="9" cy="18" r="3" fill="#0ACF83" />
        </svg>
      </div>
    );
  }

  if (key.includes("vercel")) {
    return (
      <div
        style={{ width: size, height: size }}
        className="rounded-lg bg-[#0c1116] text-white flex items-center justify-center shrink-0"
      >
        <svg
          width={size * 0.48}
          height={size * 0.48}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 3L22 20H2L12 3Z" />
        </svg>
      </div>
    );
  }

  if (key.includes("notion")) {
    return (
      <div
        style={{ width: size, height: size }}
        className="rounded-lg bg-white border border-gray-300 text-[#111827] flex items-center justify-center font-serif font-bold text-base shrink-0"
      >
        N
      </div>
    );
  }

  if (key.includes("linear")) {
    return (
      <div
        style={{ width: size, height: size }}
        className="rounded-lg bg-[#18181b] text-white flex items-center justify-center font-bold text-xs shrink-0"
      >
        L
      </div>
    );
  }

  return (
    <div
      style={{ width: size, height: size }}
      className="rounded-lg bg-[#e6f4ed] text-[#145334] flex items-center justify-center font-bold text-sm shrink-0"
    >
      {(logoKey || "T").slice(0, 2).toUpperCase()}
    </div>
  );
}

/**
 * Renders the 5-segment SVG Donut Chart shown in the Buildsy mockups
 */
export function BudgetDonutChart({
  values,
  size = 122,
}: {
  values: {
    Development: number;
    Design: number;
    "Database & Infra": number;
    Marketing: number;
    Other: number;
  };
  size?: number;
}) {
  const segments = [
    { key: "Development", value: values.Development || 12, color: "#0f5132" },
    { key: "Design", value: values.Design || 8, color: "#20784c" },
    {
      key: "Database & Infra",
      value: values["Database & Infra"] || 7,
      color: "#2ea066",
    },
    { key: "Marketing", value: values.Marketing || 5, color: "#52be85" },
    { key: "Other", value: values.Other || 3, color: "#8cd9af" },
  ];

  const total = segments.reduce((acc, s) => acc + Math.max(0, s.value), 0);
  const safeTotal = total > 0 ? total : 1;

  const strokeWidth = 22;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let cumulativeFraction = 0;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="transform -rotate-90 shrink-0"
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="transparent"
        stroke="#e6f4ed"
        strokeWidth={strokeWidth}
      />
      {segments.map((seg) => {
        const fraction = Math.max(0.04, seg.value / safeTotal);
        const dashArray = `${fraction * circumference} ${circumference}`;
        const dashOffset = -cumulativeFraction * circumference;
        cumulativeFraction += seg.value / safeTotal;
        return (
          <circle
            key={seg.key}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={seg.color}
            strokeWidth={strokeWidth}
            strokeDasharray={dashArray}
            strokeDashoffset={dashOffset}
            className="transition-all duration-500 ease-out"
          />
        );
      })}
    </svg>
  );
}

/**
 * Founder avatar badge component matching the hero & testimonials mockups
 */
export function FounderAvatar({
  name,
  bg = "#d8efe3",
  seed = 1,
  size = 40,
}: {
  name: string;
  bg?: string;
  seed?: number;
  size?: number;
}) {
  return (
    <div
      style={{ width: size, height: size, backgroundColor: bg }}
      className="rounded-full border-2 border-white overflow-hidden flex items-center justify-center shrink-0 shadow-xs relative"
      title={name}
    >
      <svg
        viewBox="0 0 64 64"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="32" cy="32" r="32" fill={bg} />
        {/* Shoulders / Shirt */}
        <path
          d="M10 64C10 50 20 44 32 44C44 44 54 50 54 64H10Z"
          fill={seed === 2 ? "#1e293b" : seed === 3 ? "#0f5132" : "#111827"}
        />
        {/* Neck */}
        <rect x="27" y="35" width="10" height="11" rx="4" fill="#d99b78" />
        {/* Head */}
        <circle
          cx="32"
          cy="26"
          r="11"
          fill={seed === 2 ? "#e5ac8a" : "#d4946e"}
        />
        {/* Hair */}
        {seed === 2 ? (
          <path
            d="M19 26C19 16 25 12 32 12C39 12 45 16 45 26C45 34 44 42 42 44C42 32 40 22 32 21C24 22 22 32 22 44C20 42 19 34 19 26Z"
            fill="#18181b"
          />
        ) : (
          <path
            d="M21 24C21 16 25 13 32 13C39 13 43 16 43 24C41 19 37 18 32 18C27 18 23 19 21 24Z"
            fill="#18181b"
          />
        )}
        {/* Eyes & Smile */}
        <circle cx="28" cy="26" r="1.3" fill="#18181b" />
        <circle cx="36" cy="26" r="1.3" fill="#18181b" />
        <path
          d="M28.5 31C30 32.8 34 32.8 35.5 31"
          stroke="#18181b"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
