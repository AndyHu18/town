import { motion } from "framer-motion";

// Common props for all icons
interface IconProps {
  className?: string;
}

// 1. Building Icon (Hardware Construction)
export const BuildingIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <motion.path
      d="M20 80L50 65L80 80V90H20V80Z"
      fill="#B87333"
      fillOpacity="0.2"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
    />
    <motion.path
      d="M50 10L20 25V80L50 65V10Z"
      fill="url(#grad1)"
      stroke="#B87333"
      strokeWidth="2"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2, ease: "easeInOut" }}
    />
    <motion.path
      d="M50 10L80 25V80L50 65V10Z"
      fill="url(#grad2)"
      stroke="#B87333"
      strokeWidth="2"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
    />
    <defs>
      <linearGradient id="grad1" x1="20" y1="10" x2="50" y2="80" gradientUnits="userSpaceOnUse">
        <stop stopColor="#B87333" stopOpacity="0.1" />
        <stop offset="1" stopColor="#B87333" stopOpacity="0.4" />
      </linearGradient>
      <linearGradient id="grad2" x1="50" y1="10" x2="80" y2="80" gradientUnits="userSpaceOnUse">
        <stop stopColor="#B87333" stopOpacity="0.3" />
        <stop offset="1" stopColor="#B87333" stopOpacity="0.6" />
      </linearGradient>
    </defs>
  </svg>
);

// 2. Heart Pulse Icon (Operation Concept)
export const HeartPulseIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <motion.path
      d="M50 20C60 10 80 10 90 30C100 50 50 90 50 90C50 90 0 50 10 30C20 10 40 10 50 20Z"
      stroke="#B87333"
      strokeWidth="2"
      fill="url(#heartGrad)"
      initial={{ scale: 0.9 }}
      animate={{ scale: 1.1 }}
      transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
    />
    <motion.path
      d="M30 50H40L45 35L55 65L60 50H70"
      stroke="white"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
    />
    <defs>
      <radialGradient id="heartGrad" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(50 50) rotate(90) scale(40)">
        <stop stopColor="#B87333" stopOpacity="0.6" />
        <stop offset="1" stopColor="#B87333" stopOpacity="0.1" />
      </radialGradient>
    </defs>
  </svg>
);

// 3. Stethoscope Icon (Medical Integration)
export const StethoscopeIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <motion.path
      d="M30 20V40C30 51.0457 38.9543 60 50 60C61.0457 60 70 51.0457 70 40V20"
      stroke="#B87333"
      strokeWidth="4"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2, ease: "easeInOut" }}
    />
    <motion.circle
      cx="50"
      cy="80"
      r="10"
      fill="#B87333"
      fillOpacity="0.2"
      stroke="#B87333"
      strokeWidth="2"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, duration: 0.5, type: "spring" }}
    />
    <motion.path
      d="M50 60V70"
      stroke="#B87333"
      strokeWidth="4"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ delay: 0.8, duration: 0.5 }}
    />
  </svg>
);

// 4. Coins Icon (Financial Plan)
export const CoinsIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <motion.g
      initial={{ y: 0 }}
      animate={{ y: -5 }}
      transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
    >
      <ellipse cx="50" cy="70" rx="25" ry="10" fill="#B87333" fillOpacity="0.4" stroke="#B87333" strokeWidth="2" />
      <path d="M25 70V50C25 55.5228 36.1929 60 50 60C63.8071 60 75 55.5228 75 50V70" stroke="#B87333" strokeWidth="2" fill="url(#coinGrad)" />
      <ellipse cx="50" cy="50" rx="25" ry="10" fill="#B87333" fillOpacity="0.2" stroke="#B87333" strokeWidth="2" />
    </motion.g>
    <motion.g
      initial={{ y: -15, opacity: 0 }}
      animate={{ y: -25, opacity: 1 }}
      transition={{ delay: 0.5, duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
    >
      <ellipse cx="50" cy="40" rx="20" ry="8" fill="#B87333" fillOpacity="0.4" stroke="#B87333" strokeWidth="2" />
      <path d="M30 40V25C30 29.4183 38.9543 33 50 33C61.0457 33 70 29.4183 70 25V40" stroke="#B87333" strokeWidth="2" fill="url(#coinGrad)" />
      <ellipse cx="50" cy="25" rx="20" ry="8" fill="#B87333" fillOpacity="0.2" stroke="#B87333" strokeWidth="2" />
    </motion.g>
    <defs>
      <linearGradient id="coinGrad" x1="25" y1="50" x2="75" y2="70" gradientUnits="userSpaceOnUse">
        <stop stopColor="#B87333" stopOpacity="0.1" />
        <stop offset="1" stopColor="#B87333" stopOpacity="0.5" />
      </linearGradient>
    </defs>
  </svg>
);

// 5. Trees Icon (Leisure Farm)
export const TreesIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <motion.path
      d="M50 80V40"
      stroke="#B87333"
      strokeWidth="4"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1 }}
    />
    <motion.path
      d="M50 20L30 50H70L50 20Z"
      fill="#B87333"
      fillOpacity="0.3"
      stroke="#B87333"
      strokeWidth="2"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
    />
    <motion.path
      d="M50 40L20 70H80L50 40Z"
      fill="#B87333"
      fillOpacity="0.2"
      stroke="#B87333"
      strokeWidth="2"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.8, type: "spring" }}
    />
  </svg>
);

// 6. Globe Icon (International Finance)
export const GlobeIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <motion.circle
      cx="50"
      cy="50"
      r="35"
      stroke="#B87333"
      strokeWidth="2"
      fill="url(#globeGrad)"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
    />
    <motion.ellipse
      cx="50"
      cy="50"
      rx="35"
      ry="15"
      stroke="#B87333"
      strokeWidth="1.5"
      fill="none"
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
    />
    <motion.ellipse
      cx="50"
      cy="50"
      rx="15"
      ry="35"
      stroke="#B87333"
      strokeWidth="1.5"
      fill="none"
      initial={{ rotate: 90 }}
      animate={{ rotate: 450 }}
      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
    />
    <defs>
      <radialGradient id="globeGrad" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(50 50) rotate(90) scale(35)">
        <stop stopColor="#B87333" stopOpacity="0.05" />
        <stop offset="1" stopColor="#B87333" stopOpacity="0.2" />
      </radialGradient>
    </defs>
  </svg>
);
