import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { 
 LayoutDashboard, 
 ShoppingCart, 
 TrendingUp, 
 MessageCircle, 
 User, 
 Settings, 
 LogOut,
 Bell,
 Search,
 Menu,
 X,
 Leaf,
 BarChart3,
 Users,
 Package,
 Globe,
 Activity,
 Target,
 Truck,
 DollarSign,
 Calendar,
 ChevronRight,
 Minimize2,
 Maximize2
} from 'lucide-react';

const DashboardLayout = () => {
 const { logout, user } = useAuth();
 const navigate = useNavigate();
 const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
 const [activeItem, setActiveItem] = useState('dashboard');
 const [notifications, setNotifications] = useState(3);

 const handleLogout = async () => {
   await logout();
   navigate('/');
 };

 // Dashboard navigation items
 const navigationItems = [
   {
     id: 'dashboard',
     name: 'Dashboard',
     href: '/dashboard',
     icon: <LayoutDashboard className="w-5 h-5" />,
     color: 'from-blue-500 to-cyan-500'
   },
   {
     id: 'marketplace',
     name: 'Marketplace',
     href: '/listings',
     icon: <ShoppingCart className="w-5 h-5" />,
     color: 'from-emerald-500 to-teal-500'
   },
   {
     id: 'market',
     name: 'Market Prices',
     href: '/market',
     icon: <TrendingUp className="w-5 h-5" />,
     color: 'from-purple-500 to-pink-500'
   },
   {
     id: 'analytics',
     name: 'Analytics',
     href: '/analytics',
     icon: <BarChart3 className="w-5 h-5" />,
     color: 'from-orange-500 to-red-500'
   },
   {
     id: 'messages',
     name: 'Messages',
     href: '/messages',
     icon: <MessageCircle className="w-5 h-5" />,
     color: 'from-green-500 to-emerald-500'
   },
   {
     id: 'network',
     name: 'Network',
     href: '/network',
     icon: <Users className="w-5 h-5" />,
     color: 'from-indigo-500 to-purple-500'
   }
 ];

 // Farmer-specific items
 const farmerItems = [
   {
     id: 'inventory',
     name: 'My Produce',
     href: '/inventory',
     icon: <Package className="w-5 h-5" />,
     color: 'from-yellow-500 to-orange-500'
   },
   {
     id: 'orders',
     name: 'Orders',
     href: '/orders',
     icon: <Truck className="w-5 h-5" />,
     color: 'from-teal-500 to-cyan-500'
   },
   {
     id: 'earnings',
     name: 'Earnings',
     href: '/earnings',
     icon: <DollarSign className="w-5 h-5" />,
     color: 'from-green-500 to-teal-500'
   }
 ];

 // Quick stats for sidebar
 const quickStats = [
   { label: 'Active Listings', value: '12', change: '+3', color: 'text-emerald-400' },
   { label: 'Messages', value: '8', change: '+2', color: 'text-blue-400' },
   { label: 'This Month', value: 'R24.5K', change: '+18%', color: 'text-purple-400' }
 ];

 return (
   <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900">
     {/* Modern Glassmorphism Sidebar */}
     <nav className={`${
       sidebarCollapsed ? 'w-20' : 'w-80'
     } transition-all duration-500 bg-slate-900/60 backdrop-blur-xl border-r border-white/10 flex flex-col relative`}>
       
       {/* Sidebar Header */}
       <div className="p-6 border-b border-white/10">
         <div className="flex items-center justify-between">
           {!sidebarCollapsed && (
             <div 
               className="flex items-center gap-3 cursor-pointer group" 
               onClick={() => navigate('/dashboard')}
             >
               <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                 <Leaf className="w-6 h-6 text-white" />
               </div>
               <div>
                 <h1 className="text-xl font-black text-white">Agri-Link</h1>
                 <p className="text-xs text-slate-400">Dashboard</p>
               </div>
             </div>
           )}
           
           <button
             onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
             className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors duration-300"
           >
             {sidebarCollapsed ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
           </button>
         </div>
       </div>

       {/* User Profile Section */}
       {!sidebarCollapsed && (
         <div className="p-6 border-b border-white/10">
           <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
               <User className="w-6 h-6 text-white" />
             </div>
             <div className="flex-1">
               <h3 className="text-white font-semibold">{user?.name || 'Farmer'}</h3>
               <p className="text-slate-400 text-sm capitalize">{user?.role || 'Farmer'}</p>
               <div className="flex items-center gap-2 mt-1">
                 <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                 <span className="text-xs text-emerald-400">Online</span>
               </div>
             </div>
           </div>
         </div>
       )}

       {/* Quick Stats */}
       {!sidebarCollapsed && (
         <div className="p-6 border-b border-white/10">
           <h4 className="text-slate-400 text-xs font-semibold uppercase tracking-wide mb-4">Quick Overview</h4>
           <div className="space-y-3">
             {quickStats.map((stat, index) => (
               <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10">
                 <div>
                   <p className="text-slate-400 text-xs">{stat.label}</p>
                   <p className="text-white font-bold">{stat.value}</p>
                 </div>
                 <span className={`text-xs font-semibold ${stat.color}`}>{stat.change}</span>
               </div>
             ))}
           </div>
         </div>
       )}

       {/* Navigation Items */}
       <div className="flex-1 p-6 space-y-2">
         <div className="mb-6">
           {!sidebarCollapsed && <h4 className="text-slate-400 text-xs font-semibold uppercase tracking-wide mb-4">Main Menu</h4>}
           {navigationItems.map((item) => (
             <Link
               key={item.id}
               to={item.href}
               className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 group relative overflow-hidden ${
                 activeItem === item.id
                   ? 'bg-white/10 text-white shadow-lg'
                   : 'text-slate-400 hover:text-white hover:bg-white/5'
               }`}
               onClick={() => setActiveItem(item.id)}
             >
               <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                 activeItem === item.id 
                   ? `bg-gradient-to-r ${item.color} text-white shadow-lg` 
                   : 'bg-white/10 text-slate-400 group-hover:text-white'
               }`}>
                 {item.icon}
               </div>
               {!sidebarCollapsed && (
                 <span className="font-semibold">{item.name}</span>
               )}
               {!sidebarCollapsed && activeItem === item.id && (
                 <ChevronRight className="w-4 h-4 ml-auto" />
               )}
             </Link>
           ))}
         </div>

         {/* Farmer-specific section */}
         {user?.role === 'farmer' && (
           <div className="mb-6">
             {!sidebarCollapsed && <h4 className="text-slate-400 text-xs font-semibold uppercase tracking-wide mb-4">Farming Tools</h4>}
             {farmerItems.map((item) => (
               <Link
                 key={item.id}
                 to={item.href}
                 className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 group ${
                   activeItem === item.id
                     ? 'bg-white/10 text-white shadow-lg'
                     : 'text-slate-400 hover:text-white hover:bg-white/5'
                 }`}
                 onClick={() => setActiveItem(item.id)}
               >
                 <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                   activeItem === item.id 
                     ? `bg-gradient-to-r ${item.color} text-white shadow-lg` 
                     : 'bg-white/10 text-slate-400 group-hover:text-white'
                 }`}>
                   {item.icon}
                 </div>
                 {!sidebarCollapsed && (
                   <span className="font-semibold">{item.name}</span>
                 )}
               </Link>
               ))}
           </div>
         )}

         {/* Admin section */}
         {user?.roles?.includes('admin') && (
           <div className="mb-6">
             {!sidebarCollapsed && <h4 className="text-slate-400 text-xs font-semibold uppercase tracking-wide mb-4">Administration</h4>}
             <Link
               to="/admin"
               className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 group ${
                 activeItem === 'admin'
                   ? 'bg-white/10 text-white shadow-lg'
                   : 'text-slate-400 hover:text-white hover:bg-white/5'
               }`}
               onClick={() => setActiveItem('admin')}
             >
               <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                 activeItem === 'admin' 
                   ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg' 
                   : 'bg-white/10 text-slate-400 group-hover:text-white'
               }`}>
                 <Settings className="w-5 h-5" />
               </div>
               {!sidebarCollapsed && (
                 <span className="font-semibold">Admin Panel</span>
               )}
             </Link>
           </div>
         )}
       </div>

       {/* Settings and Logout */}
       <div className="p-6 border-t border-white/10 space-y-2">
         <Link
           to="/profile"
           className="flex items-center gap-4 p-4 rounded-2xl text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-300 group"
         >
           <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
             <User className="w-5 h-5" />
           </div>
           {!sidebarCollapsed && <span className="font-semibold">Profile Settings</span>}
         </Link>

         <button
           onClick={handleLogout}
           className="flex items-center gap-4 p-4 rounded-2xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300 group w-full"
         >
           <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
             <LogOut className="w-5 h-5" />
           </div>
           {!sidebarCollapsed && <span className="font-semibold">Logout</span>}
         </button>
       </div>
     </nav>

     {/* Main Content Area */}
     <main className="flex-1 flex flex-col overflow-hidden">
       {/* Top Header Bar */}
       <header className="bg-slate-900/40 backdrop-blur-xl border-b border-white/10 p-6">
         <div className="flex items-center justify-between">
           {/* Page Title and Breadcrumb */}
           <div>
             <h1 className="text-2xl font-bold text-white mb-1">Dashboard</h1>
             <div className="flex items-center gap-2 text-sm text-slate-400">
               <span>Home</span>
               <ChevronRight className="w-4 h-4" />
               <span className="text-emerald-400">Dashboard</span>
             </div>
           </div>

           {/* Header Actions */}
           <div className="flex items-center gap-4">
             {/* Search */}
             <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl px-4 py-2">
               <Search className="w-4 h-4 text-slate-400" />
               <input
                 type="text"
                 placeholder="Search..."
                 className="bg-transparent text-white placeholder-slate-400 text-sm w-48 focus:outline-none"
               />
             </div>

             {/* Notifications */}
             <button className="relative p-3 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 transition-colors text-white">
               <Bell className="w-5 h-5" />
               {notifications > 0 && (
                 <span className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 text-white text-xs rounded-full flex items-center justify-center">
                   {notifications}
                 </span>
               )}
             </button>

             {/* Current Time */}
             <div className="px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl">
               <div className="flex items-center gap-2 text-slate-300">
                 <Calendar className="w-4 h-4" />
                 <span className="text-sm font-medium">
                   {new Date().toLocaleDateString('en-ZA', { 
                     weekday: 'short',
                     month: 'short',
                     day: 'numeric',
                     hour: '2-digit',
                     minute: '2-digit'
                   })}
                 </span>
               </div>
             </div>
           </div>
         </div>
       </header>

       {/* Main Content */}
       <div className="flex-1 p-6 overflow-y-auto bg-slate-800/20">
         <Outlet />
       </div>
     </main>
   </div>
 );
};

export default DashboardLayout;