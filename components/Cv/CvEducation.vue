<template>
  <div>
      <v-list three-line>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title >
              {{ education.degree }} in {{ education.study_field }}
            </v-list-item-title>
            <v-list-item-title class="text-body-1">
              school - {{ education.institution }}
            </v-list-item-title>
            <v-list-item-subtitle class="text-body-2">
              graduated at {{ education.graduation_year }}
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-avatar>
            <v-btn @click="deleteEdu" icon><v-icon>mdi-trash-can-outline</v-icon></v-btn>
          </v-list-item-avatar>
        </v-list-item>
      </v-list>
  </div>
</template>

<script>
  export default {
    props: {
      education: {
        type: Object,
        required: true
      },
    },
    methods: {
      deleteEdu() {
        this.$store.dispatch('togglePreviewing')
        this.$store.commit('DELETE_CV_EDU',this.education)
      }
    },
  }
</script>

<style scoped>

</style>
