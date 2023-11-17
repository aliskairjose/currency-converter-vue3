<template>
    <div class="flex flex-row justify-around w-10/12 gap-6">
        <div class="w-full shadow-md rounded-md pb-4" >
            <div class="bg-sky-100 rounded-t-md pt-4 font-bold">
                <h3 class="text-center">Convertir {{data.baseCurrency.name}} a {{data.currency.name}}</h3>
                <div class="flex justify-around mb-1 text-center my-3">
                    <span class="w-1/2">{{data.baseCurrency.code}}</span>
                    <span class="w-1/2">{{ data.currency.code }}</span>
                </div>
            </div>
            <ul class="flex flex-col gap-3">
                <li class="flex justify-around text-center"  v-for="l in list">
                    <span class="w-1/2 text-sky-600 font-semibold">{{ l }}</span>
                    <span class="w-1/2">{{ l * data.rate[data.currency.code] }} {{ data.currency.code }}</span>
                </li>
            </ul>
        </div>
        <div class="w-full shadow-md rounded-md pb-4">
            <div class="bg-sky-100 rounded-t-md pt-4 font-bold">
                <h3 class="text-center ">Convertir {{data.currency.name}} a {{data.baseCurrency.name}}</h3>
                <div class="flex justify-around mb-1 text-center my-3">
                    <span class="w-1/2 ">{{data.currency.code}}</span>
                    <span class="w-1/2">{{data.baseCurrency.code}}</span>
                </div>
            </div>
            <ul class="flex flex-col gap-3">
                <li class="flex justify-around text-center"  v-for="l in list">
                    <span class="w-1/2 text-sky-600 font-semibold">{{ l }}</span>
                    <span class="w-1/2">{{ l / data.rate[data.currency.code] }} {{data.baseCurrency.code}}</span>
                </li>
            </ul>
        </div>
        
    </div>
</template>

<script setup>
    import {ref} from 'vue'
    defineProps( ['data'])
    const list = ref([1, 5, 10, 25, 50, 100, 500,1000, 5000, 10000])

</script>

<style lang="scss" scoped>

</style>