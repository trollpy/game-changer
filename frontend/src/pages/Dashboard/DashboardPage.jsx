import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { 
 FiPackage, 
 FiDollarSign, 
 FiUsers, 
 FiMessageSquare,
 FiCalendar,
 FiTrendingUp,
 FiSun,
 FiDroplet,
 FiArrowUp,
 FiArrowDown,
 FiClock,
 FiMapPin
} from 'react-icons/fi';

const DashboardPage = () => {
 const { user } = useAuth();
 const [currentTime, setCurrentTime] = useState(new Date());
 const [animatedValues, setAnimatedValues] = useState({
   listings: 0,
   revenue: 0,
   messages: 0
 });

 // Update time every minute
 useEffect(() => {
   const timer = setInterval(() => setCurrentTime(new Date()), 60000);
   return () => clearInterval(timer);
 }, []);

 // Animate numbers on load
 useEffect(() => {
   const timers = [];
   
   // Animate listings count
   let listingsCount = 0;
   const listingsTimer = setInterval(() => {
     if (listingsCount < 24) {
       listingsCount++;
       setAnimatedValues(prev => ({ ...prev, listings: listingsCount }));
     }
   }, 50);
   timers.push(listingsTimer);

   // Animate revenue
   let revenueCount = 0;
   const revenueTimer = setInterval(() => {
     if (revenueCount < 18450) {
       revenueCount += 450;
       setAnimatedValues(prev => ({ ...prev, revenue: revenueCount }));
     }
   }, 40);
   timers.push(revenueTimer);

   // Animate messages
   let messagesCount = 0;
   const messagesTimer = setInterval(() => {
     if (messagesCount < 5) {
       messagesCount++;
       setAnimatedValues(prev => ({ ...prev, messages: messagesCount }));
     }
   }, 200);
   timers.push(messagesTimer);

   // Cleanup
   setTimeout(() => {
     timers.forEach(timer => clearInterval(timer));
   }, 2000);

   return () => {
     timers.forEach(timer => clearInterval(timer));
   };
 }, []);

 const getGreeting = () => {
   const hour = currentTime.getHours();
   if (hour < 12) return "Good morning";
   if (hour < 17) return "Good afternoon";
   return "Good evening";
 };

 const stats = [
   { 
     title: 'Active Listings', 
     value: animatedValues.listings, 
     icon: <FiPackage className="text-green-600" />, 
     change: '+12% this week',
     trend: 'up',
     link: '/listings',
     color: 'bg-green-50 border-green-200'
   },
   { 
     title: 'Monthly Revenue', 
     value: `R${animatedValues.revenue.toLocaleString()}`, 
     icon: <FiDollarSign className="text-blue-600" />, 
     change: '+8% from last month',
     trend: 'up',
     link: '/market',
     color: 'bg-blue-50 border-blue-200'
   },
   { 
     title: 'New Messages', 
     value: animatedValues.messages, 
     icon: <FiMessageSquare className="text-purple-600" />, 
     change: '2 unread',
     trend: 'neutral',
     link: '/messages',
     color: 'bg-purple-50 border-purple-200'
   },
   { 
     title: 'Market Trends', 
     value: 'Up 3.2%', 
     icon: <FiTrendingUp className="text-amber-600" />, 
     change: 'Tomatoes leading 🍅',
     trend: 'up',
     link: '/market',
     color: 'bg-amber-50 border-amber-200'
   },
 ];

 const recentActivity = [
   { 
     id: 1, 
     type: 'Listing', 
     action: '🌽 New maize listing is live and getting attention!', 
     time: '2 hours ago', 
     link: '/listings/123',
     priority: 'high'
   },
   { 
     id: 2, 
     type: 'Message', 
     action: '💬 Sarah from Pretoria wants to buy your potatoes', 
     time: '5 hours ago', 
     link: '/messages/456',
     priority: 'high'
   },
   { 
     id: 3, 
     type: 'Market', 
     action: '📈 Great news! Tomato prices jumped 15%', 
     time: '1 day ago', 
     link: '/market',
     priority: 'medium'
   },
   { 
     id: 4, 
     type: 'Profile', 
     action: '✅ Profile updated - looking good!', 
     time: '2 days ago', 
     link: '/profile/edit',
     priority: 'low'
   },
 ];

 const quickActions = [
   { 
     title: 'List New Produce', 
     subtitle: 'Got fresh harvest?',
     icon: <FiPackage size={22} />, 
     link: '/listings/create',
     color: 'hover:bg-green-50 hover:border-green-300'
   },
   { 
     title: 'Check Market Prices', 
     subtitle: 'Stay competitive',
     icon: <FiDollarSign size={22} />, 
     link: '/market',
     color: 'hover:bg-blue-50 hover:border-blue-300'
   },
   { 
     title: 'View Messages', 
     subtitle: 'Connect with buyers',
     icon: <FiMessageSquare size={22} />, 
     link: '/messages',
     color: 'hover:bg-purple-50 hover:border-purple-300'
   },
   { 
     title: 'Update Profile', 
     subtitle: 'Keep info fresh',
     icon: <FiUsers size={22} />, 
     link: '/profile/edit',
     color: 'hover:bg-amber-50 hover:border-amber-300'
   },
 ];

 const weatherInfo = {
   temp: "24°C",
   condition: "Perfect for harvesting",
   icon: <FiSun className="text-yellow-500" />
 };

 return (
   <div 
     className="min-h-screen bg-cover bg-center bg-fixed"
     style={{
       backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.85)), url('https://images.unsplash.com/photo-1574943320219-553eb213f72d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80')`
     }}
   >
     <div className="p-6">
       {/* Welcome Header with Weather */}
       <div className="mb-8 relative">
         <div className="flex flex-col md:flex-row md:justify-between md:items-start">
           <div>
             <h1 className="text-3xl font-bold text-gray-800 mb-2">
               {getGreeting()}, {user?.firstName || 'Farmer'}! 🌱
             </h1>
             <p className="text-gray-600 text-lg">
               Ready to grow something amazing today?
             </p>
             <div className="flex items-center mt-3 text-sm text-gray-500">
               <FiMapPin size={14} className="mr-1" />
               <span>Gauteng, South Africa</span>
               <span className="mx-2">•</span>
               <FiClock size={14} className="mr-1" />
               <span>{currentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
             </div>
           </div>
           
           <div className="mt-4 md:mt-0 bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/50">
             <div className="flex items-center space-x-3">
               {weatherInfo.icon}
               <div>
                 <p className="font-semibold text-gray-800">{weatherInfo.temp}</p>
                 <p className="text-sm text-gray-600">{weatherInfo.condition}</p>
               </div>
             </div>
           </div>
         </div>
       </div>

       {/* Stats Cards */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
         {stats.map((stat, index) => (
           <Link 
             to={stat.link} 
             key={index}
             className={`${stat.color} bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border p-6 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 transform`}
           >
             <div className="flex justify-between items-start">
               <div>
                 <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                 <p className="text-3xl font-bold mt-2 text-gray-800">{stat.value}</p>
               </div>
               <div className="p-3 rounded-xl bg-white/80 shadow-sm">
                 {stat.icon}
               </div>
             </div>
             <div className="flex items-center mt-4">
               {stat.trend === 'up' && <FiArrowUp className="text-green-500 mr-1" size={14} />}
               {stat.trend === 'down' && <FiArrowDown className="text-red-500 mr-1" size={14} />}
               <p className="text-sm text-gray-600 font-medium">
                 {stat.change}
               </p>
             </div>
           </Link>
         ))}
       </div>

       {/* Two Column Layout */}
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Quick Actions */}
         <div className="lg:col-span-1">
           <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm p-6 border border-white/50">
             <h2 className="text-xl font-bold mb-6 text-gray-800">Quick Actions</h2>
             <div className="space-y-3">
               {quickActions.map((action, index) => (
                 <Link
                   to={action.link}
                   key={index}
                   className={`flex items-center p-4 rounded-xl border border-gray-200 ${action.color} transition-all duration-200 transform hover:scale-[1.02] bg-white/70`}
                 >
                   <div className="p-3 mr-4 rounded-xl bg-white shadow-sm text-gray-700">
                     {action.icon}
                   </div>
                   <div>
                     <span className="font-semibold text-gray-800 block">{action.title}</span>
                     <span className="text-sm text-gray-600">{action.subtitle}</span>
                   </div>
                 </Link>
               ))}
             </div>
           </div>
         </div>

         {/* Recent Activity */}
         <div className="lg:col-span-2">
           <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm p-6 border border-white/50">
             <div className="flex justify-between items-center mb-6">
               <h2 className="text-xl font-bold text-gray-800">What's Happening</h2>
               <Link to="/activity" className="text-sm text-blue-600 hover:text-blue-800 font-medium hover:underline">
                 View All Activity
               </Link>
             </div>
             <div className="space-y-4">
               {recentActivity.map((activity) => (
                 <Link
                   to={activity.link}
                   key={activity.id}
                   className={`flex items-start p-4 rounded-xl hover:bg-white/70 transition-all duration-200 border border-transparent hover:border-gray-200 ${
                     activity.priority === 'high' ? 'bg-blue-50/80' : 'bg-white/50'
                   }`}
                 >
                   <div className="p-2 mr-4 rounded-lg bg-white shadow-sm text-gray-600">
                     {activity.type === 'Listing' && <FiPackage size={18} />}
                     {activity.type === 'Message' && <FiMessageSquare size={18} />}
                     {activity.type === 'Market' && <FiTrendingUp size={18} />}
                     {activity.type === 'Profile' && <FiUsers size={18} />}
                   </div>
                   <div className="flex-1">
                     <p className="font-medium text-gray-800 leading-relaxed">{activity.action}</p>
                     <p className="text-sm text-gray-500 mt-1 flex items-center">
                       <FiClock size={12} className="mr-1" />
                       {activity.time}
                     </p>
                   </div>
                 </Link>
               ))}
             </div>
           </div>
         </div>
       </div>

       {/* Market Insights Section */}
       <div className="mt-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm p-6 border border-white/50">
         <h2 className="text-xl font-bold mb-4 text-gray-800">Today's Market Pulse 📊</h2>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           <div className="bg-green-50/80 rounded-lg p-4 border border-green-200">
             <div className="flex items-center justify-between">
               <span className="text-sm font-medium text-green-800">🥔 Potatoes</span>
               <span className="text-green-600 font-bold">R12.50/kg</span>
             </div>
             <p className="text-xs text-green-600 mt-1">↗ +15% this week</p>
           </div>
           <div className="bg-blue-50/80 rounded-lg p-4 border border-blue-200">
             <div className="flex items-center justify-between">
               <span className="text-sm font-medium text-blue-800">🌽 Maize</span>
               <span className="text-blue-600 font-bold">R8.20/kg</span>
             </div>
             <p className="text-xs text-blue-600 mt-1">→ Stable</p>
           </div>
           <div className="bg-amber-50/80 rounded-lg p-4 border border-amber-200">
             <div className="flex items-center justify-between">
               <span className="text-sm font-medium text-amber-800">🍅 Tomatoes</span>
               <span className="text-amber-600 font-bold">R25.80/kg</span>
             </div>
             <p className="text-xs text-amber-600 mt-1">↗ +22% trending!</p>
           </div>
         </div>
       </div>
     </div>
   </div>
 );
};

export default DashboardPage;