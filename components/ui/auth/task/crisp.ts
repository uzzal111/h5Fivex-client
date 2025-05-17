// global.d.ts
// Declare $crisp globally so that TypeScript won't throw an error
declare global {
  interface Window {
    $crisp: any;
    CRISP_WEBSITE_ID: string;
  }
}

// We need to export this file to ensure the types are loaded
export {};
