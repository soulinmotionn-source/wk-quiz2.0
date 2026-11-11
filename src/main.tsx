import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles/index.css';
import App from './App.tsx';

const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

const container = document.getElementById('root')!;

// Production pages are prerendered (see scripts/prerender.js): hydrate the
// existing HTML. In `vite dev` the root is empty, so render from scratch.
if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
