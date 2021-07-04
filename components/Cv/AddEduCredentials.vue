<template>
  <v-card flat>
    <v-card-text>
      <v-form @submit.prevent="submitForm" ref="form">

        <v-text-field outlined dense name="institution" label="institution/University" type="string"
                      v-model="edu.institution" :rules="[required]"
        />

        <v-text-field outlined dense name="study field" label="Study Field" type="string"
                      v-model="edu.study_field"
        />

        <v-text-field outlined dense name="degree" label="Degree Type (B.A. , M.S. , ph.D.)" type="string"
                      v-model="edu.degree" :rules="[required]"
        />

        <v-select outlined dense label="Graduation Year" :items="years"
                  v-model=edu.graduation_year :rules="[required]"
        />
        <v-btn color="success" class="mx-1" type="submit">Save</v-btn>
        <v-btn color="red" dark class="mx-1" @click="cancel">Cancel</v-btn>
      </v-form>

    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: "AddEduCredentials",
    data() {
      return {
        edu: {
          study_field: '',
          institution: '',
          degree: '',
          graduation_year: '',
        },
        years: [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020],
      }
    },
    methods: {
      required(value) {
        return !!value || 'this field is required'
      },
      submitForm() {
        if (!this.$refs.form.validate()) return
        this.$emit('eduAdded', {edu:this.edu})
      },
      cancel() {
        this.$refs.form.reset()
        this.$emit('cancel')
      }
    },
  }
</script>
