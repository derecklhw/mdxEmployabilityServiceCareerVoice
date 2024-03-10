<template>
    <div class="flex gap-1">
      <div>
        <div v-if="isUser" class="font-bold">You</div>
        <div v-else class="font-bold">MDX Employability Service Career Voice</div>
        <div>{{ content }}</div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from "vue";
  
  const props = defineProps<{
    content: string;
    role: string;
  }>();
  
  const isUser = computed(() => {
    return props.role === "user";
  });
  </script>