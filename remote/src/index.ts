// This is the exposed module of the remote extension.
// It imports from a shared module declared with { singleton: true, import: false }.
// With @module-federation/vite >= 1.15.0, this triggers:
//   "Error: [Module Federation] Shared module vue3-gettext was imported before
//    federation bootstrap finished."
import { defineComponent, h } from 'vue'
import { useGettext } from 'vue3-gettext'

export default defineComponent({
  name: 'RemoteComponent',
  setup() {
    const { $gettext } = useGettext()
    const greeting = $gettext('Hello from remote!')
    return () => h('div', greeting)
  }
})
