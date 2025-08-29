import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// ..mantine
import { MantineProvider } from "@mantine/core";
// ..styles
import { theme, resolver } from "@/common/theme.config";
import "@mantine/core/styles.css";
// ..custom
import App from "@/App.tsx";
import '@/global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme} cssVariablesResolver={resolver}>
                <App />
    </MantineProvider>
  </StrictMode>,
)
