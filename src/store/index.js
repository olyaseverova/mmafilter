import { createStore } from 'vuex'

export default createStore({
  actions: {
    async fetchSubjects(ctx) { ctx.commit('updateSubjects', await (await fetch("subjects.json")).json()) },
    async fetchForms(ctx) { ctx.commit('updateForms', await (await fetch("forms.json")).json()) },
  },
  mutations: {
    updateSubjects(state, data) { state.subjects = data },
    updateForms(state, data) { state.forms = data },
  },
  state: {
    subjects: [],
    forms: []
  }
})
