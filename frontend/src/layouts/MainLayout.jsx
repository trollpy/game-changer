import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useNotification } from '../context/NotificationContext';
import { 
 Sun, 
 Moon, 
 User, 
 Plus, 
 MessageCircle, 
 Settings, 
 LogOut, 
 X, 
 Menu,
 Bell,
 Search,
 Leaf,
 TrendingUp,
 BarChart3,
 Shield,
 Globe
} from 'lucide-react';
import { useState, useEffect } from 'react';

const MainLayout = () => {
 const { user, logout } = useAuth();
 const { theme, toggleTheme } = useTheme();
 const { notifications, removeNotification } = useNotification();
 const navigate = useNavigate();
 const [isMenuOpen, setIsMenuOpen] = useState(false);
 const [scrolled, setScrolled] = useState(false);

 // Handle scroll effect
 useEffect(() => {
   const handleScroll = () => {
     setScrolled(window.scrollY > 20);
   };
   window.addEventListener('scroll', handleScroll);
   return () => window.removeEventListener('scroll', handleScroll);
 }, []);

 const handleLogout = () => {
   logout();
   navigate('/login');
 };

 const navigationItems = [
   { name: 'Market', href: '/market', icon: <TrendingUp className="w-4 h-4" /> },
   { name: 'Analytics', href: '/analytics', icon: <BarChart3 className="w-4 h-4" /> },
   { name: 'Network', href: '/network', icon: <Globe className="w-4 h-4" /> },
   { name: 'Resources', href: '/resources', icon: <Shield className="w-4 h-4" /> }
 ];

 return (
   <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900">
     {/* Modern Glassmorphism Header */}
     <header className={`w-full sticky top-0 z-50 transition-all duration-500 ${
       scrolled 
         ? 'bg-slate-900/80 backdrop-blur-xl border-b border-white/10 shadow-2xl' 
         : 'bg-transparent'
     }`}>
       <div className="w-full px-6 py-4">
         <div className="flex justify-between items-center">
           {/* Logo */}
           <Link 
             to="/" 
             className="flex items-center gap-3 text-2xl font-black text-white hover:text-emerald-400 transition-colors duration-300"
           >
             <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
               <Leaf className="w-6 h-6 text-white" />
             </div>
             Agri-Link
           </Link>

           {/* Desktop Navigation */}
           <nav className="hidden lg:flex items-center gap-8">
             {navigationItems.map((item) => (
               <Link
                 key={item.name}
                 to={item.href}
                 className="flex items-center gap-2 text-slate-300 hover:text-emerald-400 transition-all duration-300 px-4 py-2 rounded-xl hover:bg-white/10 backdrop-blur-xl"
               >
                 {item.icon}
                 <span className="font-medium">{item.name}</span>
               </Link>
             ))}
           </nav>

           {/* Right side actions */}
           <div className="flex items-center gap-4">
             {/* Search */}
             <div className="hidden md:flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl px-4 py-2">
               <Search className="w-4 h-4 text-slate-400" />
               <input
                 type="text"
                 placeholder="Search farmers, products..."
                 className="bg-transparent text-white placeholder-slate-400 text-sm w-48 focus:outline-none"
               />
             </div>

             {/* Theme Toggle */}
             <button
               onClick={toggleTheme}
               className="p-3 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 transition-all duration-300 text-white hover:text-emerald-400"
               aria-label={`Toggle ${theme === 'dark' ? 'light' : 'dark'} mode`}
             >
               {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
             </button>

             {user ? (
               <>
                 {/* Notifications */}
                 <div className="relative">
                   <button className="p-3 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 transition-all duration-300 text-white hover:text-emerald-400">
                     <Bell className="w-5 h-5" />
                     {notifications.length > 0 && (
                       <span className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 text-white text-xs rounded-full flex items-center justify-center">
                         {notifications.length}
                       </span>
                     )}
                   </button>
                 </div>

                 {/* User Menu */}
                 <div className="hidden lg:flex items-center gap-4">
                   <Link 
                     to="/profile" 
                     className="flex items-center gap-2 text-slate-300 hover:text-emerald-400 transition-all duration-300 px-4 py-2 rounded-xl hover:bg-white/10 backdrop-blur-xl"
                   >
                     <User className="w-4 h-4" />
                     <span className="font-medium">Profile</span>
                   </Link>

                   {user.role === 'farmer' && (
                     <Link 
                       to="/listings/create" 
                       className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 py-2 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-emerald-500/25"
                     >
                       <Plus className="w-4 h-4" />
                       <span>Sell Produce</span>
                     </Link>
                   )}

                   <Link 
                     to="/messages" 
                     className="flex items-center gap-2 text-slate-300 hover:text-emerald-400 transition-all duration-300 px-4 py-2 rounded-xl hover:bg-white/10 backdrop-blur-xl"
                   >
                     <MessageCircle className="w-4 h-4" />
                     <span className="font-medium">Messages</span>
                   </Link>

                   {user.role === 'admin' && (
                     <Link 
                       to="/admin" 
                       className="flex items-center gap-2 text-slate-300 hover:text-emerald-400 transition-all duration-300 px-4 py-2 rounded-xl hover:bg-white/10 backdrop-blur-xl"
                     >
                       <Settings className="w-4 h-4" />
                       <span className="font-medium">Admin</span>
                     </Link>
                   )}

                   <button
                     onClick={handleLogout}
                     className="flex items-center gap-2 text-slate-300 hover:text-red-400 transition-all duration-300 px-4 py-2 rounded-xl hover:bg-red-500/10"
                   >
                     <LogOut className="w-4 h-4" />
                     <span className="font-medium">Logout</span>
                   </button>
                 </div>

                 {/* Mobile Menu Button */}
                 <button
                   onClick={() => setIsMenuOpen(!isMenuOpen)}
                   className="lg:hidden p-3 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 transition-all duration-300 text-white"
                 >
                   <Menu className="w-5 h-5" />
                 </button>
               </>
             ) : (
               <div className="flex items-center gap-4">
                 <Link 
                   to="/login" 
                   className="text-slate-300 hover:text-emerald-400 transition-all duration-300 px-4 py-2 rounded-xl hover:bg-white/10 backdrop-blur-xl font-medium"
                 >
                   Login
                 </Link>
                 <Link 
                   to="/register" 
                   className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 py-2 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-emerald-500/25"
                 >
                   Join Now
                 </Link>
               </div>
             )}
           </div>
         </div>
       </div>

       {/* Mobile Menu */}
       {isMenuOpen && user && (
         <div className="lg:hidden bg-slate-900/95 backdrop-blur-xl border-t border-white/10">
           <div className="px-6 py-6 space-y-4">
             {/* Navigation Items */}
             {navigationItems.map((item) => (
               <Link
                 key={item.name}
                 to={item.href}
                 className="flex items-center gap-3 text-slate-300 hover:text-emerald-400 transition-all duration-300 px-4 py-3 rounded-xl hover:bg-white/10"
                 onClick={() => setIsMenuOpen(false)}
               >
                 {item.icon}
                 <span className="font-medium">{item.name}</span>
               </Link>
             ))}

             <div className="border-t border-white/10 pt-4 space-y-4">
               <Link 
                 to="/profile" 
                 className="flex items-center gap-3 text-slate-300 hover:text-emerald-400 transition-all duration-300 px-4 py-3 rounded-xl hover:bg-white/10"
                 onClick={() => setIsMenuOpen(false)}
               >
                 <User className="w-4 h-4" />
                 <span className="font-medium">Profile</span>
               </Link>

               {user.role === 'farmer' && (
                 <Link 
                   to="/listings/create" 
                   className="flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-3 rounded-xl font-semibold"
                   onClick={() => setIsMenuOpen(false)}
                 >
                   <Plus className="w-4 h-4" />
                   <span>Sell Produce</span>
                 </Link>
               )}

               <Link 
                 to="/messages" 
                 className="flex items-center gap-3 text-slate-300 hover:text-emerald-400 transition-all duration-300 px-4 py-3 rounded-xl hover:bg-white/10"
                 onClick={() => setIsMenuOpen(false)}
               >
                 <MessageCircle className="w-4 h-4" />
                 <span className="font-medium">Messages</span>
               </Link>

               {user.role === 'admin' && (
                 <Link 
                   to="/admin" 
                   className="flex items-center gap-3 text-slate-300 hover:text-emerald-400 transition-all duration-300 px-4 py-3 rounded-xl hover:bg-white/10"
                   onClick={() => setIsMenuOpen(false)}
                 >
                   <Settings className="w-4 h-4" />
                   <span className="font-medium">Admin</span>
                 </Link>
               )}

               <button
                 onClick={() => {
                   handleLogout();
                   setIsMenuOpen(false);
                 }}
                 className="flex items-center gap-3 text-slate-300 hover:text-red-400 transition-all duration-300 px-4 py-3 rounded-xl hover:bg-red-500/10 w-full text-left"
               >
                 <LogOut className="w-4 h-4" />
                 <span className="font-medium">Logout</span>
               </button>
             </div>
           </div>
         </div>
       )}
     </header>

     {/* Main Content */}
     <main className="flex-1 w-full">
       <Outlet />
     </main>

     {/* Enhanced Notification System */}
     <div className="fixed bottom-6 right-6 space-y-3 z-50">
       {notifications.map((notification) => (
         <div
           key={notification.id}
           className={`px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-xl border transition-all duration-500 transform hover:scale-105 ${
             notification.type === 'error'
               ? 'bg-red-500/90 border-red-400/50 text-white'
               : notification.type === 'warning'
               ? 'bg-yellow-500/90 border-yellow-400/50 text-white'
               : 'bg-emerald-500/90 border-emerald-400/50 text-white'
           }`}
         >
           <div className="flex justify-between items-center">
             <div className="flex items-center gap-3">
               <div className={`w-2 h-2 rounded-full ${
                 notification.type === 'error' 
                   ? 'bg-red-300' 
                   : notification.type === 'warning'
                   ? 'bg-yellow-300'
                   : 'bg-emerald-300'
               } animate-pulse`} />
               <span className="font-medium">{notification.message}</span>
             </div>
             <button
               onClick={() => removeNotification(notification.id)}
               className="ml-4 p-1 hover:bg-white/20 rounded-full transition-colors duration-200"
             >
               <X className="w-4 h-4" />
             </button>
           </div>
         </div>
       ))}
     </div>

     {/* Modern Footer */}
     <footer className="w-full bg-slate-900/50 backdrop-blur-xl border-t border-white/10 mt-16">
       <div className="w-full px-6 py-12">
         <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
           {/* Company Info */}
           <div className="space-y-4">
             <div className="flex items-center gap-3">
               <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                 <Leaf className="w-5 h-5 text-white" />
               </div>
               <span className="text-xl font-bold text-white">Agri-Link</span>
             </div>
             <p className="text-slate-400 text-sm leading-relaxed">
               Connecting South African farmers with advanced technology and direct market access.
             </p>
             <div className="flex items-center gap-4 text-sm text-slate-400">
               <span>47,000+ Farmers</span>
               <span>•</span>
               <span>9 Provinces</span>
               <span>•</span>
               <span>R2.84B Volume</span>
             </div>
           </div>

           {/* Quick Links */}
           <div className="space-y-4">
             <h3 className="text-white font-semibold">Platform</h3>
             <div className="space-y-2">
               <Link to="/market" className="block text-slate-400 hover:text-emerald-400 transition-colors text-sm">Market Prices</Link>
               <Link to="/analytics" className="block text-slate-400 hover:text-emerald-400 transition-colors text-sm">Analytics</Link>
               <Link to="/network" className="block text-slate-400 hover:text-emerald-400 transition-colors text-sm">Farmer Network</Link>
               <Link to="/resources" className="block text-slate-400 hover:text-emerald-400 transition-colors text-sm">Resources</Link>
             </div>
           </div>

           {/* Support */}
           <div className="space-y-4">
             <h3 className="text-white font-semibold">Support</h3>
             <div className="space-y-2">
               <Link to="/help" className="block text-slate-400 hover:text-emerald-400 transition-colors text-sm">Help Center</Link>
               <Link to="/contact" className="block text-slate-400 hover:text-emerald-400 transition-colors text-sm">Contact Us</Link>
               <Link to="/privacy" className="block text-slate-400 hover:text-emerald-400 transition-colors text-sm">Privacy Policy</Link>
               <Link to="/terms" className="block text-slate-400 hover:text-emerald-400 transition-colors text-sm">Terms of Service</Link>
             </div>
           </div>

           {/* Contact Info */}
           <div className="space-y-4">
             <h3 className="text-white font-semibold">Contact</h3>
             <div className="space-y-2 text-sm text-slate-400">
               <p>📧 support@agri-link.co.za</p>
               <p>📞 +27 11 234 5678</p>
               <p>📍 Johannesburg, South Africa</p>
               <div className="flex items-center gap-2 mt-4">
                 <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                 <span>24/7 Support Available</span>
               </div>
             </div>
           </div>
         </div>

         <div className="border-t border-white/10 mt-12 pt-8 text-center">
           <p className="text-slate-400 text-sm">
             © {new Date().getFullYear()} Agri-Link. Empowering South African Agriculture. All rights reserved.
           </p>
         </div>
       </div>
     </footer>
   </div>
 );
};

export default MainLayout;