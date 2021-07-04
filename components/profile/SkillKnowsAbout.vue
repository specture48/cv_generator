<template>
  <v-card flat :class="(is_cv_page)?'mx-5 my-2':'my-6'">
    <v-overlay absolute :value="requestUnderProcess">
      <v-progress-circular indeterminate size="64"/>
    </v-overlay>
    <v-card-title class="text-h5">
      Knows About
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
        {{newSkill}}
        {{selectedSkills}}
        <v-combobox

          v-if="editMode"
          key="select-new-skill"
          label="Add New Skill"
          v-model="newSkill"
          :items="unSelectedSkills"
          class="my-8"
          hint="select skill from the above list"
          @input="addSkill"
          multiple
        />
      </v-slide-y-transition>

      <v-chip v-for="skill in selectedSkills"
              :key="skill"
              :close="editMode && controlleable"
              @click:close="removeSkill(skill)"
              color="primary"
              class="ma-2"
              outlined
              label
      >
        {{ skill }}
      </v-chip>
    </v-card-text>

    <v-card-actions class="justify-center mt-4" v-if="editMode">
      <v-btn color="primary" large rounded
             :disabled="requestUnderProcess"
             @click="editSkills"
      >Done
      </v-btn>
    </v-card-actions>

  </v-card>
</template>

<script>

  export default {
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
    name: "skillKnowsAbout",
    computed: {
      allSkills() {
        return this.$store.getters.getAllSkills;
      },
      unSelectedSkills() {
        return this.allSkills.filter(
          item => !this.selectedSkills.find(selectedItem => selectedItem === item)
        )
      }
    },
    data() {
      return {
        editMode: false,
        editButtonLabel: 'Edit or add skill',
        selectedSkills:  Array.from(this.$store.getters.getCvSkills),
        newSkill: '',
        requestUnderProcess: false
      }
    },
    methods: {
      toggleEdit() {
        this.editMode = !this.editMode
        this.editButtonLabel = this.editMode ? 'cancel' : 'edit or add skill'
        !this.editMode ? this.selectedSkills = Array.from(this.$store.getters.getCvSkills) : ''
      },
      removeSkill(skill) {
        this.selectedSkills = this.selectedSkills.filter(item => item != skill)
      },
      addSkill() {
        console.log("this.newSkill")
        console.log(this.newSkill)
        this.selectedSkills.push(this.newSkill[0])
        this.newSkill = ''
      },
      editSkills() {
        this.requestUnderProcess = true
        this.$emit('skillsAdded', {skills: this.selectedSkills})
        this.toggleEdit()
        this.requestUnderProcess = false
      }

    },
  }
</script>

<style scoped>
</style>

