<template>
  <div>
    <v-card flat :class="(is_cv_page)?'mx-5 my-2':'my-4'">
      <v-overlay absolute :value="requestUnderProcess">
        <v-progress-circular indeterminate size="64"/>
      </v-overlay>
      <v-card-title class="text-h5">
        Known Languages
      </v-card-title>
      <v-divider/>
      <v-card-text>

        <div v-if="controlleable" class="d-flex mb-4">
          <v-spacer/>
          <v-btn text @click="toggleEdit" color="primary">
            {{ editButtonLabel }}
          </v-btn>
        </div>

        <v-slide-y-transition leave-absolute>
          <v-autocomplete
            v-if="editMode"
            key="select-new-language"
            label="Add New Language"
            v-model="newLanguage"
            :items="unSelectedLanguages"
            class="my-8"
            hint="select language from the above list"
            @input="addLanguage"
          />
        </v-slide-y-transition>


        <v-chip
          v-for="language in selectedLanguages"
          :key="language"
          :close="editMode && controlleable"
          @click:close="removeLanguage(language)"
          color="primary"
          class="ma-2"
          outlined
          label
        >
          {{ language }}
        </v-chip>

      </v-card-text>
      <v-card-actions class="justify-center mt-4" v-if="editMode">
        <v-btn :disabled="requestUnderProcess" @click="changeLanguages" color="primary" large rounded>Done</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>


  export default {
    name: "KnownLanguages",
    props: {
      is_cv_page: {
        type: Boolean,
        default: false
      },
      controlleable: {
        type: Boolean,
        default: true
      },
    },
    computed: {
      allLanguages(){
        return this.$store.getters.getAllLanguages
      },
      unSelectedLanguages() {
        return this.allLanguages.filter(
          item => !this.selectedLanguages.find(selectedItem => selectedItem == item)
        )
      }
    },
    data() {
      return {
        editMode: false,
        editButtonLabel: 'edit or add language',
        selectedLanguages: (this.is_cv_page) ? Array.from(this.$store.getters.getCvLanguages) : Array.from(this.$store.getters.userLanguages),
        newLanguage: '',
        requestUnderProcess: false,
      }
    },
    methods: {
      toggleEdit() {
        this.editMode = !this.editMode
        this.editButtonLabel = this.editMode ? 'cancel' : 'edit or add language'
        if (this.is_cv_page) {
          !this.editMode ? this.selectedLanguages = Array.from(this.$store.getters.getCvLanguages) : ''
        }
      },
      removeLanguage(language) {
        this.selectedLanguages = this.selectedLanguages.filter(item => item != language)
      },
      addLanguage() {
        this.selectedLanguages.push(this.newLanguage)
        this.newLanguage = ''
      },
      changeLanguages() {
        this.requestUnderProcess = true
        this.$emit('languagesAdded', {languages: this.selectedLanguages})
        this.toggleEdit()
        this.requestUnderProcess = false
      }
    },

  }
</script>

<style scoped>

</style>
