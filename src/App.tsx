import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from '@/pages/';
import { ProductsPage } from '@/pages/';
import { NotFoundPage } from '@/pages/';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />

        <Route path="/home" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />

        <Route path="/404-not-found" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404-not-found" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
