import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

/* Iran sans font provided in index.css beacause of styled component's limits */

:root {

  /* Brand */

  --color-brand-50 : #97F9C9;
  --color-brand-100 : #7DF6BC;
  --color-brand-200 : #64F3AE;
  --color-brand-300 : #4AF0A0;
  --color-brand-400 : #30ED93;
  --color-brand-500 : #17EA85;
  --color-brand-600 : #15D177;
  --color-brand-700 : #12B969;
  --color-brand-800 : #10A05B;
  --color-brand-900 : #0E874D;
  --color-brand-950 : #0B6F3F;

  
/* Grey */
  --color-grey-0: #fff;
  --color-grey-50: #f9fafb;
  --color-grey-100: #f3f4f6;
  --color-grey-200: #e5e7eb;
  --color-grey-300: #d1d5db;
  --color-grey-400: #9ca3af;
  --color-grey-500: #6b7280;
  --color-grey-600: #4b5563;
  --color-grey-700: #374151;
  --color-grey-800: #1f2937;
  --color-grey-900: #111827;


/* Neutral */
  --color-neutral-50: #fafafa;
  --color-neutral-100: #f5f5f5;
  --color-neutral-200: #e5e5e5;
  --color-neutral-300: #d4d4d4;
  --color-neutral-400: #a3a3a3;
  --color-neutral-500: #737373;
  --color-neutral-600: #404040;
  --color-neutral-700: #404040;
  --color-neutral-800: #262626;
  --color-neutral-900: #171717;
  --color-neutral-950: #0a0a0a;
  --color-footer: #26272B;



  --color-blue-100: #e0f2fe;
  --color-blue-700: #0369a1;

  --color-green-50: #f0fdf4;
  --color-green-100: #dcfce7;
  --color-green-200: #bbf7d0;
  --color-green-300: #86efac;
  --color-green-400: #4ade80;
  --color-green-500: #22c55e;
  --color-green-600: #16a34a;
  --color-green-700: #15803d;
  --color-green-800: #166534;
  --color-green-900: #14532d;
  --color-green-950: #052e16;
  
  --color-yellow-100: #fef9c3;
  --color-yellow-700: #a16207;

  --color-silver-100: #e5e7eb;
  --color-silver-700: #374151;
  
  --color-indigo-50: #eef2ff;
  --color-indigo-100: #e0e7ff;
  --color-indigo-200: #c7d2fe;
  --color-indigo-300: #a5b4fc;
  --color-indigo-400: #818cf8;
  --color-indigo-500: #6366f1;
  --color-indigo-600: #4f46e5;
  --color-indigo-700: #4338ca;
  --color-indigo-800: #3730a3;
  --color-indigo-900: #312e81;
  --color-indigo-950: #1e1b4b;
 
 
  --color-blue-50: #eff6ff;
  --color-blue-100: #dbeafe;
  --color-blue-200: #bfdbfe;
  --color-blue-300: #93c5fd;
  --color-blue-400: #60a5fa;
  --color-blue-500: #3b82f6;
  --color-blue-600: #2563eb;
  --color-blue-700: #1d4ed8;
  --color-blue-800: #1e40af;
  --color-blue-900: #1e3a8a;
  --color-blue-950: #172554;

  --color-red-50: #fef2f2;
  --color-red-100: #fee2e2;
  --color-red-200: #fecaca;
  --color-red-300: #fca5a5;
  --color-red-400: #f87171;
  --color-red-500: #ef4444;
  --color-red-600: #dc2626;
  --color-red-700: #b91c1c;
  --color-red-800: #991b1b;
  --color-red-900: #7f1d1d;
  --color-red-950: #450a0a;

  --backdrop-color: rgba(255, 255, 255, 0.1);

  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);

  --image-grayscale: 0;
  --image-opacity: 100%;

--border-radius-tiny: 3px;
--border-radius-sm: 5px;
--border-radius-md: 7px;
--border-radius-lg: 9px;
  
}



*,
*::before,
*::after {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

html {
  /* 1rem = 10px */
  font-size: 62.5%;

// 1200px
@media screen and (max-width:75em) {
  font-size: 56.25%;  //1rem = 9px --> 9/16 = 56.25%
}

// 900px
@media screen and (max-width:56.25em) {
  font-size: 50%;    // 1rem = 8px  --> 8/16 = 50%
}

// 600px
@media screen and (max-width:37.5em) {
  font-size: 44%;    // 1rem = 7px  --> 7/16 = 50%
}

}

body {
  min-height: 100vh;
  /* font provided in index.css */
  direction: rtl;
  background-color: var(--color-grey-100);
  color: var(--color-grey-700);
  font-size: 1.6rem;
  line-height: 1.5;
}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}


select:disabled,
input:disabled {
  background-color: var(--color-grey-200);
  color: var(--color-grey-500);
}

input:focus,
button:focus,
textarea:focus,
select:focus {
  outline: 2px solid var(--color-brand-600);
  outline-offset: -1px;
}


/* Parent selector, finally 😃 */
button:has(svg) {
  line-height: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  hyphens: auto;
}

img {
  max-width: 100%;
  /* For dark mode */
  filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
}


/* Here we want to style classes that are coming from leaflet. */
.leaflet-popup .leaflet-popup-content-wrapper {
  background-color: var(--color-grey-800);
  color: var(--color-grey-200);
  border-radius: 5px;
  padding-right: 0.6rem;
}

.leaflet-popup .leaflet-popup-content {
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  gap: 4rem;
}

.leaflet-popup .leaflet-popup-content  {
  font-size: 1.5rem;
  line-height: 1;
}

.leaflet-popup .leaflet-popup-tip {
  background-color: var(--color-brand-500);
}

.leaflet-popup-content-wrapper {
  padding: .4rem;
  border-bottom: 7px solid var(--color-brand-500);
}


.no-scroll {
  overflow: hidden;
}



`;

export default GlobalStyles;
