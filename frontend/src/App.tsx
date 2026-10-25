import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import { CalculatorPage } from '@/pages/CalculatorPage'
import { HomePage } from '@/pages/HomePage'

function App() {
   return (
      <BrowserRouter>
         <Routes>
            <Route element={<AppLayout />}>
               <Route index element={<HomePage />} />
               <Route path="kalkulacka" element={<CalculatorPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
         </Routes>
      </BrowserRouter>
   )
}

export default App
