<template>
  <v-card flat>
    <v-divider/>

    <v-card-text>
      <v-form @submit.prevent="submitForm" ref="form">

        <v-text-field outlined dense name="job title" label="Job Title"
                      v-model="emp.job_title" :rules="[required]"/>

        <v-text-field outlined dense name="company name" label="Company Name"
                      v-model="emp.company_name" :rules="[required]"/>

        <app-date-picker :date="emp.start_date" @update:date="emp.start_date = $event"/>

        <app-date-picker :date="emp.end_date" @update:date="emp.end_date = $event"/>

        <v-text-field outlined dense name="industry" label="industry"
                      v-model="emp.industry"/>

        <v-text-field outlined dense name="job category" label="Job Category"
                      v-model="emp.job_category"/>

        <v-text-field outlined dense name="job subcategory" label="Job Subcategory"
                      v-model="emp.job_subcategory"/>

        <v-text-field outlined dense name="job description" label="job_description"
                      v-model="emp.job_description"/>


        <v-divider class="mt-12 mt-md-6 mb-4"/>

        <div class="d-flex">
          <v-spacer/>
          <v-btn color="red" dark class="mx-1" @click="cancel">Cancel</v-btn>
          <v-btn color="success" class="mx-1" type="submit">Save</v-btn>
        </div>

      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
  import DatePicker from "~/components/DatePicker";
  export default {

    name: "AddWorkExperienceCredentials",
    components:{
      AppDatePicker:DatePicker
    },
    data() {
      return {
        emp:{
          job_title: '',
          company_name: '',
          start_date: null,
          end_date: null,
          industry: '',
          job_category: '',
          job_subcategory: '',
          job_description: ''
        },
      }
    },
    methods: {
      required(value) {
        return !!value || 'this field is required'
      },
      submitForm() {
        if (!this.$refs.form.validate()) return
        this.$emit('workExpAdded',{emp:this.emp})
      },
      cancel() {
        this.$refs.form.reset()
        this.$emit('cancel')
      }
    },
  }
</script>
