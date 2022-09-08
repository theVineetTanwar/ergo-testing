import { createRoot } from 'react-dom/client';
import App from './App';
// import { TrebleApp } from "@threekit-tools/treble"
import './index.css';
import {
    ThreekitProvider,
    useThreekitInitStatus, useAttribute,
    PortalToElement,
    usePlayerLoadingStatus,
    FlatForm,
  } from '@threekit-tools/treble';

const container = document.getElementById('tk-treble-root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<ThreekitProvider><App /></ThreekitProvider>);
