<template>
  <div>
    <v-list three-line>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            {{ workExp.job_title }} | {{ workExp.job_category }} |
            {{ workExp.job_subcategory }}
          </v-list-item-title>
          <v-list-item-title class="text-body-1">
            {{ workExp.company_name }} | {{ workExp.industry }}
          </v-list-item-title>
          <v-list-item-subtitle class="text-body-2">
            {{ workExp.job_description }}
            <p class="caption">
              {{ new Date(workExp.start_date).toISOString().substr(0,7) }}
              To
              {{ new Date(workExp.end_date).toISOString().substr(0,7) }}
            </p>
          </v-list-item-subtitle>

        </v-list-item-content>
        <v-list-item-avatar>
          <v-btn @click="deleteEmp" icon>
            <v-icon>mdi-trash-can-outline</v-icon>
          </v-btn>
        </v-list-item-avatar>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
  export default {
    name: "Experience",
    props: {
      workExp: {
        type: Object,
        required: true
      },
    },
    // data() {
    //   return {
    //     workExp: {
    //       job_title: 'Senior Manager',
    //       job_category: 'IT',
    //       company_name: 'Spectrum',
    //       job_description: 'brillian Job',
    //       job_subcategory: 'Web Development',
    //       industry: 'Software Development',
    //       start_date: new Date(),
    //       end_date: new Date()
    //     }
    //   }
    // },
    methods: {
      deleteEmp() {
        this.$store.dispatch('togglePreviewing')
        this.$store.commit('DELETE_CV_WORK_EXP', this.workExp)
      }
    },
  }
</script>

<style scoped>

</style>
