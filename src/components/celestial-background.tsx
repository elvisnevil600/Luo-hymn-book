import { motion } from "motion/react";

function AngelSilhouette({ className, delay = 0, duration = 20 }: { className?: string, delay?: number, duration?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ y: 20, opacity: 0, scale: 0.8 }}
      animate={{ 
        y: [-20, 20, -20],
        opacity: [0.03, 0.08, 0.03],
        scale: [0.9, 1.1, 0.9],
        x: [-10, 10, -10]
      }}
      transition={{ 
        duration: duration,
        repeat: Infinity,
        delay: delay,
        ease: "easeInOut"
      }}
    >
      <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
        {/* Abstract Angel silhouette */}
        <circle cx="50" cy="25" r="8" /> {/* Head */}
        <path d="M50 35 L40 75 L60 75 Z" /> {/* Body */}
        {/* Wings */}
        <path d="M48 40 Q20 20 10 50 Q20 60 45 45 Z" />
        <path d="M52 40 Q80 20 90 50 Q80 60 55 45 Z" />
      </svg>
    </motion.div>
  );
}

export default function CelestialBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-background transition-colors duration-500">
      {/* Soft ethereal glows */}
      <div 
        className="absolute top-[-10%] left-[-10%] w-[80%] h-[70%] rounded-full bg-primary/10 dark:bg-primary/5 blur-[120px] mix-blend-screen transition-opacity duration-1000 animate-pulse" 
        style={{ animationDuration: '10s' }}
      />
      <div 
        className="absolute bottom-[-15%] right-[-5%] w-[70%] h-[60%] rounded-full bg-amber-200/20 dark:bg-amber-500/10 blur-[140px] mix-blend-screen transition-opacity duration-1000 animate-pulse" 
        style={{ animationDuration: '8s', animationDelay: '1s' }}
      />
      
      {/* Angels drifting in the background */}
      <AngelSilhouette className="absolute top-[15%] left-[10%] w-24 h-24 text-white/20 dark:text-white/10" delay={0} duration={25} />
      <AngelSilhouette className="absolute top-[40%] right-[15%] w-32 h-32 text-amber-200/15 dark:text-amber-500/5" delay={5} duration={30} />
      <AngelSilhouette className="absolute bottom-[20%] left-[20%] w-20 h-20 text-blue-200/10 dark:text-blue-900/5" delay={2} duration={22} />
      <AngelSilhouette className="absolute top-[60%] left-[5%] w-16 h-16 text-white/10 dark:text-white/5" delay={8} duration={28} />

      {/* Divine Rays - Multiple layers */}
      <div className="absolute top-[-20%] left-[20%] w-[100px] h-[150%] bg-gradient-to-b from-amber-100/20 dark:from-amber-400/10 via-amber-100/5 to-transparent rotate-[25deg] blur-[30px] opacity-60 animate-pulse" style={{ animationDuration: '6s' }} />
      <div className="absolute top-[-20%] left-[45%] w-[150px] h-[150%] bg-gradient-to-b from-white/20 dark:from-white/5 via-white/5 to-transparent rotate-[25deg] blur-[40px] opacity-40 animate-pulse" style={{ animationDuration: '9s', animationDelay: '1.5s' }} />
      <div className="absolute top-[-20%] left-[70%] w-[80px] h-[150%] bg-gradient-to-b from-amber-100/15 dark:from-amber-400/8 via-amber-100/5 to-transparent rotate-[25deg] blur-[25px] opacity-50 animate-pulse" style={{ animationDuration: '7s', animationDelay: '0.5s' }} />

      {/* Subtle texture for character */}
      <div 
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] pointer-events-none mix-blend-overlay h-full w-full"
        style={{ 
          backgroundImage: `url('https://www.transparenttextures.com/patterns/stardust.png')`
        }} 
      />
      
      {/* Extra soft shimmer overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-amber-50/10 dark:from-black/10 dark:via-transparent dark:to-yellow-900/10" />
    </div>
  );
}
