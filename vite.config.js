import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['cloud.png', 'robots.txt', 'cloud.png'],
      manifest: {
        name: 'WeatherPWA',
        short_name: 'VitePWA',
        description: 'A Vite React Progressive Web App!',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/cloud.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/cloud.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/cloud.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          }
        ]
      }
    })

  ],
})
