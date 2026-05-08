<template>
  <Suspense>
    <template #default>
      <RemoteComponent />
    </template>
    <template #fallback>
      <div>Loading remote...</div>
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { ModuleFederation } from '@module-federation/runtime'
import * as vue from 'vue'
import * as vueGettext from 'vue3-gettext'

const REMOTE_ENTRY_URL = 'http://localhost:5174/remoteEntry.mjs'

const federation = new ModuleFederation({ name: 'host', remotes: [] })

federation.registerShared({
  vue: { version: '0.0.0', scope: ['default'], get: () => Promise.resolve(() => vue) },
  'vue3-gettext': { version: '0.0.0', scope: ['default'], get: () => Promise.resolve(() => vueGettext) }
})

federation.registerRemotes([{ name: REMOTE_ENTRY_URL, entry: REMOTE_ENTRY_URL, type: 'module' }])

const RemoteComponent = defineAsyncComponent(async () => {
  const mod = await federation.loadRemote<{ default: any }>(REMOTE_ENTRY_URL)
  return mod!.default
})
</script>
