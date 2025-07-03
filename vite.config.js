import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['cloud.png'],
            manifest: {
                name: 'WeatherPWA',
                short_name: 'VitePWA',
                description: 'A Vite React Progressive Web App!',
                start_url: '/',
                display: 'standalone',
                theme_color: '#ffffff',
                background_color: '#ffffff',
                icons: [{
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
    ]
})