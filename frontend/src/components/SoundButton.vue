<template>
     <div class="absolute bottom-8 left-8 cursor-pointer"  @click="toggleSound">
        <span v-if="sound">Sound Off</span>
        <span v-else>Sound On</span>
    </div>
</template>
<script setup lang="ts">
import { soundEnabled } from '../stores/settings';

const sound = soundEnabled;

const toggleSound = () => {
  soundEnabled.value = !soundEnabled.value;
};

</script>
