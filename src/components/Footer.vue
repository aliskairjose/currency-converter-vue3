
<script setup>
    import { computed } from 'vue'
    const currentYear = computed(()=>{
        const date =  new Date();
        return date.getFullYear();
    })
</script>

<template>
    <footer class="w-full pt-4 ">
        <hr class="h-0.5 border-t-0 bg-blue-500 opacity-100 dark:opacity-50" />
        <div class="flex lg:flex-row flex-col items-center lg:p-6 p-4 max-w-[1280px] mx-auto">
            <div class="flex lg:flex-1 flex-none text-left md:text-base text-sm gap-2">
                © {{currentYear}}. Desarrollada con
                <img src="../assets/vue.svg" class="ms-1 h-5" /> 
                <img src="../assets/vite.svg" class="h-5" />  
                <img class="h-5 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
            </div>
            <div class="lg:flex-1 flex-none">
                <div class="border rounded w-fit float-right p-1">
                    <a href="https://github.com/aliskairjose/currency-converter-vue3" target="_blank" rel="noopener noreferrer">
                        <img src="../assets/github.svg" alt="github" class="float-right h-5" />
                        <span class="mx-2 text-sm">Source code</span>
                    </a>
                </div>
            </div>
        </div>
    </footer>
</template>

<style lang="scss" scoped></style>