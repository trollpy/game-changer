import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { SignedIn, SignedOut } from '@clerk/clerk-react'

// Layouts
import MainLayout from './layouts/MainLayout'
import DashboardLayout from './layouts/DashboardLayout'

// Pages
import Home from './pages/Home'
import LoginPage from './pages/Auth/LoginPage'
import RegisterPage from './pages/Auth/RegisterPage'
import SSOCallback from "./components/auth/SSOCallback"
import ListingsPage from './pages/Listings/ListingsPage'
import ListingDetailsPage from './pages/Listings/ListingDetailsPage'
import MarketPricesPage from './pages/Market/MarketPricesPage'
import DashboardPage from './pages/Dashboard/DashboardPage'
import ProfilePage from './pages/Profile/ProfilePage'
import EditProfilePage from './pages/Profile/EditProfilePage'
import MessagingPage from './pages/Messaging/MessagingPage'

// Components
import ChatBox from './components/messaging/ChatBox'
import ListingForm from './components/listings/ListingForm'

function App() {
  return (
    <Routes>
      {/* Public routes with MainLayout */}
      <Route element={<MainLayout><Outlet /></MainLayout>}>
        <Route index element={<Home />} />
        
        {/* Authentication routes */}
        <Route path="login" element={
          <SignedOut>
            <LoginPage />
          </SignedOut>
        } />
        <Route path="register" element={
          <SignedOut>
            <RegisterPage />
          </SignedOut>
        } />
        <Route path="sso-callback" element={<SSOCallback />} />

        {/* Public content routes */}
        <Route path="listings" element={<ListingsPage />} />
        <Route path="listings/:id" element={<ListingDetailsPage />} />
        <Route path="market" element={<MarketPricesPage />} />
      </Route>

      {/* Protected routes with DashboardLayout */}
      <Route element={
        <SignedIn>
          <DashboardLayout><Outlet /></DashboardLayout>
        </SignedIn>
      }>
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="profile/edit" element={<EditProfilePage />} />
        <Route path="listings/create" element={<ListingForm />} />
        <Route path="listings/edit/:id" element={<ListingForm isEdit />} />
        <Route path="messages" element={<MessagingPage />}>
          <Route index element={<div className="flex items-center justify-center h-full text-gray-500">Select a conversation</div>} />
          <Route path=":userId" element={<ChatBox />} />
        </Route>
      </Route>

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App