import { createGlobalStyle } from "styled-components";

export const Global = createGlobalStyle`
    :root {
        --color-background: #08090d;
        --color-nav-background: rgba(8, 9, 13, 0.75);
        --color-text: #f4f4f5;
        --color-text-on-accent: #17140a;
        --color-text-muted: #a5a5b2;
        --color-accent: #b5a4ff;
        --color-accent-start: #9c83ff;
        --color-accent-end: #4bb5c8;
        --color-surface: rgba(255, 255, 255, 0.055);
        --color-surface-hover: rgba(255, 255, 255, 0.1);
        --color-social-surface: rgba(255, 255, 255, 0.04);
        --color-social-surface-hover: rgba(255, 255, 255, 0.12);
        --color-border: rgba(255, 255, 255, 0.09);
        --color-border-subtle: rgba(255, 255, 255, 0.1);
        --color-highlight: #f5d547;
        --color-highlight-hover: #ffe36b;
        --color-highlight-border: rgba(245, 213, 71, 0.3);
        --color-accent-glow: rgba(80, 62, 148, 0.2);
        --color-accent-shadow: rgba(113, 92, 190, 0.25);
        --color-overlay: rgba(0, 0, 0, 0.85);
        --color-error: #ffaaaa;
        --color-error-surface: rgba(255, 90, 90, 0.08);
    }

    * { padding: 0; border: 0; margin: 0; box-sizing: border-box; }
    html { min-height: 100%; background: var(--color-background); }
    body {
        min-width: 320px;
        min-height: 100vh;
        color: var(--color-text);
        background: radial-gradient(ellipse at 18% 12%, var(--color-accent-glow), transparent 38%), var(--color-background);
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        -webkit-font-smoothing: antialiased;
    }
    button, a { font: inherit; }
    a { color: inherit; text-decoration: none; }
`;
