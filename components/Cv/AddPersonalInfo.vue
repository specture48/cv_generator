<template>
  <v-form @submit.prevent="submitForm" ref="form">

    <v-card-text>
      <v-textarea rows="5" outlined name="about" label="About Me" placeholder="write summary about you."
                  v-model="personalInfo.about" :rules="[required]"></v-textarea>
      <v-text-field name="country" label="country"
                    v-model="personalInfo.name" :rules="[required]"
      />
      <v-text-field name="country" label="country"
                    v-model="personalInfo.country" :rules="[required]"
      />
      <v-text-field type="email" name="email" label="email"
                    v-model="personalInfo.email" :rules="[required]"
      />
      <v-text-field type="number" name="phone" label="phone"
                    v-model="personalInfo.phone" :rules="[required]"
      />

      <v-text-field name="city" label="city"
                    v-model="personalInfo.city" :rules="[required]"
      />

      <v-divider class="mt-12 mt-md-6 mb-4"></v-divider>
      <div class="d-flex">
        <v-spacer/>
        <v-btn color="red" dark class="mx-1" @click="cancel">Cancel</v-btn>
        <v-btn color="success"
               class="mx-1"
               type="submit">
          Save
        </v-btn>
      </div>
    </v-card-text>
  </v-form>
</template>

<script>
  export default {
    name: "AddPersonalInfo",
    data() {
      return {
        personalInfo: {
          about:'',
          loc:'L',
          country:'S',
          name:'Daniel k',
          address: '',
          city: 'Datour',
          state: 'Lattakia',
          phone: '0931869085',
          email: 'k1999daniel@gmail.com'
        }
      }
    },
    methods: {
      required(value) {
        return !!value || 'this field is required'
      },
      submitForm() {
        if (!this.$refs.form.validate()) return
        this.$emit('personalInfoAdded', {personalInfo:this.personalInfo})
      },
      cancel() {
        this.$refs.form.reset()
        this.$emit('cancel')
      }
    },

  }
</script>

<style scoped>

</style>
