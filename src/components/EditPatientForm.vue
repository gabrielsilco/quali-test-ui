<template>
    <v-card>
        <v-card-title>Editar paciente</v-card-title>
        <v-card-text>
            <v-form>
                <v-row>
                    <v-col cols="6">
                        <v-text-field v-model="occupation" label="Ocupação"></v-text-field>
                    </v-col>
                    <v-col cols="3">
                        <v-text-field v-model="weight" label="Peso (kg)" type="number"></v-text-field>
                    </v-col>
                    <v-col cols="3">
                        <v-text-field v-model="height" label="Altura (cm)" type="number"></v-text-field>
                    </v-col>
                </v-row>
                <span>Já foi internado?</span>
                <v-radio-group v-model="everBeenAdmitted">
                    <v-radio label="Sim" :value="true"></v-radio>
                    <v-radio label="Não" :value="false"></v-radio>
                </v-radio-group>
                <v-row>
                    <v-col cols="6">
                        <v-combobox
                            v-model="sports"
                            label="Esportes que pratica"
                            multiple
                            :items="preDefinedSports"
                        >
                        </v-combobox>
                    </v-col>
                    <v-col cols="6">
                        <v-combobox
                            v-model="familyHistory"
                            label="Histórico familiar de doenças"
                            multiple
                            :items="preDefinedIllness"
                        >
                        </v-combobox>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="5">
                        <v-text-field v-model="city" label="Cidade"></v-text-field>
                    </v-col>
                    <v-col cols="3">
                        <v-text-field v-model="state" label="Estado"></v-text-field>
                    </v-col>
                    <v-col cols="4">
                        <v-text-field v-model="country" label="País"></v-text-field>
                    </v-col>
                </v-row>
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-btn @click="editPatient" variant="elevated" color="blue">Editar</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import axios from 'axios';

export default {
    props: {
        patient: {
            type: Object,
            default: () => {},
        }
    },
    data() {
        return {
            dialog: false,
            preDefinedSports: ['Futebol', 'Musculação', 'Natação', 'Vôlei'],
            preDefinedIllness: ['Cancer', 'Diabetes'],
            fullName: this.patient.fullName,
            cpf: this.patient.cpf,
            occupation: this.patient.occupation,
            dateOfBirth: this.patient.dateOfBirth,
            weight: this.patient.weight,
            height: this.patient.height,
            everBeenAdmitted: this.patient.everBeenAdmitted,
            sports: this.patient.sports,
            familyHistory: this.patient.familyHistory,
            city: this.patient.city,
            state: this.patient.state,
            country: this.patient.country,

        }
    },
    methods: {
        showDialog() {
            this.dialog = true;
        },
        editPatient() {
            const editedPatient = {
                fullName: this.fullName,
                dateOfBirth: this.dateOfBirth,
                cpf: this.cpf,
                weight: this.weight,
                height: this.height,
                occupation: this.occupation,
                everBeenAdmitted: this.everBeenAdmitted,
                sports: this.sports,
                familyHistory: this.familyHistory,
                city: this.city,
                state: this.state,
                country: this.country,
            }
            axios.put(`http://localhost:3000/patients/${this.patient.id}`, editedPatient)
                .then(() => {this.$emit('patient-edited')});
        },
    }
}
</script>