<template lang="">
    <div class="flex gap-1 flex-col">
        <div class="flex-1 relative border-2 border-gray-300 p-3 rounded-lg flex">
            <input
                v-model="message"
                type="text" 
                class="w-full outline-none"
                :placeholder="isUserVoiceEnabled ? 'Speak to me...' : 'Type a message...'"
                @keyup.enter="sendChats"
            />
            <div class="flex gap-2">
                <button class="" @click="isUserVoiceEnabled= !isUserVoiceEnabled">
                    <span v-if="isUserVoiceEnabled">
                        <BsMicMuteFill class="h-6 w-6 text-slate-950" />
                    </span>
                    <span v-else>
                        <BsMicFill class="h-6 w-6 text-slate-950" />
                    </span>
                </button>
                <button class="mx-2" @click="stopSpeechSynthesis">
                    <span>
                        <FaCircleStop class="h-6 w-6 text-slate-950" />
                    </span>
                </button>
                <button @click="sendChats">
                    <FlFilledSend class="h-6 w-6 text-slate-950" />
                </button>
            </div>
        </div>
        <div class="flex justify-center">
            <p class="text-sm text-center">MDX Employability Service Career Voice can make mistakes. Consider checking information</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { CHATS } from '../stores/chat';
import { ref, watch } from 'vue';
import { CHAT } from '../types';
import { useSpeechRecognition, useSpeechSynthesis } from '@vueuse/core';
import { v4 as uuidv4 } from 'uuid';
import { FlFilledSend, BsMicFill, BsMicMuteFill, FaCircleStop } from '@kalimahapps/vue-icons'

const message = ref('');
const isUserVoiceEnabled = ref(false);

const props = defineProps({
    newMessage: String
});

const { isSupported,
  isListening,
  isFinal,
  result,
  start,
  stop,} = useSpeechRecognition({
    lang: 'en-US',
    continuous: false,
});

watch(() => props.newMessage, (newVal) => {
  if (newVal) {
    message.value = newVal;
    sendChats();
  }
}, { immediate: true });

if (isSupported.value) {
    watch(result, (value) => {
        if (isUserVoiceEnabled.value) {
            message.value = value;
        }
    });
}

watch(isFinal, (value) => {
    if (value && isUserVoiceEnabled.value) {
        sendChats();
    }
});

watch(isListening, (value) => {
  if (!value && isUserVoiceEnabled.value) {
    start();
  }
});

watch(isUserVoiceEnabled, (value) => {
    if (value) {
        start();
    } else {
        stop();
    }
});

async function sendChats() {
    CHATS.value.push({
        id: uuidv4(),
        role: 'user',
        content: message.value
    })
    message.value = '';
    
    try {
        const response = await axios.post('http://localhost:3000/dialogflow', {
            message: CHATS.value,
            sessionId: '1234567890'
        });

        let assistantMessage: CHAT;

        if (response.data.content.startsWith('{')) {
            response.data.content = JSON.parse(response.data.content);
            assistantMessage = {
                id: uuidv4(),
                role: response.data.role,
                content: "Here are the instruction: " + response.data.content.instructions,
                html: response.data.content.iframe
            }
        } else {
            assistantMessage = {
                id: uuidv4(),
                role: response.data.role,
                content: response.data.content
            }
        }
        if (isUserVoiceEnabled.value) {
            isUserVoiceEnabled.value = false;
        }

        CHATS.value.push(assistantMessage)
        openUrlLink(assistantMessage.content)
        
    } catch (error) {
        console.error(error)
    }
}

async function openUrlLink(message: string) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const googleMapsRegex = /(https?:\/\/(www\.)?(google\.com\/maps|goo\.gl\/maps)[^\s]*)/i;
    
    const urls = message.match(urlRegex);
    if (urls) {
        const nonGoogleMapsUrls = urls.filter(url => !googleMapsRegex.test(url));
        
        if (nonGoogleMapsUrls.length > 0) {
            window.open(nonGoogleMapsUrls[0], '_blank');
        }
    }
}

function stopSpeechSynthesis() {
      const {isSupported, stop} = useSpeechSynthesis('');
      if (isSupported) {stop()}
}

</script>
