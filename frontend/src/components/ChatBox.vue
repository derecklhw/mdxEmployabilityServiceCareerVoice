<template lang="">
    <div class="flex gap-1">
    <div class="flex-1 relative border-2 border-gray-300 p-3 rounded-lg flex">
        <input
            v-model="message"
            type="text" 
            class="w-full outline-none"
            placeholder="Type a message..."
        />
        <div class="flex gap-2">
            <button class="border-gray-300 border px-2 py-1 rounded">On Off</button>
            <button @click="sendChats">Send</button>
        </div>
    </div>
    </div>
</template>
<script setup lang="ts">
import axios from 'axios';
import { CHATS } from '../stores/chat';
import { ref } from 'vue';
import { CHAT } from '../types';

const message = ref('');

async function sendChats() {
    CHATS.value.push({
        role: 'user',
        content: message.value
    })
    try {
        // const response = await axios.post('http://localhost:3000/openai', {
        //     message: CHATS.value
        // });

        // let assistantMessage: CHAT = {
        //     role: response.data.role,
        //     content: response.data.content
        // }

        let assistantMessage: CHAT = {
            role: "assistant",
            content: "Hello, I am the MDX Employability Service Career Voice. How can I help you today?"
        }

        CHATS.value.push(assistantMessage)
        
        console.log(CHATS.value)
    } catch (error) {
        console.error(error)
    }
}

</script>
