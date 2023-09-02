<script setup lang="ts">
const { $client } = useNuxtApp()
const { params } = useRoute()
if (!params.name || typeof params.name !== 'string') {
  throw new Error('no fucking name brah')
}
const hello = await $client.hello.useQuery({ text: params.name })
</script>

<template>
  <div>
    <!-- As `superjson` is already pre-configured, we can use `time` as a `Date` object without further deserialization 🎉 -->
    tRPC Data: "{{ hello.data.value?.greeting }}" send at "{{ hello.data.value?.time.toLocaleDateString('en-EN') }}".
  </div>
</template>
