import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Leaf, 
  TrendingUp, 
  Users, 
  Zap,
  Star,
  ArrowRight,
  Play,
  Shield,
  Globe,
  Award,
  CheckCircle,
  ChevronDown,
  Sparkles,
  BarChart3,
  MessageCircle,
  Heart,
  MapPin,
  Calendar,
  Target,
  Maximize2,
  TrendingDown,
  Activity,
  Phone,
  Video,
  Send,
  Clock,
  DollarSign,
  Package,
  Truck,
  Eye,
  RotateCcw
} from 'lucide-react';

const Home = () => {
  const { user } = useAuth();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeProvince, setActiveProvince] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [expandedProvince, setExpandedProvince] = useState(null);
  const [flipCard, setFlipCard] = useState(null);
  const [marketData, setMarketData] = useState([]);

  // Mouse tracking for interactive elements
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove);
      return () => heroElement.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  // Live clock and market data updates
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      // Simulate market data updates
      setMarketData(prevData => {
        return prevData.map(item => ({
          ...item,
          price: `R${(Math.random() * 5000 + 1000).toFixed(0)}/ton`,
          change: `${Math.random() > 0.5 ? '+' : ''}${(Math.random() * 15 + 5).toFixed(0)}%`
        }));
      });
    }, 60000); // Update every minute

    // Initial market data
    setMarketData([
      { 
        crop: 'Maize', 
        price: 'R4,250/ton', 
        change: '+12%', 
        location: 'Free State', 
        volume: '6,349,100 tons',
        marketShare: '42%',
        trend: 'up'
      },
      { 
        crop: 'Citrus', 
        price: 'R15,940/ton', 
        change: '+22%', 
        location: 'Limpopo', 
        volume: '85,000 tons',
        marketShare: '21%',
        trend: 'up'
      },
      { 
        crop: 'Wine Grapes', 
        price: 'R24,520/ton', 
        change: '+15%', 
        location: 'Western Cape', 
        volume: '95,000 ha',
        marketShare: '95%',
        trend: 'up'
      },
      { 
        crop: 'Sugarcane', 
        price: 'R890/ton', 
        change: '+8%', 
        location: 'KwaZulu-Natal', 
        volume: '1.5M tons',
        marketShare: '78%',
        trend: 'up'
      }
    ]);

    return () => clearInterval(timer);
  }, []);

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Complete South African provinces with real agricultural data
  const provinces = [
    {
      name: 'Gauteng',
      coords: { x: 55, y: 45 },
      color: 'from-purple-500 to-pink-600',
      livestock: {
        cattle: '138,000',
        sheep: '50,000',
        goats: '22,000',
        poultry: '18% national'
      },
      crops: {
        vegetables: '12,000 ha',
        maize: '30,000 tons',
        nursery: 'Major hub'
      },
      keyProduce: ['Vegetables', 'Poultry', 'Nursery Plants'],
      economicValue: 'R45.2B',
      farmers: '3,247'
    },
    {
      name: 'KwaZulu-Natal',
      coords: { x: 70, y: 65 },
      color: 'from-blue-500 to-cyan-600',
      livestock: {
        cattle: '1,960,000',
        sheep: '290,000',
        goats: '320,000',
        dairy: '85M litres'
      },
      crops: {
        sugarcane: '1.5M tons',
        maize: '920,000 tons',
        citrus: '85,000 tons',
        forestry: '400,000 ha'
      },
      keyProduce: ['Sugarcane', 'Timber', 'Citrus'],
      economicValue: 'R89.7B',
      farmers: '4,892'
    },
    {
      name: 'Northern Cape',
      coords: { x: 35, y: 55 },
      color: 'from-orange-500 to-red-600',
      livestock: {
        cattle: '470,000',
        sheep: '2.2M',
        goats: '160,000',
        game: 'Major hub'
      },
      crops: {
        wheat: '55,000 tons',
        barley: '62,000 tons',
        maize: '140,000 tons',
        grapes: 'Emerging'
      },
      keyProduce: ['Wool', 'Game', 'Grains'],
      economicValue: 'R23.8B',
      farmers: '2,156'
    },
    {
      name: 'North West',
      coords: { x: 45, y: 40 },
      color: 'from-green-500 to-emerald-600',
      livestock: {
        cattle: '1,063,000',
        sheep: '1,150,000',
        goats: '150,000',
        poultry: '8% national'
      },
      crops: {
        maize: '380,000 tons',
        sunflowers: '25,000 ha',
        groundnuts: 'Major producer'
      },
      keyProduce: ['Maize', 'Sunflowers', 'Cattle'],
      economicValue: 'R34.6B',
      farmers: '5,234'
    },
    {
      name: 'Eastern Cape',
      coords: { x: 60, y: 80 },
      color: 'from-teal-500 to-blue-600',
      livestock: {
        cattle: '1.7M',
        sheep: '3.4M',
        goats: '1M',
        poultry: '10% national'
      },
      crops: {
        maize: '650,000 tons',
        forestry: 'Major employer',
        citrus: 'Emerging'
      },
      keyProduce: ['Wool', 'Forestry', 'Maize'],
      economicValue: 'R41.3B',
      farmers: '6,789'
    },
    {
      name: 'Western Cape',
      coords: { x: 25, y: 85 },
      color: 'from-violet-500 to-purple-600',
      livestock: {
        cattle: '280,000',
        sheep: '2.7M',
        poultry: '14% national',
        dairy: '80M litres'
      },
      crops: {
        winegrapes: '95,000 ha',
        citrus: '50% exports',
        deciduous: 'Major hub',
        wheat: 'Swartland region'
      },
      keyProduce: ['Wine', 'Citrus', 'Deciduous Fruit'],
      economicValue: 'R67.9B',
      farmers: '3,847'
    },
    {
      name: 'Limpopo',
      coords: { x: 60, y: 25 },
      color: 'from-amber-500 to-orange-600',
      livestock: {
        cattle: '850,000',
        sheep: '165,000',
        goats: '590,000'
      },
      crops: {
        citrus: '8,000 ha',
        mangoes: '4,000 ha',
        cotton: '6,000 ha',
        forestry: '17,000 ha'
      },
      keyProduce: ['Citrus', 'Tropical Fruit', 'Cotton'],
      economicValue: 'R28.4B',
      farmers: '7,543'
    },
    {
      name: 'Mpumalanga',
      coords: { x: 65, y: 45 },
      color: 'from-emerald-500 to-teal-600',
      livestock: {
        cattle: '1,243,000',
        sheep: '1,508,000',
        goats: '76,000',
        poultry: '22.5% national'
      },
      crops: {
        maize: '1M tons',
        citrus: '21% national',
        bananas: '20% national',
        forestry: 'Major producer'
      },
      keyProduce: ['Citrus', 'Bananas', 'Maize'],
      economicValue: 'R52.1B',
      farmers: '4,623'
    },
    {
      name: 'Free State',
      coords: { x: 50, y: 60 },
      color: 'from-rose-500 to-pink-600',
      livestock: {
        cattle: '2,023,000',
        sheep: '4,362,000',
        goats: '211,000',
        poultry: '15.5% eggs'
      },
      crops: {
        maize: '6.3M tons',
        sunflowers: '56% national',
        soybeans: '47% national',
        wheat: '16% national'
      },
      keyProduce: ['Maize', 'Sunflowers', 'Wool'],
      economicValue: 'R78.6B',
      farmers: '8,947'
    }
  ];

  // Real-time business analytics
  const businessAnalytics = [
    {
      title: 'Agricultural GDP Contribution',
      value: 'R389.2B',
      change: '+8.3%',
      icon: <TrendingUp className="w-6 h-6" />,
      trend: 'up'
    },
    {
      title: 'Total Livestock Value',
      value: 'R156.7B',
      change: '+12.1%',
      icon: <Activity className="w-6 h-6" />,
      trend: 'up'
    },
    {
      title: 'Crop Production Volume',
      value: '45.2M tons',
      change: '+5.7%',
      icon: <Package className="w-6 h-6" />,
      trend: 'up'
    },
    {
      title: 'Export Revenue',
      value: 'R167.8B',
      change: '+18.4%',
      icon: <Globe className="w-6 h-6" />,
      trend: 'up'
    }
  ];

  // Enhanced features with flip cards
  const features = [
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Smart Farming Solutions",
      description: "Advanced agricultural technology for South African conditions",
      details: "Precision agriculture tools designed for South African climate zones. IoT sensors, satellite imagery, and AI-powered crop monitoring systems that understand local soil types and weather patterns.",
      color: "from-emerald-500 to-teal-600",
      glowColor: "shadow-emerald-500/50",
      stats: "40% yield increase",
      backContent: "Real-time monitoring of soil moisture, pH levels, and nutrient content across 9 provinces. Weather prediction models specifically trained on South African meteorological data."
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Market Intelligence",
      description: "Live commodity prices and market trends from SAFEX",
      details: "Direct integration with Johannesburg Stock Exchange agricultural commodities. Real-time pricing for maize, wheat, soybeans, and sunflower seeds with predictive analytics.",
      color: "from-blue-500 to-cyan-600",
      glowColor: "shadow-blue-500/50",
      stats: "R2.3B tracked daily",
      backContent: "Advanced algorithms analyzing price movements, supply chain disruptions, and international market impacts on South African agricultural commodities."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Farmer Network",
      description: "Connect with 47,000+ verified South African farmers",
      details: "Comprehensive networking platform connecting commercial and emerging farmers across all provinces. Knowledge sharing, equipment lending, and collaborative farming initiatives.",
      color: "from-purple-500 to-pink-600",
      glowColor: "shadow-purple-500/50",
      stats: "47K+ active users",
      backContent: "Regional farming groups, mentorship programs, and direct communication channels. Share best practices specific to South African agricultural challenges."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure Transactions",
      description: "Blockchain-secured trading platform",
      details: "End-to-end encrypted transaction system with smart contracts. Integrated with South African banking systems and agricultural insurance providers.",
      color: "from-orange-500 to-red-600",
      glowColor: "shadow-orange-500/50",
      stats: "99.9% uptime",
      backContent: "Multi-signature wallets, escrow services, and automated dispute resolution. Full compliance with South African financial regulations and agricultural standards."
    }
  ];

  const handleProvinceClick = (index) => {
    setExpandedProvince(expandedProvince === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900">
      {/* Hero Section with Glassmorphism */}
      <section 
        ref={heroRef}
        className="relative pt-36 pb-12 h-screen overflow-hidden"
      >
        {/* Animated background particles */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-emerald-400/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        {/* Interactive cursor glow */}
        <div 
          className="absolute pointer-events-none z-10 w-96 h-96 rounded-full bg-emerald-400/10 blur-3xl transition-all duration-500"
          style={{
            left: mousePos.x - 192,
            top: mousePos.y - 192,
          }}
        />

        {/* Glassmorphism background layers */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-500/10 backdrop-blur-xl rounded-full border border-emerald-400/20"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 backdrop-blur-xl rounded-full border border-blue-400/20"></div>
        </div>

        <div className="relative z-20 flex items-center justify-center h-full px-6">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left side - Main content */}
            <div className="text-white space-y-6">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-xl rounded-full border border-white/20">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold">Live from 9 provinces • R389.2B GDP</span>
                </div>
              </div>

              <h1 className="text-6xl lg:text-8xl font-black leading-none">
                South African
                <br />
                <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  Agriculture Hub
                </span>
              </h1>

              <p className="text-xl text-slate-300 leading-relaxed max-w-lg">
                Advanced agricultural platform connecting 47,000+ South African farmers with cutting-edge technology, 
                real-time market data, and direct trading capabilities.
              </p>

              <div className="flex items-center gap-6">
                <Link 
                  to={user ? "/dashboard" : "/register"}
                  className="group bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 px-10 py-5 rounded-2xl font-bold text-lg flex items-center gap-3 transition-all duration-500 shadow-2xl hover:shadow-emerald-500/25 hover:scale-105"
                >
                  {user ? "Open Dashboard" : "Join 47,000 Farmers"}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </Link>
                
                <div className="flex items-center gap-3 text-slate-400 px-4 py-2 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {currentTime.toLocaleTimeString('en-ZA', { 
                      hour: '2-digit', 
                      minute: '2-digit',
                      timeZone: 'Africa/Johannesburg'
                    })} SAST
                  </span>
                </div>
              </div>
            </div>

            {/* Right side - Live market data with glassmorphism */}
            <div className="space-y-2">
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-bold text-xl">Live Market Analytics</h3>
                  <div className="flex items-center gap-2 text-emerald-400">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">Updated 1 min ago</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {marketData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                      <div>
                        <div className="text-white font-bold text-lg">{item.crop}</div>
                        <div className="text-slate-400 text-sm flex items-center gap-2 mt-1">
                          <MapPin className="w-3 h-3" />
                          {item.location} • {item.marketShare} market share
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-bold text-lg">{item.price}</div>
                        <div className={`text-sm font-semibold ${item.change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>
                          {item.change} • {item.volume}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Business Analytics */}
              <div className="grid grid-cols-2 gap-4">
                {businessAnalytics.map((stat, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-emerald-400">{stat.icon}</div>
                      <div className={`text-sm font-semibold ${stat.trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
                        {stat.change}
                      </div>
                    </div>
                    <div className="text-white font-bold text-xl">{stat.value}</div>
                    <div className="text-slate-400 text-xs mt-1">{stat.title}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Flip Cards */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-black text-white mb-6">
              Advanced Agricultural Technology
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Cutting-edge solutions designed specifically for South African farming conditions and market requirements
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group relative h-80 cursor-pointer"
                onMouseEnter={() => setFlipCard(index)}
                onMouseLeave={() => setFlipCard(null)}
              >
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.color} p-0.5 shadow-2xl`}>
                  {/* Front of card */}
                  <div className={`bg-slate-900/90 backdrop-blur-xl rounded-3xl p-8 h-full transition-all duration-700 ${
                    flipCard === index ? 'rotate-y-180 opacity-0' : 'rotate-y-0 opacity-100'
                  }`}>
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br ${feature.color} text-white shadow-lg`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                    <p className="text-slate-400 mb-4">{feature.description}</p>
                    <div className="text-emerald-400 font-bold text-lg">{feature.stats}</div>
                  </div>

                  {/* Back of card */}
                  <div className={`absolute inset-0 bg-slate-800/90 backdrop-blur-xl rounded-3xl p-8 transition-all duration-700 ${
                    flipCard === index ? 'rotate-y-0 opacity-100' : 'rotate-y-180 opacity-0'
                  }`}>
                    <div className="h-full flex flex-col justify-center">
                      <h4 className="text-xl font-bold text-white mb-4">Technical Details</h4>
                      <p className="text-slate-300 text-sm leading-relaxed">{feature.backContent}</p>
                      <div className="mt-6 flex items-center gap-2 text-emerald-400">
                        <Eye className="w-4 h-4" />
                        <span className="text-sm font-semibold">Learn More</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* South African Provinces Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-black text-white mb-6">
              Growing Across South Africa
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Real agricultural data from all 9 provinces. Click on any province to explore detailed farming statistics and key produce.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {provinces.map((province, index) => (
              <div 
                key={index}
                className={`relative transition-all duration-500 cursor-pointer ${
                  expandedProvince === index ? 'lg:col-span-2' : ''
                }`}
                onClick={() => handleProvinceClick(index)}
              >
                <div className={`bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 hover:bg-white/15 transition-all duration-500 h-full ${
                  expandedProvince === index ? 'ring-2 ring-emerald-400/50' : ''
                }`}>
                  
                  {/* Province Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white">{province.name}</h3>
                      <div className="flex items-center gap-4 mt-2 text-sm">
                        <span className="flex items-center gap-1 text-slate-400">
                          <Users className="w-4 h-4 text-emerald-400" />
                          {province.farmers} farmers
                        </span>
                        <span className="text-emerald-400 font-semibold">
                          {province.economicValue}
                        </span>
                      </div>
                    </div>
                    <div className={`w-4 h-4 rounded-full transition-all duration-300 ${
                      expandedProvince === index ? 'bg-emerald-400 scale-125' : 'bg-slate-600'
                    }`} />
                  </div>

                  {/* Key Produce Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {province.keyProduce.map((produce, idx) => (
                      <span key={idx} className={`px-3 py-1 bg-gradient-to-r ${province.color} text-white text-xs font-semibold rounded-full`}>
                        {produce}
                      </span>
                    ))}
                  </div>

                  {/* Expanded Content */}
                  {expandedProvince === index && (
                    <div className="grid md:grid-cols-2 gap-8 mt-8 animate-fadeIn">
                      {/* Livestock Data */}
                      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                        <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                          <Activity className="w-5 h-5 text-emerald-400" />
                          Livestock
                        </h4>
                        <div className="space-y-3">
                          {Object.entries(province.livestock).map(([animal, count], idx) => (
                            <div key={idx} className="flex justify-between items-center">
                              <span className="text-slate-400 capitalize">{animal}:</span>
                              <span className="text-white font-semibold">{count}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Crop Data */}
                      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                        <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                          <Leaf className="w-5 h-5 text-emerald-400" />
                          Crops
                        </h4>
                        <div className="space-y-3">
                          {Object.entries(province.crops).map(([crop, amount], idx) => (
                            <div key={idx} className="flex justify-between items-center">
                              <span className="text-slate-400 capitalize">{crop}:</span>
                              <span className="text-white font-semibold">{amount}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Click indicator */}
                  <div className="flex items-center justify-center mt-6">
                    <div className={`flex items-center gap-2 text-slate-400 text-sm transition-all duration-300 ${
                      expandedProvince === index ? 'text-emerald-400' : 'hover:text-white'
                    }`}>
                      {expandedProvince === index ? (
                        <>
                          <RotateCwc className="w-4 h-4" />
                          Click to collapse
                        </>
                      ) : (
                        <>
                          <Maximize2 className="w-4 h-4" />
                          Click to expand
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Real-time Chat Integration Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-black text-white mb-6">
              Real-time Communication Hub
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Connect instantly with buyers, suppliers, and agricultural experts through our integrated communication platform
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Chat Features */}
            <div className="space-y-8">
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Instant Messaging</h3>
                    <p className="text-slate-400 text-sm">Direct communication with verified traders</p>
                  </div>
                </div>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    End-to-end encrypted messaging
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    Multi-language support (11 SA languages)
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    Automated translation for seamless communication
                  </li>
                </ul>
              </div>

              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                    <Video className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Video Consultations</h3>
                    <p className="text-slate-400 text-sm">Connect with agricultural specialists</p>
                  </div>
                </div>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    HD video calls for crop inspections
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    Screen sharing for technical support
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    Record sessions for future reference
                  </li>
                </ul>
              </div>

              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">24/7 Support</h3>
                    <p className="text-slate-400 text-sm">Round-the-clock agricultural assistance</p>
                  </div>
                </div>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    AI-powered chatbot for instant responses
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    Expert agronomists available on-demand
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    Emergency weather and pest alerts
                  </li>
                </ul>
              </div>
            </div>

            {/* Mock Chat Interface */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 h-[600px] flex flex-col">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">AG</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Agri Expert</h4>
                    <span className="text-emerald-400 text-xs flex items-center gap-1">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                      Online now
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                    <Phone className="w-5 h-5 text-white" />
                  </button>
                  <button className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                    <Video className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              <div className="flex-1 space-y-4 overflow-y-auto mb-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xs">AG</span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-xl rounded-2xl rounded-tl-none p-4 max-w-xs">
                    <p className="text-white text-sm">Hello! I see you're looking for maize market prices. Current rates in Free State are R4,250/ton with a 12% increase this month.</p>
                    <span className="text-slate-400 text-xs mt-2 block">2 min ago</span>
                  </div>
                </div>

                <div className="flex gap-3 justify-end">
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl rounded-tr-none p-4 max-w-xs">
                    <p className="text-white text-sm">That's great! What about transportation costs to Johannesburg markets?</p>
                    <span className="text-blue-200 text-xs mt-2 block">1 min ago</span>
                  </div>
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xs">You</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xs">AG</span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-xl rounded-2xl rounded-tl-none p-4 max-w-xs">
                    <p className="text-white text-sm">Transport costs are approximately R280/ton to Joburg. I can connect you with verified logistics partners who offer competitive rates.</p>
                    <span className="text-slate-400 text-xs mt-2 block">Just now</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <input 
                  type="text" 
                  placeholder="Type your message..."
                  className="flex-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                />
                <button className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center hover:from-emerald-700 hover:to-teal-700 transition-colors">
                  <Send className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Analytics Dashboard */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-black text-white mb-6">
              Real-time Business Intelligence
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Advanced analytics and insights for South African agricultural markets and production trends
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Market Overview */}
            <div className="lg:col-span-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-white">Market Performance</h3>
                <div className="flex items-center gap-2 text-emerald-400 text-sm">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  Live data
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center gap-3 mb-4">
                    <TrendingUp className="w-6 h-6 text-emerald-400" />
                    <span className="text-white font-semibold">Total Trade Volume</span>
                  </div>
                  <div className="text-3xl font-black text-white mb-2">R2.84B</div>
                  <div className="flex items-center gap-2 text-emerald-400 text-sm">
                    <ArrowRight className="w-4 h-4 rotate-[-45deg]" />
                    +18.5% from last month
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center gap-3 mb-4">
                    <BarChart3 className="w-6 h-6 text-blue-400" />
                    <span className="text-white font-semibold">Active Transactions</span>
                  </div>
                  <div className="text-3xl font-black text-white mb-2">12,847</div>
                  <div className="flex items-center gap-2 text-blue-400 text-sm">
                    <ArrowRight className="w-4 h-4 rotate-[-45deg]" />
                    +7.2% this week
                  </div>
                </div>
              </div>

              {/* Commodity Price Chart Simulation */}
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                <h4 className="text-white font-semibold mb-4">Commodity Price Trends (30 days)</h4>
                <div className="flex items-end gap-2 h-32">
                  {[...Array(30)].map((_, i) => (
                    <div 
                      key={i}
                      className="bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t flex-1 transition-all duration-300 hover:from-emerald-500 hover:to-emerald-300"
                      style={{ 
                        height: `${Math.random() * 80 + 20}%`,
                        animationDelay: `${i * 50}ms`
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6">
                <h3 className="text-xl font-bold text-white mb-6">Live Statistics</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Active Farmers</span>
                    <span className="text-white font-bold">47,239</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Daily Trades</span>
                    <span className="text-emerald-400 font-bold">1,847</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Avg Response Time</span>
                    <span className="text-blue-400 font-bold">2.3 min</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Success Rate</span>
                    <span className="text-purple-400 font-bold">98.7%</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6">
                <h3 className="text-xl font-bold text-white mb-6">Top Performing Regions</h3>
                <div className="space-y-4">
                  {[
                    { region: 'Free State', growth: '+24.5%', color: 'emerald' },
                    { region: 'Mpumalanga', growth: '+19.8%', color: 'blue' },
                    { region: 'Western Cape', growth: '+17.2%', color: 'purple' },
                    { region: 'Limpopo', growth: '+15.6%', color: 'orange' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-slate-300">{item.region}</span>
                      <span className={`text-${item.color}-400 font-bold`}>{item.growth}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6">
                <h3 className="text-xl font-bold text-white mb-6">Weather Impact</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-yellow-400">☀️</span>
                    </div>
                    <div>
                      <div className="text-white font-semibold">Favorable Conditions</div>
                      <div className="text-slate-400 text-sm">7 provinces</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-blue-400">🌧️</span>
                    </div>
                    <div>
                      <div className="text-white font-semibold">Optimal Rainfall</div>
                      <div className="text-slate-400 text-sm">Eastern regions</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Stats Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "47K+", label: "Active Farmers", icon: <Users className="w-8 h-8" />, color: "emerald" },
              { number: "R2.84B", label: "Monthly Volume", icon: <TrendingUp className="w-8 h-8" />, color: "blue" },
              { number: "98.7%", label: "Success Rate", icon: <Award className="w-8 h-8" />, color: "purple" },
              { number: "24/7", label: "Support Available", icon: <Globe className="w-8 h-8" />, color: "orange" }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 hover:bg-white/15 transition-all duration-500 hover:scale-105">
                  <div className={`flex justify-center mb-6 text-${stat.color}-400 group-hover:scale-110 transition-transform duration-300`}>
                    {stat.icon}
                  </div>
                  <div className="text-5xl font-black text-white mb-3">{stat.number}</div>
                  <div className="text-slate-400 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern CTA Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/50 to-teal-900/50 backdrop-blur-xl"></div>
        <div className="relative max-w-6xl mx-auto text-center px-6">
          <div className="mb-8">
            <h2 className="text-5xl lg:text-6xl font-black text-white mb-6">
              Transform Your Farming Business
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join South Africa's most advanced agricultural platform. Connect with 47,000+ farmers, 
              access real-time market data, and grow your business with cutting-edge technology.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link 
              to={user ? "/dashboard" : "/register"}
              className="group bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-700 hover:via-teal-700 hover:to-cyan-700 text-white px-12 py-5 rounded-2xl font-bold text-lg flex items-center gap-3 transition-all duration-500 shadow-2xl hover:shadow-emerald-500/25 hover:scale-105"
            >
              {user ? "Open Dashboard" : "Start Free Trial"}
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
            
            <Link 
              to="/market"
              className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 text-white px-12 py-5 rounded-2xl font-bold text-lg transition-all duration-500 hover:scale-105"
            >
              Explore Markets
            </Link>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;