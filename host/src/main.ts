import { createApp } from 'vue'
import { createGettext } from 'vue3-gettext'
import App from './App.vue'

const app = createApp(App)
app.use(createGettext({ translations: {} }))
app.mount('#app')
