<template>
  <div class="flex gap-1 mb-6">
    <div>
      <div v-if="isUser" class="font-bold">You</div>
      <div v-else class="font-bold">MDX Employability Service Career Voice</div>
      <div>{{ content }}</div>
      <div v-html="html" class="mt-4"></div>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  content: string;
  role: string;
  html: string;
}>();

const isUser = computed(() => {
  return props.role === "user";
});

</script>