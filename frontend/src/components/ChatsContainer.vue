<template>
    <div ref="chatContainer">
        <Message v-for="(chat, index) of CHATS" :key="index" :content="chat.content" :role="chat.role" />
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Message from './Message.vue';
import { CHATS } from '../stores/chat';

const chatContainer = ref<HTMLElement | null>(null);

onMounted(() => {
    chatContainer.value?.scrollTo(0, chatContainer.value.scrollHeight);
});

</script>
