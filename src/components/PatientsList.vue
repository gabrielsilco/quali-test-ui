<template>
    <v-container class="d-flex flex-wrap patient-container ml-0 pl-0">
        <v-card
            v-for="patient in patients"
            width="300px"
            height="400px"
            variant="tonal"
            class="d-flex flex-column"
        >
            <v-card-title>{{ patient.fullName }}</v-card-title>
            <v-card-subtitle>{{ patient.dateOfBirth + ', ' + patient.occupation }}</v-card-subtitle>
            <v-card-text>
                <span class="font-weight-black">Peso: </span> {{ patient.weight + ' kg' }}
                <br />
                <span class="font-weight-black">Altura: </span> {{ patient.height + ' cm' }}
                <br />
                <span class="font-weight-black">Já esteve internado?: </span> {{ patient.everBeenAdmitted ? 'Sim' : 'Não' }}
                <br />
                <span class="font-weight-black">Esportes que pratica:</span>
                <br />
                <v-chip v-for="sport in patient.sports">{{ sport }}</v-chip>
                <br />
                <span class="font-weight-black">Histórico familiar de doenças:</span>
                <br />
                <v-chip v-for="disease in patient.familyHistory">{{ disease }}</v-chip>
            </v-card-text>
            <v-card-actions class="align-end">
                <v-btn
                    variant="elevated"
                    color="red"
                    prepend-icon="mdi-delete"
                    @click="deletePatient(patient.id)"
                >
                    Excluir
                </v-btn>
                <v-btn
                    variant="elevated"
                    color="blue"
                    prepend-icon="mdi-pencil"
                    @click="editPatient(patient)"
                >
                    Editar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
    <v-dialog v-model="showEditDialog">
        <EditPatientForm  :patient="patientToEdit" @patient-edited="refresh"/>
    </v-dialog>
</template>

<script>
import axios from 'axios';
import EditPatientForm from './EditPatientForm.vue';
export default {
    components: { EditPatientForm },
    data() {
        return {
            patients: [],
            patientToEdit: {},
            showEditDialog: false,
        }
    },
    methods: {
        deletePatient(id) {
            axios.delete(`http://localhost:3000/patients/${id}`);
        },
        editPatient(patient) {
            this.patientToEdit = patient;
            this.showEditDialog = true;
        },
        async refresh() {
            this.showEditDialog = false;
            const result = await axios.get('http://localhost:3000/patients');
            this.patients = result.data;
        }
    },
    async created() {
        const result = await axios.get('http://localhost:3000/patients');
        this.patients = result.data;
    },
}
</script>

<style scoper>
.patient-container {
    gap: 50px
}
</style>