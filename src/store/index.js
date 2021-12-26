import { createStore } from 'vuex'

export default createStore({
  actions: {
    async fetchSubjects(ctx) { ctx.commit('updateSubjects', await (await fetch("subjects.json")).json()) },
    async fetchForms(ctx) { ctx.commit('updateForms', await (await fetch("forms.json")).json()) },
    async fetchDirections(ctx) { ctx.commit('updateDirections', await (await fetch("directions.json")).json()) },
    async fetchPrograms(ctx) { ctx.commit('updatePrograms', await (await fetch("programs.json")).json()) },
    async fetchProgramsWays(ctx) { ctx.commit('updateProgramsWays', await (await fetch("programsWays.json")).json()) },
  },
  mutations: {
    updateSubjects(state, data) { state.subjects = data },
    updateForms(state, data) { state.forms = data },
    updateDirections(state, data) { state.directions = data },
    updatePrograms(state, data) { state.programs = data },
    updateProgramsWays(state, data) { state.programsWays = data },
  },
  state: {
    subjects: [],
    forms: [],
    directions: [],
    programs: [],
    programsWays: []
  }
})
