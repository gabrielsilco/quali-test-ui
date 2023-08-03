<template>
  <v-app>
    <v-main class="pa-8">
      <!-- <NewPatientForm />
      <PatientsList /> -->
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script setup>
  import PatientsList from './components/PatientsList.vue';
  import NewPatientForm from './components/NewPatientForm.vue';
</script>
