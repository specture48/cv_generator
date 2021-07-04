import Vuex from 'vuex'

const vuexStore = () => {
  return new Vuex.Store({
    state: {
      allLanguages:['arabic','english','french'],
      allSkills:[
        'engineer',
        'DAO'
      ],
      reviewing: true,
      cv_data: {
        skills: [],
        edu: [],
        emp: [],
        languages: [],
        isPreview: false,
        personalInfo: {},
      },
    },
    getters: {
      getAllSkills(state){
        return state.allSkills;
      },
      getAllLanguages(state){
        return state.allLanguages;
      },
      getCvDetails(state) {
        return state.cv_data
      },
      getCvSkills(state) {
        return state.cv_data.skills
      },
      getCvLanguages(state) {
        return state.cv_data.languages
      },
      getPreviewCvVariable(state) {
        return state.previewing
      },
      getPersonalInfo(state){
        return state.personalInfo
      }
    },
    mutations: {
      TOGGLE_PREVIEWING(state){
        state.previewing = !state.previewing
      },
      SET_PREVIEW(state, status) {
        state.cv_data.isPreview = status
      },
      SET_CV_SKILLS(state, skills) {
        state.cv_data.skills = skills
      },
      SET_CV_LANGUAGES(state, languages) {
        state.cv_data.languages = languages
      },
      DELETE_CV_EDU(state, singleEdu) {
        let idx = state.cv_data.edu.findIndex(item => JSON.stringify(item) === JSON.stringify(singleEdu))
        state.cv_data.edu.splice(idx, 1)
      },
      DELETE_CV_WORK_EXP(state, singleWorkExp) {
        let idx = state.cv_data.emp.findIndex(item => JSON.stringify(item) === JSON.stringify(singleWorkExp))
        state.cv_data.emp.splice(idx, 1)
      },
      ADD_CV_WORK_EXP(state, singleWorkExp) {
        state.cv_data.emp.push(singleWorkExp)
      },
      ADD_CV_EDU(state, singleEdu) {
        state.cv_data.edu.push(singleEdu)
      },
      ADD_CV_PERSONAL_INFO(state, info){
        state.cv_data.personalInfo=info
      }
    },
    actions: {
      togglePreviewing({commit}){
        commit('TOGGLE_PREVIEWING')
      },
      clear_cv_data({commit}){
        commit('CLEAR_CV_DATA')
      },
      nuxtServerInit(vuexContext, context) {
        console.log('inside nuxtServerInit')

        // if (context.$auth.strategy.token.get()) {
        //   context.$axios.defaults.headers.common["Authorization"] = context.$auth.strategy.token.get()
        //   return context.$axios.get('backend/api/user').then((res) => {
        //     vuexContext.commit('SET_USER_DATA', res.data);
        //   });
        // }

      },

    },
    modules: {

    }
  })
}

export default vuexStore;
