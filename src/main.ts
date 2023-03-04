/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

import { registerSW } from 'virtual:pwa-register'

const app = createApp(App)

registerPlugins(app)

registerSW()
app.mount('#app')
