<template>
  <div>
    <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >

      <template v-slot:activator="{on,attrs}">
        <v-text-field
          outlined
          dense
          :value="date"
          label="picker in menu"
          prepend-icon="mdi-calender"
          readonly
          v-bind="attrs"
          v-on="on"
        />
      </template>

      <v-date-picker
        ref="picker"
        :value="new Date(date).toISOString().substr(0,7)"
        :max="new Date().toISOString().substr(0,10)"
        min="1950_01_01"
        @change="save"
        :attrs="$attrs"
        type="month"
      />


    </v-menu>
  </div>
</template>

<script>
  export default {
    name: "DatePicker",
    props: {
      date: {
        type: String,
        default: null
      },
    },
    data() {
      return {
        menu: false
      }
    },
    watch: {
      menu(val) {
        val && setTimeout(() => {
          this.$refs.picker.activePicker = 'YEAR'
        })
      },
    },
    methods: {
      save(date) {
        this.$emit('update:date', date)
        this.$refs.menu.save(date)
      }
    },
  }
</script>

<style scoped>

</style>
