<script setup lang="ts">
import ChatBox from './components/ChatBox.vue'
import ChatsContainer from './components/ChatsContainer.vue';
import SoundButton from './components/SoundButton.vue';
import ClearChatsButton from './components/ClearChatsButton.vue';
import { ref } from 'vue';

const newMessage = ref('');

function handleNewMessage(message: string) {
    newMessage.value = message;
}
</script>

<template>
    <div class="h-screen flex flex-col">
        <div class="bg-red-500 w-full h-4"></div>
        
        <div class="flex-1 w-full max-w-4xl mx-auto flex flex-col overflow-hidden">
            <ChatsContainer @changeMessage="handleNewMessage" class="flex-1 overflow-auto p-2"/>
            <ChatBox :newMessage="newMessage" class="flex-none"/>
        </div>

        <div class="bg-red-500 w-full h-4 mt-2"></div>
    </div>
    <SoundButton/>
    <ClearChatsButton/>
</template>
