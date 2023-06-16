<script lang="ts" setup>
import { getLoggers } from '@/api/loggers'
import { Logger } from '@/api/loggers/type'
import { useRequest } from '@/hooks/useRequest'
import { onMounted } from 'vue'

onMounted(async () => {
  const loggers = await useRequest<Logger[]>(() => getLoggers(1))
  console.log(loggers)
})
</script>

<template>
  <div class="error">developer error</div>
</template>
