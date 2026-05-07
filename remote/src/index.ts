// This is the exposed module of the remote extension.
// It imports from a shared module declared with { singleton: true, import: false }.
// With @module-federation/vite >= 1.15.0, this triggers:
//   "Error: [Module Federation] Shared module vue3-gettext was imported before
//    federation bootstrap finished."
import { useGettext } from 'vue3-gettext'

export default {
  setup() {
    const { $gettext } = useGettext()
    return { greeting: $gettext('Hello from extension!') }
  }
}
