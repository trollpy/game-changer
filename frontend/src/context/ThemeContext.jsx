import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
 const [theme, setTheme] = useState('dark');
 const [accentColor, setAccentColor] = useState('emerald');
 const [glassEffect, setGlassEffect] = useState(true);
 const [animations, setAnimations] = useState(true);

 // Available accent colors for the agricultural theme
 const accentColors = {
   emerald: {
     primary: 'emerald',
     gradient: 'from-emerald-500 to-teal-500',
     text: 'text-emerald-400',
     bg: 'bg-emerald-500',
     border: 'border-emerald-400',
     hover: 'hover:text-emerald-400',
     shadow: 'shadow-emerald-500/25'
   },
   blue: {
     primary: 'blue',
     gradient: 'from-blue-500 to-cyan-500',
     text: 'text-blue-400',
     bg: 'bg-blue-500',
     border: 'border-blue-400',
     hover: 'hover:text-blue-400',
     shadow: 'shadow-blue-500/25'
   },
   purple: {
     primary: 'purple',
     gradient: 'from-purple-500 to-pink-500',
     text: 'text-purple-400',
     bg: 'bg-purple-500',
     border: 'border-purple-400',
     hover: 'hover:text-purple-400',
     shadow: 'shadow-purple-500/25'
   },
   green: {
     primary: 'green',
     gradient: 'from-green-500 to-emerald-500',
     text: 'text-green-400',
     bg: 'bg-green-500',
     border: 'border-green-400',
     hover: 'hover:text-green-400',
     shadow: 'shadow-green-500/25'
   }
 };

 useEffect(() => {
   // Load saved preferences
   const savedTheme = localStorage.getItem('agri-theme') || 'dark';
   const savedAccent = localStorage.getItem('agri-accent') || 'emerald';
   const savedGlass = localStorage.getItem('agri-glass') !== 'false';
   const savedAnimations = localStorage.getItem('agri-animations') !== 'false';

   setTheme(savedTheme);
   setAccentColor(savedAccent);
   setGlassEffect(savedGlass);
   setAnimations(savedAnimations);

   // Apply theme classes
   updateDocumentClasses(savedTheme, savedAccent, savedGlass, savedAnimations);
 }, []);

 const updateDocumentClasses = (newTheme, newAccent, newGlass, newAnimations) => {
   const root = document.documentElement;
   
   // Theme classes
   root.classList.toggle('dark', newTheme === 'dark');
   root.classList.toggle('light', newTheme === 'light');
   
   // Remove existing accent classes
   Object.keys(accentColors).forEach(color => {
     root.classList.remove(`accent-${color}`);
   });
   
   // Add new accent class
   root.classList.add(`accent-${newAccent}`);
   
   // Glass effect
   root.classList.toggle('glass-disabled', !newGlass);
   
   // Animations
   root.classList.toggle('animations-disabled', !newAnimations);
   
   // Set CSS custom properties for dynamic theming
   root.style.setProperty('--accent-primary', accentColors[newAccent]?.primary || 'emerald');
   root.style.setProperty('--glass-opacity', newGlass ? '0.1' : '0.05');
   root.style.setProperty('--animation-duration', newAnimations ? '300ms' : '0ms');
 };

 const toggleTheme = () => {
   const newTheme = theme === 'light' ? 'dark' : 'light';
   setTheme(newTheme);
   localStorage.setItem('agri-theme', newTheme);
   updateDocumentClasses(newTheme, accentColor, glassEffect, animations);
 };

 const changeAccentColor = (color) => {
   if (accentColors[color]) {
     setAccentColor(color);
     localStorage.setItem('agri-accent', color);
     updateDocumentClasses(theme, color, glassEffect, animations);
   }
 };

 const toggleGlassEffect = () => {
   const newGlass = !glassEffect;
   setGlassEffect(newGlass);
   localStorage.setItem('agri-glass', newGlass.toString());
   updateDocumentClasses(theme, accentColor, newGlass, animations);
 };

 const toggleAnimations = () => {
   const newAnimations = !animations;
   setAnimations(newAnimations);
   localStorage.setItem('agri-animations', newAnimations.toString());
   updateDocumentClasses(theme, accentColor, glassEffect, newAnimations);
 };

 // Get current accent color configuration
 const getCurrentAccent = () => accentColors[accentColor] || accentColors.emerald;

 // Theme-aware background classes
 const getBackgroundClass = () => {
   if (theme === 'dark') {
     return 'bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900';
   }
   return 'bg-gradient-to-br from-slate-50 via-white to-emerald-50';
 };

 // Glass effect classes
 const getGlassClass = (intensity = 'medium') => {
   if (!glassEffect) return 'bg-white/5';
   
   const intensities = {
     light: 'bg-white/5 backdrop-blur-sm border border-white/5',
     medium: 'bg-white/10 backdrop-blur-xl border border-white/20',
     heavy: 'bg-white/15 backdrop-blur-2xl border border-white/30'
   };
   
   return intensities[intensity] || intensities.medium;
 };

 // Animation classes
 const getAnimationClass = (type = 'default') => {
   if (!animations) return '';
   
   const animationTypes = {
     default: 'transition-all duration-300',
     fast: 'transition-all duration-150',
     slow: 'transition-all duration-500',
     bounce: 'transition-all duration-300 hover:scale-105',
     slide: 'transition-transform duration-300',
     fade: 'transition-opacity duration-300'
   };
   
   return animationTypes[type] || animationTypes.default;
 };

 // Text color classes based on theme and accent
 const getTextClass = (variant = 'primary') => {
   const accent = getCurrentAccent();
   
   const variants = {
     primary: theme === 'dark' ? 'text-white' : 'text-slate-900',
     secondary: theme === 'dark' ? 'text-slate-300' : 'text-slate-600',
     muted: theme === 'dark' ? 'text-slate-400' : 'text-slate-500',
     accent: accent.text,
     success: 'text-emerald-400',
     warning: 'text-yellow-400',
     error: 'text-red-400'
   };
   
   return variants[variant] || variants.primary;
 };

 // Button classes with accent colors
 const getButtonClass = (variant = 'primary', size = 'md') => {
   const accent = getCurrentAccent();
   const baseAnimation = getAnimationClass('bounce');
   
   const variants = {
     primary: `bg-gradient-to-r ${accent.gradient} hover:opacity-90 text-white ${accent.shadow} shadow-lg`,
     secondary: `${getGlassClass('medium')} ${getTextClass('primary')} hover:${getGlassClass('heavy')}`,
     outline: `border-2 ${accent.border} ${accent.text} hover:${accent.bg} hover:text-white`,
     ghost: `${accent.hover} hover:${getGlassClass('light')}`
   };
   
   const sizes = {
     sm: 'px-4 py-2 text-sm rounded-lg',
     md: 'px-6 py-3 text-base rounded-xl',
     lg: 'px-8 py-4 text-lg rounded-2xl',
     xl: 'px-10 py-5 text-xl rounded-2xl'
   };
   
   return `${variants[variant]} ${sizes[size]} ${baseAnimation} font-semibold`;
 };

 // Card classes with glass effect
 const getCardClass = (elevation = 'medium') => {
   const glass = getGlassClass(elevation);
   const animation = getAnimationClass('default');
   
   const elevations = {
     low: 'shadow-lg',
     medium: 'shadow-xl',
     high: 'shadow-2xl'
   };
   
   return `${glass} ${elevations[elevation]} ${animation} rounded-3xl`;
 };

 // Preset color schemes for different agricultural contexts
 const colorSchemes = {
   farming: { accent: 'emerald', glass: true },
   market: { accent: 'blue', glass: true },
   analytics: { accent: 'purple', glass: true },
   sustainability: { accent: 'green', glass: true }
 };

 const applyColorScheme = (scheme) => {
   if (colorSchemes[scheme]) {
     const { accent, glass } = colorSchemes[scheme];
     changeAccentColor(accent);
     if (glass !== glassEffect) toggleGlassEffect();
   }
 };

 const value = {
   // Core theme state
   theme,
   accentColor,
   glassEffect,
   animations,
   
   // Theme controls
   toggleTheme,
   changeAccentColor,
   toggleGlassEffect,
   toggleAnimations,
   
   // Utility functions
   getCurrentAccent,
   getBackgroundClass,
   getGlassClass,
   getAnimationClass,
   getTextClass,
   getButtonClass,
   getCardClass,
   
   // Color schemes
   accentColors,
   colorSchemes,
   applyColorScheme,
   
   // Theme status
   isDark: theme === 'dark',
   isLight: theme === 'light'
 };

 return (
   <ThemeContext.Provider value={value}>
     <div className={`${getBackgroundClass()} min-h-screen transition-all duration-500`}>
       {children}
     </div>
   </ThemeContext.Provider>
 );
};

export const useTheme = () => {
 const context = useContext(ThemeContext);
 if (context === undefined) {
   throw new Error('useTheme must be used within a ThemeProvider');
 }
 return context;
};

// Higher-order component for theme-aware components
export const withTheme = (Component) => {
 return function ThemedComponent(props) {
   const theme = useTheme();
   return <Component {...props} theme={theme} />;
 };
};

// Custom hooks for specific theme aspects
export const useAccentColor = () => {
 const { accentColor, changeAccentColor, getCurrentAccent } = useTheme();
 return { accentColor, changeAccentColor, getCurrentAccent };
};

export const useGlassEffect = () => {
 const { glassEffect, toggleGlassEffect, getGlassClass } = useTheme();
 return { glassEffect, toggleGlassEffect, getGlassClass };
};

export const useAnimations = () => {
 const { animations, toggleAnimations, getAnimationClass } = useTheme();
 return { animations, toggleAnimations, getAnimationClass };
};