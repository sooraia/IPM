import './assets/base.css'
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './plugins/chart'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

const { useAuthStore } = await import('./stores/auth')
const auth = useAuthStore()
auth.restoreFromStorage()

app.mount('#app')
