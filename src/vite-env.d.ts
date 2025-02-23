/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_OPENAI_API_URL: string;
  readonly VITE_OPENAI_API_KEY: string;
  // add more vars as needed...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
