import { ModuleFederation } from '@module-federation/runtime'
import * as vue from 'vue'
import * as vueGettext from 'vue3-gettext'

// This mirrors how web-runtime sets up module federation:
// - Uses @module-federation/runtime directly (NOT @module-federation/vite plugin)
// - Registers shared modules via registerShared()
// - Loads remotes via registerRemotes() + loadRemote()

const REMOTE_ENTRY_URL = 'http://localhost:5174/remoteEntry.mjs'

const federation = new ModuleFederation({ name: 'host', remotes: [] })

// Register shared modules (same pattern as web-runtime's registerSharedModules)
const shared: Record<string, { version: string; scope: string[]; get: () => Promise<() => unknown> }> = {
  vue: {
    version: '0.0.0',
    scope: ['default'],
    get: () => Promise.resolve(() => vue)
  },
  'vue3-gettext': {
    version: '0.0.0',
    scope: ['default'],
    get: () => Promise.resolve(() => vueGettext)
  }
}
federation.registerShared(shared)

// Load the remote extension
async function loadExtension() {
  try {
    federation.registerRemotes([
      { name: REMOTE_ENTRY_URL, entry: REMOTE_ENTRY_URL, type: 'module' }
    ])
    const module = await federation.loadRemote(REMOTE_ENTRY_URL)
    console.log('Extension loaded successfully:', module)
    document.getElementById('app')!.innerHTML = '<h1>Extension loaded!</h1>'
  } catch (error) {
    console.error('Failed to load extension:', error)
    document.getElementById('app')!.innerHTML =
      `<h1 style="color:red">Failed to load extension</h1><pre>${error}</pre>`
  }
}

loadExtension()
