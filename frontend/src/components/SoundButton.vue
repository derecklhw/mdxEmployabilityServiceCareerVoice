<template>
     <div class="absolute bottom-8 right-6 cursor-pointer"  @click="toggleSound">
        <span v-if="sound">
          <FlFilledSpeakerOff class="h-10 w-10 text-red-500" />
        </span>
        <span v-else>
          <FlFilledSpeaker2 class="h-10 w-10 text-red-500" />
        </span>
    </div>
</template>
<script setup lang="ts">
import { soundEnabled } from '../stores/settings';
import { FlFilledSpeaker2, FlFilledSpeakerOff } from '@kalimahapps/vue-icons'

const sound = soundEnabled;

const toggleSound = () => {
  soundEnabled.value = !soundEnabled.value;
};

</script>
