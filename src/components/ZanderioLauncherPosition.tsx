'use client';

import { useEffect } from 'react';

export default function ZanderioLauncherPosition() {
  useEffect(() => {
    const installPositionOverride = () => {
      const shadowRoot = document.getElementById('zanderio-widget-host')?.shadowRoot;
      if (!shadowRoot) return false;

      let style = shadowRoot.querySelector<HTMLStyleElement>('#zanderio-launcher-position');
      if (!style) {
        style = document.createElement('style');
        style.id = 'zanderio-launcher-position';
        shadowRoot.appendChild(style);
      }
      style.textContent = `
        button[aria-label="Open chat"] {
          bottom: 0 !important;
        }
      `;
      return true;
    };

    if (installPositionOverride()) {
      return;
    }

    const observer = new MutationObserver(() => {
      if (installPositionOverride()) {
        observer.disconnect();
      }
    });
    observer.observe(document.body, { childList: true });

    return () => observer.disconnect();
  }, []);

  return null;
}
