import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const root = createRoot(document.getElementById('root')!);

if (import.meta.env.DEV) {
  import('./editor/EditModeProvider').then(({EditModeProvider}) => {
    root.render(
      <StrictMode>
        <EditModeProvider>
          <App />
        </EditModeProvider>
      </StrictMode>,
    );
  });
} else {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
