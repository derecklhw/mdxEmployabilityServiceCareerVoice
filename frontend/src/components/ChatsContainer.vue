<template>
    <div ref="chatContainer">
        <transition name="fade">
            <div v-if="CHATS.length <= 1" key="welcome">
                <img src="../assets/mdxCareerVoiceLogo.png" alt="MDX Career Voice" class="w-1/2 mx-auto" />
                <p class="text-6xl text-center">How can i help you today?</p>
            </div>
        </transition>
        <transition name="fade" mode="out-in">
            <div v-if="CHATS.length > 1">
                <Message v-for="(chat, index) in CHATS.slice(1)" :key="index" :content="chat.content" :role="chat.role" />
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue';
import Message from './Message.vue';
import { CHATS } from '../stores/chat';
import { soundEnabled } from '../stores/settings';
import { useSpeechSynthesis } from '@vueuse/core';

const chatContainer = ref<HTMLElement | null>(null);

const scrollToBottom = () => {
    nextTick(() => {
        if (chatContainer.value) {
            chatContainer.value.scrollTo({
                top: chatContainer.value.scrollHeight,
                behavior: "smooth"
            });
        }
    });
}

watch(CHATS, () => {
    let lastMessage = CHATS.value[CHATS.value.length - 1];
    scrollToBottom();
    if (lastMessage.role === 'user' || lastMessage.role === 'system') {
        return;
    }
    
    let messageContent = lastMessage.content;

    const isHtmlContent = /<\/?[a-z][\s\S]*>/i.test(lastMessage.content);
    if (isHtmlContent) {
        messageContent = "A Google Map has just been loaded, ready for exploration!";
    }

    const {isSupported, speak} = useSpeechSynthesis(messageContent, { lang: 'en-US', pitch: 1, rate: 1, volume: 0.5});
    if (isSupported && soundEnabled.value) {speak()}
}, { deep: true });

onMounted(() => {
    chatContainer.value?.scrollTo(0, chatContainer.value.scrollHeight);
});

</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>

