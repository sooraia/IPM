
<template>
    <div :style="{ background: backgroundColor, border: backgroundColor }" class="card">
        <h1 :style="{ color: textColor }">{{ title }}</h1>
        <div class="card-content">
            <p :style="{ color: textColor, fontSize: adjustFontSize(stat) }">{{ stat }}</p>
            <svg v-if="score" width="80px" xmlns="http://www.w3.org/2000/svg" viewBox="0 10 640 640"><path :fill="textColor" d="M341.5 45.1C337.4 37.1 329.1 32 320.1 32C311.1 32 302.8 37.1 298.7 45.1L225.1 189.3L65.2 214.7C56.3 216.1 48.9 222.4 46.1 231C43.3 239.6 45.6 249 51.9 255.4L166.3 369.9L141.1 529.8C139.7 538.7 143.4 547.7 150.7 553C158 558.3 167.6 559.1 175.7 555L320.1 481.6L464.4 555C472.4 559.1 482.1 558.3 489.4 553C496.7 547.7 500.4 538.8 499 529.8L473.7 369.9L588.1 255.4C594.5 249 596.7 239.6 593.9 231C591.1 222.4 583.8 216.1 574.8 214.7L415 189.3L341.5 45.1z"/></svg>
            <p v-if="currency != null" :style="{ fontSize: '20px', color: textColor }">{{ currency }}</p>
        </div>
    </div>
</template>

<script setup>

defineProps({
    title: String,
    stat: [String, Number],
    score: {
        type: Boolean,
        default: false
    },
    currency: {
        type: String,
        default: null
    },
    backgroundColor: {
        type: String,
        default: 'rgb(0, 40, 55)'
    },
    textColor: {
        type: String,
        default: '#699199'
    }
});

function adjustFontSize(statValue) {
  const str = String(statValue);
  const length = str.length;
  
  if (length <= 3) return '96px';
  else return '72px';
}
</script>

<style scoped>
.card {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 15px;
  border-radius: 20px;
  border: 3px solid var(--accent);
  background: var(--accent);
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  padding: 20px;
}

.card:hover {
  background-color: rgb(0, 48, 65);
  border: 3px solid rgb(0, 48, 65);
}

.card p {
  color: #699199;
  text-align: center;
  font-size: 96px;
  font-weight: 500;
}

.card h1 {
  color: #699199;
  font-size: 20px;
  font-weight: 500;
  text-align: center;
}

.card-content {
  display: flex;
  align-items: center;
  gap: 5px;
}
</style>