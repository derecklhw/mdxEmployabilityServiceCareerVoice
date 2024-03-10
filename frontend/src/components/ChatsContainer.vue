<template>
    <div ref="chatContainer">
        <Message v-for="(chat, index) of CHATS" :key="index" :content="chat.content" :role="chat.role" />
    </div>
    <button></button>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import Message from './Message.vue';
import { CHATS } from '../stores/chat';
import { useSpeechSynthesis } from '@vueuse/core';

const chatContainer = ref<HTMLElement | null>(null);

watch(CHATS, () => {
    let lastMessage = CHATS.value[CHATS.value.length - 1];
    if (lastMessage.role === 'user' || lastMessage.role === 'system') {
        return;
    }
    const {speak} = useSpeechSynthesis(lastMessage.content, { lang: 'en-US', pitch: 1, rate: 1, volume: 0.5});
    speak()
}, { deep: true });

onMounted(() => {
    chatContainer.value?.scrollTo(0, chatContainer.value.scrollHeight);
});

</script>
