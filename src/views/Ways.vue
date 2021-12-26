<template>
  <div class="ways page">
    <header class="main-header">
      <h1 class="headline">Направления</h1>
      <router-link class="link" to="/">Стоимость обучения</router-link>
      <router-link class="link" to="/autorisation">Авторизоваться</router-link>
    </header>

    <aside class="programs">
      <h2 class="programs__headline">Программы обучения</h2>
      <ul class="programs-list radio-list list scroller">
        <li
          class="programs-list__item radio-list__item"
          v-for="program in programsWays"
          :class="{ none: program.none }"
          :key="program.id"
          :id="program.id"
        >
          <label class="programs-list__label radio__label" :id="program.id">
            <input
              class="radio-input programs-list__input visually-hidden"
              type="radio"
              name="programInput"
              :id="program.id"
              :value="program.name"
              :checked="program.checked"
              @click="chooseProgram($event)"
            />
            <p class="radio-name programs-list__name" :id="program.id">
              {{ program.name }}
            </p>
          </label>
        </li>
      </ul>
    </aside>
    <section class="center">
      <ul class="directions-list list list ul block">
        <li
          class="directions-list__item"
          v-for="direction in directions"
          :key="direction.id"
          :id="direction.id"
        >
          <label class="directions-list__label" :id="direction.id">
            <input
              class="directions-list__input visually-hidden"
              type="radio"
              name="directionInput"
              :id="direction.id"
              :value="direction.name"
              :checked="direction.checked"
              @click="chooseProgram"
            />
            <div
              class="directions-list__name"
              :id="direction.id"
              :class="direction.color"
            >
              {{ direction.name }}
            </div>
          </label>
        </li>
      </ul>

      <ul class="subjects-list list ul">
        <li
          class="subjects-list__item"
          v-for="subject in subjects"
          :key="subject.id"
          :id="subject.id"
          :class="[subject.color, { none: subject.none }]"
        >
          <div class="header-subject">
            <h3 class="subjects-list__name" :id="subject.id">
              {{ subject.name }}
            </h3>
            <p class="subjects-list__code up">{{ subject.code }}</p>
          </div>
          <p class="subjects-list__description">{{ subject.description }}</p>
          <p class="subjects-list__direction visually-hidden" :id="subject.id">
            {{ subject.direction }}
          </p>
          <ul class="subjects-buttons__list list">
            <li
              class="subjects-buttons__item"
              v-for="button in buttons"
              :key="button.id"
            >
              <router-link class="subjects-button" to="/">{{
                button
              }}</router-link>
            </li>
          </ul>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import store from "@/store/index.js";

export default {
  name: "Home",

  data() {
    return {
      buttons: ["Очное", "Заочное", "Дистант"],
    };
  },

  methods: {
    chooseProgram: function (event) {
      let directionValue;
      let programValue;
      let directionsList = document.querySelector(".directions-list");
      let subjects = document.querySelectorAll(".subjects-list__item");
      let programInputs = document.querySelectorAll(".programs-list__input");
      let directionInputs = document.querySelectorAll(
        ".directions-list__input"
      );
      let directionItems = document.querySelectorAll(".directions-list__item");

      if (
        event.target.value === "Колледж" ||
        event.target.value === "Специалитет"
      ) {
        directionsList.classList.remove("block");
        directionsList.classList.add("none");
      } else {
        directionsList.classList.add("block");
        directionsList.classList.remove("none");
      }

      directionInputs.forEach(function (directionInput) {
        if (directionInput.checked) {
          directionValue = directionInput.value;
        }
      });

      programInputs.forEach(function (programInput) {
        if (programInput.checked) {
          programValue = programInput.value;
        }
      });

      subjects.forEach(function (subject) {
        subject.classList.add("none");
        let direction = subject.querySelector(".subjects-list__direction");
        let subjectName = subject.querySelector(".subjects-list__name");
        directionItems.forEach(function (directionItem) {
          directionInputs.forEach(function (directionInput) {
            if (
              programValue === "Магистратура" &&
              (directionInput.value === "Сервис" ||
                directionInput.value === "Востоковедение и африканистика" ||
                directionInput.value === "Психология" ||
                directionInput.value === "Реклама и связи с общественностью") &&
              directionInput.id === directionItem.id
            ) {
              directionItem.classList.add("none");
            }
            if (
              programValue === "Бакалавриат" &&
              (directionInput.value === "Сервис" ||
                directionInput.value === "Востоковедение и африканистика" ||
                directionInput.value === "Психология" ||
                directionInput.value === "Реклама и связи с общественностью") &&
              directionInput.id === directionItem.id
            ) {
              directionItem.classList.remove("none");
            }
          });
        });
        if (event.target.classList.contains("programs-list__input")) {
          directionValue = "Все направления";
        }
        if (
          (directionValue === subjectName.textContent ||
            directionValue === "Все направления") &&
          programValue === direction.innerHTML &&
          subjectName.id === subject.id
        ) {
          subject.classList.remove("none");
        }
      });
    },
  },

  computed: {
    subjects() {
      if (store.state.subjects) {
        store.state.subjects.forEach((p, i) => {
          p.id = i;
          p.none = true;
          if (p.direction === "Бакалавриат на базе СОО") {
            p.none = false;
            p.direction = "Бакалавриат";
          }
          if (p.direction === "Магистратура") {
            p.color = "mag";
          }
          if (p.direction === "Специалитет") {
            p.color = "spec";
          }
        });
      }
      return store.state.subjects;
    },
    programsWays() {
      if (store.state.programsWays) {
        store.state.programsWays.forEach((p, i) => {
          p.id = i;
        });
      }
      return store.state.programsWays;
    },
    directions() {
      if (store.state.directions) {
        store.state.directions.forEach((p, i) => {
          p.id = i;
        });
      }
      return store.state.directions;
    },
  },
  async mounted() {
    store.dispatch("fetchSubjects");
    store.dispatch("fetchDirections");
    store.dispatch("fetchProgramsWays");
  },
};
</script>
