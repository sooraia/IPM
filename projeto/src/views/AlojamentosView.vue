<template>
    <main class="layout">
        <section class="left-menu">
            <MenuFilters />
        </section>
        <section class="alojamentos-wrapper">
            <div class="container">
                <h1>Barrossa Valley</h1>
                <p style="align-self: flex-start;">Results(14)</p>
                <div style="width: 100%;">
                <CardAlojamento nomeAlojamento="Quinta da Barrosinha" avaliacaoAlojamento="4.8" />
                <CardAlojamento nomeAlojamento="Quinta da Barrosinha" avaliacaoAlojamento="4.8" />
                <CardAlojamento nomeAlojamento="Quinta da Barrosinha" avaliacaoAlojamento="4.8" />
                <CardAlojamento nomeAlojamento="Quinta da Barrosinha" avaliacaoAlojamento="4.8" />
                <CardAlojamento nomeAlojamento="Quinta da Barrosinha" avaliacaoAlojamento="4.8" />
                <CardAlojamento nomeAlojamento="Quinta da Barrosinha" avaliacaoAlojamento="4.8" />
                <CardAlojamento nomeAlojamento="Quinta da Barrosinha" avaliacaoAlojamento="4.8" />
                <CardAlojamento nomeAlojamento="Quinta da Barrosinha" avaliacaoAlojamento="4.8" />
                <CardAlojamento nomeAlojamento="Quinta da Barrosinha" avaliacaoAlojamento="4.8" />
                <CardAlojamento nomeAlojamento="Quinta da Barrosinha" avaliacaoAlojamento="4.8" />
                <CardAlojamento nomeAlojamento="Quinta da Barrosinha" avaliacaoAlojamento="4.8" />
                <CardAlojamento nomeAlojamento="Quinta da Barrosinha" avaliacaoAlojamento="4.8" />
                <CardAlojamento nomeAlojamento="Quinta da Barrosinha" avaliacaoAlojamento="4.8" />
                <CardAlojamento nomeAlojamento="Quinta da Barrosinha" avaliacaoAlojamento="4.8" />
                </div>
                <div class="paginas">
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                </div>
                <Button buttonLabel="Export" :icon="SaveIcon" id="button-export" />
            </div>
        </section>
        <section class="map">
            <MapAlojamentos />
        </section>
    </main>
</template>

<script setup>
import CardAlojamento from '@/components/CardAlojamento.vue';
import MenuFilters from '@/components/MenuFilters.vue';
import SaveIcon from '@/assets/Export.png';
import Button from '@/components/Button.vue';
import MapAlojamentos from '@/components/MapAlojamentos.vue';
</script>

<style scoped>

.layout {
    display: flex;
    flex-direction: row;
    max-height: calc(100vh - 190px);
}

.left-menu {
    width: 16%;
    overflow-y: auto;
    scroll-behavior: smooth;
}

.alojamentos-wrapper {
    width: 42%;
}

.container {
    width: 90%;
    margin: 10px auto 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.paginas {
    display: flex;
    flex-direction: row;
    gap: 10px;
    margin: 10px 0;
}

#button-export {
    align-self: flex-end;
    background: var(--light-accent2);
    color: white;
    cursor: pointer;
}

.map {
    width: 42%;
}
</style>