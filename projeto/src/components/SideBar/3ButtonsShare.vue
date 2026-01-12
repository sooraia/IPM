<template>
    <div class="button-div">
        <InputMessage 
            v-if="showInputModal"
            title="Save Configuration as:"
            placeholder="Enter chart name"
            confirmText="Save"
            cancelText="Cancel"
            @confirm="saveChart"
            @close="showInputModal = false"
        />

        <Error 
            v-if="showErrorModal"
            errorMessage="You need to be logged in to save charts."
            @close="showErrorModal = false"
        />

        <Button buttonLabel="Save Configuration" :icon=SaveIcon class="share-buttons" id="button-save" @click="showInputModalFunc" />
        <Button buttonLabel="Share" :icon="ShareIcon" class="share-buttons" id="button-share" @click="showShareMenu = true" />
        <Button buttonLabel="Export" :icon="ExportIcon" class="share-buttons" id="button-export" @click="showExportMenu = true" />
        
    </div>

    <Export 
        v-if="showExportMenu"
        @close="showExportMenu = false"
        @download="downloadChartFunc"
    />

    <Teleport to="body">
        <Success 
            v-if="showSuccessModal"
            :successMessage="`Chart '${chartName}' saved successfully`"
            goTo="Go to Saved Charts" 
            dest="/profile"
            @close="showSuccessModal = false"
        />
    </Teleport>

    <Share 
        v-if="showShareMenu"
        @close="showShareMenu = false"
        @copyToClipboard="showMiniMessageFunc"
    />

    <MiniMessage 
        v-if="showMiniMessageDownload" 
        :message="'Chart exported successfully!'"
    />
    <MiniMessage 
        v-if="showMiniMessageClipboard" 
        :message="'Link copied to clipboard!'"
    />
     
</template>

<script setup>
import { ref } from 'vue';
import ExportIcon from '@/assets/Export.png';
import SaveIcon from '@/assets/bookmark.png';
import ShareIcon from '@/assets/shareIcon.png';
import Button from '../Button.vue';
import Success from '../Messages/Success.vue';
import InputMessage from '../Messages/inputMessage.vue';
import Export from '../Messages/Export.vue';
import { useAuthStore } from '@/stores/auth';
import Error from '../Messages/Error.vue';
import Share from '../Messages/Share.vue';
import MiniMessage from '../Messages/mini-message.vue';

const showInputModal = ref(false);
const showSuccessModal = ref(false);
const showExportMenu = ref(false);
const showErrorModal = ref(false);
const showShareMenu = ref(false);
const showMiniMessageClipboard = ref(false);
const showMiniMessageDownload = ref(false);

/* Chart */
import { saveChartConfig } from '@/utils/users.js';
import { EmitFlags } from 'typescript';
const props = defineProps({
    chartType: { type: String, required: true },
    city: { type: String, required: true },
    filters: { type: Object, required: true }
});

const chartName = ref('');
const authStore = useAuthStore();

const saveChart = (name) => {
  chartName.value = name;
  const userEmail = authStore.user ? authStore.user.email : null;
  if (!userEmail) {
    showErrorModal.value = true;
    return;
  }

  saveChartConfig(userEmail, {
    chartType: props.chartType,
    city: props.city,
    filters: props.filters,
    name: chartName.value
  });

  console.log('Chart saved:', chartName.value, 'chartType:', props.chartType, 'city:', props.city, 'filters:', props.filters);
  showInputModal.value = false;
  showSuccessModal.value = true;
};

const showInputModalFunc = () => {
    if (authStore.user?.email) {
        showInputModal.value = true;
    } else {
        showErrorModal.value = true;
    }
};

const showMiniMessageFunc = () => {
    const linkInput = document.getElementById('copy-link-input');
    if (linkInput) {
        linkInput.select();
        navigator.clipboard.writeText(linkInput.value)
            .then(() => {
                showMiniMessageClipboard.value = true;
                setTimeout(() => {
                    showMiniMessageClipboard.value = false;
                    showShareMenu.value = false;
                }, 1500);
            })
    }
};

const downloadChartFunc = (format) => {
    console.log('Downloaded chart as', format);
    showMiniMessageDownload.value = true;
    setTimeout(() => {
        showMiniMessageDownload.value = false;
    }, 1500);
};

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

    .share-buttons :deep(.btn-icon) {
        height: 30px;
        vertical-align: middle;
        width: auto;
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

    .export-menu {
        position: relative;
    }

    .export-options {
        position: absolute;
        top: 100%;
        right: 0;
        background: white;
        border: 1px solid #ddd;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
        z-index: 100;
        min-width: 150px;
        margin-top: 5px;
    }

    .export-options button {
        display: block;
        width: 100%;
        padding: 10px 15px;
        border: none;
        background: white;
        color: #333;
        text-align: left;
        cursor: pointer;
        font-size: 14px;
        transition: background 0.2s;
    }

    .export-options button:first-child {
        border-radius: 8px 8px 0 0;
    }

    .export-options button:last-child {
        border-radius: 0 0 8px 8px;
    }

    .export-options button:hover {
        background: #f5f5f5;
    }
</style>