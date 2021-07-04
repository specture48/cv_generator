<template>
  <v-card color="#F3F2EF">

    <v-row justify="center" class="my-2">
      <v-btn icon @click="downloadCv">
        <v-icon>mdi-download</v-icon>
        Download
      </v-btn>
    </v-row>

    <v-row>
      <v-col md="6">

        <v-card flat class="mx-5">
          <v-card-title>
            <v-card-title class="font-weight-bold">
              Personal Info
            </v-card-title>
            <v-spacer/>
            <v-btn right color="primary" text
                   @click="isAddPersonalInfo=true">
              Add Or Edit Personal Info
            </v-btn>
          </v-card-title>
          <v-card-text>
            <div class="text-center my-2 body-1"
                 v-if="Object.entries(cv_data.personalInfo).length === 0&&!isAddPersonalInfo">
              You Dont have Any Data currently
            </div>
            <app-cv-header :personalInfo="cv_data.personalInfo"/>
            <app-add-personal-info v-if="isAddPersonalInfo"
                                   @personalInfoAdded="addPersonalInfo"
                                   @cancel="isAddPersonalInfo=false"/>
          </v-card-text>
        </v-card>


        <v-card flat class="mx-5 my-3">
          <v-card-title class="py-0">
            <div class=" my-2">
              <v-icon>mdi-school</v-icon>
              Education Credentials
            </div>
            <v-spacer/>
            <v-btn color="primary" text
                   @click="isAddEdu=true">
              Add edu
            </v-btn>
          </v-card-title>
          <v-card-text>
            <div class="text-center my-2 body-1" v-if="cv_data.edu.length===0&&!isAddEdu">
              You Dont have Any Data currently
            </div>
            <app-cv-education class="py-0"
                              v-for="(edu,index) in cv_data.edu"
                              :education="edu"/>
            <app-add-edu-credentials v-if="isAddEdu"
                                     @eduAdded="addEdu"
                                     @cancel="isAddEdu=false"/>
          </v-card-text>
        </v-card>


        <v-card flat class="mx-5 my-3">
          <v-card-title class="py-0">
            <v-icon>mdi-briefcase</v-icon>
            Employment Credentials
            <v-spacer/>
            <v-btn color="primary" text
                   @click="isAddWorkExp=true">
              Add Work Exp
            </v-btn>
          </v-card-title>
          <v-card-text>
            <div class="text-center my-2 body-1" v-if="cv_data.emp.length===0&&!isAddWorkExp">
              You Dont have Any Data currently
            </div>
            <app-cv-experience v-for="(work,index) in cv_data.emp"
                               :work-exp="work"/>

            <app-add-work-experience-credentials v-if="isAddWorkExp"
                                                 @workExpAdded="addWorkExp"
                                                 @cancel="isAddWorkExp=false"/>
          </v-card-text>
        </v-card>

        <!--        <v-card class="mx-5">-->
        <!--          <v-card-text>-->
        <app-skill-knows-about
          @skillsAdded="addSkills"
          :is_cv_page="controllable"
          :controlleable="controllable"/>
        <!--          </v-card-text>-->
        <!--        </v-card>-->

        <!--        <v-card class="mx-5 my-2">-->
        <!--          <v-card-text>-->
        <app-known-languages
          @languagesAdded="addLanguages"
          :is_cv_page="controllable"
          :controlleable="controllable"/>
        <!--          </v-card-text>-->
        <!--        </v-card>-->

      </v-col>

      <v-col md="6" >
        <v-row v-if="isLoading" justify="center" style="height:75%;"  >
          <v-progress-circular   class="mx-10"  indeterminate/>
        </v-row>
        <iframe v-if="preview&!isLoading" :src="pdfSource" style="width: 100%;height: 100%;border: none;"/>
      </v-col>
    </v-row>


  </v-card>
</template>

<script>
  import CvHeader from "~/components/Cv/CvHeader";
  import CvExperience from "~/components/Cv/CvExperience";
  import CvEducation from "~/components/Cv/CvEducation";
  import AddEduCredentials from "~/components/Cv/AddEduCredentials";
  import AddWorkExperienceCredentials from "~/components/Cv/AddWorkExperienceCredentials";
  import SkillKnowsAbout from "~/components/profile/SkillKnowsAbout";
  import AddPersonalInfo from "~/components/Cv/AddPersonalInfo";
  import KnownLanguages from "~/components/profile/KnownLanguages";

  export default {
    name: "Paper",
    components: {
      AppSkillKnowsAbout: SkillKnowsAbout,
      AddEduCredentials,
      AppCvHeader: CvHeader,
      AppCvExperience: CvExperience,
      AppCvEducation: CvEducation,
      AppAddEduCredentials: AddEduCredentials,
      AppAddWorkExperienceCredentials: AddWorkExperienceCredentials,
      AppAddPersonalInfo: AddPersonalInfo,
      AppKnownLanguages: KnownLanguages
    },
    computed: {
      cv_data() {
        return this.$store.getters.getCvDetails
      },
      preview_now() {
        return this.$store.getters.getPreviewCvVariable
      }
    },
    watch: {
      preview_now: function (newPage, oldPage) {
        this.previewPdf()
      },
    },
    data() {
      return {
        isFirstlyFetched: false,
        preview: false,
        controllable: true,
        pdfSource: '',
        isAddEdu: false,
        isAddWorkExp: false,
        isAddPersonalInfo: false,
        isLoading: false,
        showAddWorkExp: true
      }
    },
    methods: {
      addEdu(eduInfo) {
        this.$store.commit('ADD_CV_EDU', eduInfo.edu)
        this.isAddEdu = false
        this.previewPdf()
      },
      addPersonalInfo(personalInfo) {
        // this.cv_data.personalInfo = personalInfo.personalInfo
        this.$store.commit('ADD_CV_PERSONAL_INFO', personalInfo.personalInfo)
        this.isAddPersonalInfo = false
        this.previewPdf()
      },
      addWorkExp(workInfo) {
        this.$store.commit('ADD_CV_WORK_EXP', workInfo.emp)
        this.isAddWorkExp = false
        this.previewPdf()
      },
      addSkills(skills) {
        // this.cv_data.skills = skills.skills
        this.$store.commit('SET_CV_SKILLS', skills.skills)
        this.previewPdf()
      },
      addLanguages(languages) {
        console.log("languages.languages");
        console.log(languages.languages);
        // this.cv_data.languages = languages.languages
        this.$store.commit('SET_CV_LANGUAGES', languages.languages)
        this.previewPdf()
      },
      previewPdf() {
        this.isLoading = true
        this.$store.commit('SET_PREVIEW', true)

        this.$axios
          .post("api/pdf", this.cv_data)
          .then(data => {
            this.pdfSource = 'data:application/pdf;base64,' + data.data
            this.preview = true
            this.isLoading = false
          })
          .catch(err => {
            console.log(err)
            this.isLoading = false
          })
        this.$store.commit('SET_PREVIEW', false)
      },
      downloadCv() {
        this.$axios
          .post("api/pdf", this.cv_data)
          .then(data => {
          })
          .catch(err => {
            console.log(err)
          })
      },
      loadCvData() {
        let userEducations = this.$store.getters.userEducations
        userEducations.forEach(element => this.$store.commit('ADD_CV_EDU', element));

        let workExp = this.$store.getters.userWorksExperience
        workExp.forEach(element => this.$store.commit('ADD_CV_WORK_EXP', element));

        let userSkills = this.$store.getters.userSkills
        this.$store.commit('SET_CV_SKILLS', userSkills)

        let userLanguages = this.$store.getters.userLanguages
        this.$store.commit('SET_CV_LANGUAGES', userLanguages)
//
        let userLocationObject = this.$store.getters.userLocationObject
        let profileDetails = this.$store.getters.profileDetails
        let profileOwner = this.$store.getters.profileOwner

        let p = {
          city: userLocationObject.city,
          state: userLocationObject.country,
          phone: profileDetails.phone_number,
          email: profileOwner.email,
          name: this.$store.getters.getUser.data.attributes.name,
        }
        this.$store.commit('ADD_CV_PERSONAL_INFO', p)
      }
    },
    created() {
      this.previewPdf()
    },
    destroyed() {
      this.$store.dispatch('clear_cv_data')
    },
    async fetch() {
      this.isLoading=true

      // let {data} = await this.$axios.get('backend/api/all-skills')
      // this.$store.commit('setAllSkills', data);
      // await this.$store.dispatch('retrieveProfile', this.$store.getters.getUser.data.id)
      //
      // if (!this.isFirstlyFetched) {
      //   this.loadCvData()
      //   this.isFirstlyFetched = true
      // }
      this.isLoading=false

      this.previewPdf()
    }
  }
</script>
