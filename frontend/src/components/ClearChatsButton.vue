<template lang="">
    <div>
        <div v-if="CHATS.length > 1" class="absolute bottom-24 right-7 cursor-pointer"  @click="clearChats">
            <BsTrashFill class="h-10 w-10 text-red-500" />
        </div>
    </div>
</template>
<script setup lang="ts">
import { CHATS } from '../stores/chat';
import { BsTrashFill } from '@kalimahapps/vue-icons'

function clearChats() {
    while (CHATS.value.length > 1) CHATS.value.pop();
}
    
</script>
