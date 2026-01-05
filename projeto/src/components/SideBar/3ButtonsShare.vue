<template>
    <div class="button-div">
        <Button buttonLabel="Save Configuration" :icon=SaveIcon class="share-buttons" id="button-save" />
        <Button buttonLabel="Share" :icon="ShareIcon" class="share-buttons" id="button-share" />
        <Button buttonLabel="Export" :icon="ExportIcon" class="share-buttons" id="button-export" />
    </div>
</template>

<script setup>
import ExportIcon from '@/assets/Export.png';
import SaveIcon from '@/assets/bookmark.png';
import ShareIcon from '@/assets/shareIcon.png';
import Button from '../Button.vue';
</script>

<style scoped>

    .button-div{
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    .share-buttons{
        color: var(--white);
        height: 35px;
        width: 50%;
        font-weight: bold;
        box-shadow: 0 2px 5px var(--shadow);
        cursor: pointer;
    }

    #button-save{
        background-color: var(--accent);
        width: 90%;
    }

    #button-share{
        background-color: var(--accent2);
    }

    #button-export{
        background-color: var(--light-blue2);
    }
</style>