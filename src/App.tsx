import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './pages/homePage/homePage';
import { ProductsPage } from './pages/productsPage/productsPage';
import { NotFoundPage } from './pages/notFoundPage/404NotFound';

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
