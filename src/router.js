import { createRouter, createWebHistory } from "vue-router";

import PatientsList from './components/PatientsList.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: PatientsList }
    ]
})

export default router;