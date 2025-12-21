<template>
    <div class = "grid-container">
        <div class = "filter-column">
            <div class="category">
                <TitleContainer id="titleContainer" texto="Analysis Category"/>
                <p class="subtitle">Select Metric:</p>
                <div class="metrics-container">
                    <label>
                        <input type="radio" class="select-metric" value="eletronicos" v-model="escolha" />
                        Eletrónicos
                    </label>

                    <label>
                        <input type="radio" class="select-metric" value="roupas" v-model="escolha" />
                        Roupas
                    </label>

                    <label>
                        <input type="radio" class="select-metric" value="alimentos" v-model="escolha" />
                        Alimentos
                    </label>
                </div>
            </div>

             <div class="Filters">
                <TitleContainer id="titleContainer" texto="Advanced Filters"/>
                <p class="subtitle">Aggregation:</p>
            </div>
        </div>

        <div class = "main-column">
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus 
            ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus 
            duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus 
            fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada 
            lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti 
            sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
        </div>
        <div class = "share-column">
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus 
            ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus 
            duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus 
            fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada 
            lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti 
            sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
        </div>
    </div>
</template>


<script setup>
    import TitleContainer from '@/components/TitleFilters.vue'
</script>


<style scoped>
    .grid-container{
        display: flex;
        gap: 10px;
        width: 100vw;
    }

    #titleContainer{
        margin-bottom: 12px;
    }

    .subtitle{
        font-size: 18px;
        color: var(--accent);
        margin-left: 10px;
        margin-bottom: 10px;
    }

    .category{
        margin-bottom: 20px;
    }

    .filter-column{
        width: 15%;
        padding: 30px 15px;
    }

    .metrics-container{
        display: flex;
        flex-direction: column;
    }

    .main-column{
        width: 65%;
        padding: 30px 15px;
    }

    .share-column{
        width: 15%;
        padding: 30px 15px;
    }

    label{
        margin: 3px 15px;
        color: var(--metrics-text);
        font-weight: 500;
    }

    .select-metric{
        accent-color: var(--accent);
    }
</style>