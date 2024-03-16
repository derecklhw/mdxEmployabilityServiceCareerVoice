<template>
  <div class="flex gap-1 mb-6">
    <div>
      <div v-if="isUser" class="font-bold">You</div>
      <div v-else class="font-bold">MDX Employability Service Career Voice</div>
      <div>{{ content }}</div>
      <div v-html="html" class="mt-4"></div>
      
      <Calendar v-if="showCalendar" v-model="date" inline showWeek class="border"/>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import { computed, ref, watch } from "vue";
import Calendar from 'primevue/calendar';

const date = ref('');

const props = defineProps<{
  content: string;
  role: string;
  html: string;
}>();

const emit = defineEmits({
  submitDate: (date: string) => {
    if (date) {
      return true;
    }
  }
});

watch(date, (value) => {
  let formattedDate = new Date(value).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric'
  });  
  emit('submitDate', formattedDate);
});

const isUser = computed(() => {
  return props.role === "user";
});

const showCalendar = computed(() => {
  return props.content === "On which date would you like to book your appointment?" && date.value === '';
});

</script>