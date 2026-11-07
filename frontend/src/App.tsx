import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import { CalculatorPage } from '@/pages/CalculatorPage'
import { HomePage } from '@/pages/HomePage'
import { MethodologyPage } from '@/pages/MethodologyPage'
import { PlanPage } from '@/pages/PlanPage'
import { PrivacyPage } from '@/pages/PrivacyPage'

function App() {
   return (
      <BrowserRouter>
         <Routes>
            <Route element={<AppLayout />}>
               <Route index element={<HomePage />} />
               <Route path="kalkulacka" element={<CalculatorPage />} />
               <Route path="plan" element={<PlanPage />} />
               <Route path="metodika" element={<MethodologyPage />} />
               <Route path="ochrana-udajov" element={<PrivacyPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
         </Routes>
      </BrowserRouter>
   )
}

export default App
