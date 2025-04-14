import React from "react";

const getBMIAttributes = (bmi: number) => {
  if (bmi < 18.5) {
    return { color: "#ADD8E6", gradient: ["#ADD8E6", "#87CEFA"], angle: 30 }; // Underweight
  } else if (bmi < 24.9) {
    return { color: "#FFD700", gradient: ["#FFD700", "#EEA4CE"], angle: 27 }; // Normal weight
  } else if (bmi < 29.9) {
    return { color: "#FFA500", gradient: ["#FFA500", "#FF4500"], angle: 45 }; // Overweight
  } else {
    return { color: "#FF0000", gradient: ["#FF0000", "#8B0000"], angle: 60 }; // Obesity
  }
};

const CircleWithArc = ({ bmi }: { bmi: number }) => {
  const radius = 50;
  const centerX = 60;
  const centerY = 60;
  const arcRadius = radius + 5;
  const cornerRadius = 3; // Corner radius for the arc

  const { gradient, angle } = getBMIAttributes(bmi);
  const startAngle = (-angle / 2) - 90;
  const endAngle = (angle / 2) + 10;

  const toRadians = (angle: number) => (angle * Math.PI) / 180;

  const startX = centerX + arcRadius * Math.cos(toRadians(startAngle));
  const startY = centerY + arcRadius * Math.sin(toRadians(startAngle));
  const endX = centerX + arcRadius * Math.cos(toRadians(endAngle));
  const endY = centerY + arcRadius * Math.sin(toRadians(endAngle));

  const largeArcFlag = angle > 180 ? 1 : 0;

  const textX = 85;
  const textY = 45;

  return (
    <svg width="120" height="120" viewBox="0 0 120 120">
      <defs>
        <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={gradient[0]} />
          <stop offset="100%" stopColor={gradient[1]} />
        </linearGradient>
        <filter id="roundedCorners" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="0" />
          <feOffset dx="0" dy="0" result="offsetblur" />
          <feFlood floodColor="rgba(0,0,0,0)" result="color" />
          <feComposite in="SourceAlpha" in2="offsetblur" operator="in" />
          <feComposite in2="color" operator="in" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.9" />
          </feComponentTransfer>
          <feGaussianBlur stdDeviation={cornerRadius} result="blur" />
          <feBlend in="SourceGraphic" in2="blur" mode="normal" />
        </filter>
      </defs>

      <circle cx={centerX} cy={centerY} r={radius} fill="white" stroke="black" strokeWidth="2" />

      <path
        d={`M ${centerX} ${centerY} L ${startX} ${startY} A ${arcRadius} ${arcRadius} 0 ${largeArcFlag} 1 ${endX} ${endY} Z`}
        fill="url(#arcGradient)"
        filter="url(#roundedCorners)"
        rx="3" ry="3"
      />

      <text x={textX} y={textY} fontSize="16" fontWeight="bold" fill="white" textAnchor="middle" dominantBaseline="middle">{bmi}</text>
    </svg>
  );
};

export default CircleWithArc;
