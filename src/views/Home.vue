<template>
  <div class="filter page">
    <header class="main-header">
      <h1 class="headline">Направления</h1>
      <router-link class="link" to="/autorisation">Авторизоваться</router-link>
    </header>
    <input
      class="filter__input"
      type="text"
      placeholder="Поиск программы"
      @input="chooseProgram($event), upperLetter($event)"
    />
    <ul class="directions-list list list ul">
      <li
        class="directions-list__item"
        v-for="direction in directions"
        :key="direction.id"
      >
        <label class="directions-list__label" :id="direction.id">
          <input
            class="directions-list__input visually-hidden"
            type="radio"
            name="directionInput"
            :id="direction.id"
            :value="direction.name"
            :checked="direction.checked"
            @click="changeRange($event), chooseProgram($event)"
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

    <section class="center">
      <div class="filter-programs-forms">
        <aside class="programs">
          <h2 class="programs__headline">Программы обучения</h2>
          <ul class="programs-list radio-list list">
            <li
              class="programs-list__item radio-list__item"
              v-for="program in programs"
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
                  @click="
                    checkoutBachelor($event),
                      changeRange($event),
                      chooseProgram($event)
                  "
                />
                <span class="radio__check"></span>
                <p class="radio-name programs-list__name" :id="program.id">
                  {{ program.name }}
                </p>
              </label>
            </li>
          </ul>
        </aside>
        <aside class="forms">
          <h2 class="programs__headline">Формы обучения</h2>
          <ul class="forms-list radio-list list">
            <li
              class="forms-list__item radio-list__item"
              v-for="form in forms"
              :key="form.id"
              :id="form.id"
              :class="{ none: form.none }"
            >
              <label class="forms-list__label radio__label" :id="form.id">
                <input
                  class="radio-input forms-list__input visually-hidden"
                  type="radio"
                  name="formInput"
                  :id="form.name"
                  :value="form.value"
                  :checked="form.checked"
                  @click="changeRange($event), chooseProgram($event)"
                />
                <span class="radio__check"></span>
                <p class="radio-name programs-list__name" :id="form.id">
                  {{ form.name }}
                </p>
              </label>
            </li>
          </ul>
        </aside>
        <div class="range">
          <h3 class="range__budget programs__headline">Срок обучения</h3>
          <label for="range__label">
            <input
              class="range__input"
              type="range"
              name="range"
              id="range"
              min="0"
              max="10"
              step="1"
              value="10"
              @change="changeRange($event), chooseProgram($event)"
            />
          </label>
          <output for="range" class="range__output">Любой</output>
        </div>
      </div>
      <ul class="subjects-list list ul">
        <li
          class="subjects-list__item price-none"
          v-for="subject in subjects"
          :key="subject.id"
          :id="subject.id"
          :class="[subject.color, { none: subject.none }]"
        >
          <h3 class="subjects-list__name" :id="subject.id">
            {{ subject.name }}
          </h3>
          <p class="subjects-list__description">{{ subject.description }}</p>
          <p class="subjects-list__direction" :id="subject.id">
            {{ subject.direction }}
          </p>
          <p class="subjects-list__code up">{{ subject.code }}</p>
          <div class="price">
            <p class="price-headline">Цена:</p>
            <ul class="prices-list list" :id="subject.id">
              <li
                class="prices-list__item"
                v-for="price in subject.prices"
                :key="price.id"
                :id="price.id"
              >
                <p class="prices-list__name" :id="price.status">
                  {{ price.amount }}
                </p>
                <div class="prices-list__srock" :id="price.id"></div>
              </li>
            </ul>
          </div>
        </li>
      </ul>
      <button
        type="button"
        class="showButton showMoreSubjects"
        @click="chooseProgram"
      >
        Ещё программы
      </button>
      <button
        type="button"
        class="showButton showLessSubjects none"
        @click="chooseProgram"
      >
        Скрыть программы
      </button>
    </section>
  </div>
</template>

<script>
import store from "@/store/index.js";

export default {
  name: "Home",

  methods: {
    upperLetter: function (event) {
      let cap =
        event.target.value.charAt(0).toUpperCase() +
        event.target.value.slice(1);
      event.target.value = cap;
    },

    checkoutBachelor: function (event) {
      let programItems = document.querySelectorAll(".programs-list__item");
      let programInputs = document.querySelectorAll(".programs-list__input");
      programItems.forEach(function (programItem) {
        programInputs.forEach(function (programInput) {
          if (event.target.value === "Бакалавриат") {
            if (event.target.id === programItem.id) {
              programItem.classList.add("none");
            }
            if (
              programInput.value === "Бакалавриат на базе СОО" ||
              programInput.value === "Бакалавриат на базе СПО" ||
              (programInput.value === "Бакалавриат на базе ВО" &&
                programInput.id === programItem.id)
            ) {
              programItem.classList.remove("none");
            }
            if (programInput.value === "Бакалавриат на базе СОО") {
              programInput.checked = true;
            }
          }
          if (
            event.target.value === "Любая" ||
            event.target.value === "Магистратура" ||
            event.target.value === "Специалитет"
          ) {
            if (
              (programInput.value === "Бакалавриат на базе СОО" ||
                programInput.value === "Бакалавриат на базе СПО" ||
                programInput.value === "Бакалавриат на базе ВО") &&
              programInput.id === programItem.id
            ) {
              programItem.classList.add("none");
            }
            if (
              programInput.value === "Бакалавриат" &&
              programInput.id === programItem.id
            ) {
              programItem.classList.remove("none");
            }
          }
        });
      });
    },

    changeRange: function (event) {
      let formChecked;
      let rangeInputs = document.querySelectorAll(".range__input");
      let programInputs = document.querySelectorAll(".programs-list__input");
      let formItems = document.querySelectorAll(".forms-list__item");
      let formInputs = document.querySelectorAll(".forms-list__input");
      let subjects = document.querySelectorAll(".subjects-list__item");

      formInputs.forEach(function (formInput) {
        if (formInput.checked === true) {
          formChecked = formInput;
        }
      });

      subjects.forEach(function (subject) {
        subject.classList.remove("price-none");
        subject.classList.add("price-flex");

        rangeInputs.forEach(function (rangeInput) {
          if (formChecked.id === "Любая" && rangeInput.value === "10") {
            subject.classList.add("price-none");
            subject.classList.remove("price-flex");
          }
        });
      });

      programInputs.forEach(function (programInput) {
        formItems.forEach(function (formItem) {
          if (
            event.target.checked &&
            event.target.classList.contains("programs-list__input")
          ) {
            if (
              (event.target.value !== "Специалитет" &&
                programInput.classList.contains("shownSpecialty")) ||
              (event.target.value !== "Бакалавриат на базе ВО" &&
                programInput.classList.contains("shownbachelorVO")) ||
              (event.target.value !== "Магистратура" &&
                programInput.classList.contains("shownMagistracy"))
            ) {
              formItem.classList.add("none");
              if (
                formItem.id === "0" ||
                formItem.id === "1" ||
                formItem.id === "3" ||
                formItem.id === "4" ||
                formItem.id === "5"
              ) {
                formItem.classList.remove("none");
              }
              if (formItem.querySelector(".forms-list__input").checked) {
                formItem
                  .querySelector(".forms-list__input")
                  .removeAttribute("checked");
              }
              if (formItem.id === "0") {
                formItem.querySelector(".forms-list__input").checked = true;
              }
            }
          }

          if (event.target.value === "Бакалавриат на базе ВО") {
            event.target.classList.add("shownbachelorVO");
            formItem.classList.add("none");
            if (formItem.querySelector(".forms-list__input").checked) {
              formItem
                .querySelector(".forms-list__input")
                .removeAttribute("checked");
            }
            if (
              formItem.id === "0" ||
              formItem.id === "1" ||
              formItem.id === "8" ||
              formItem.id === "9" ||
              formItem.id === "3" ||
              formItem.id === "4" ||
              formItem.id === "5"
            ) {
              formItem.classList.remove("none");
            }
            if (formItem.id === "0") {
              formItem.querySelector(".forms-list__input").checked = true;
            }
          }

          if (event.target.value === "Магистратура") {
            event.target.classList.add("shownMagistracy");
            formItem.classList.add("none");
            if (formItem.querySelector(".forms-list__input").checked) {
              formItem
                .querySelector(".forms-list__input")
                .removeAttribute("checked");
            }
            if (
              formItem.id === "0" ||
              formItem.id === "1" ||
              formItem.id === "2" ||
              formItem.id === "5"
            ) {
              formItem.classList.remove("none");
            }
            if (formItem.id === "0") {
              formItem.querySelector(".forms-list__input").checked = true;
            }
          }

          if (event.target.value === "Специалитет") {
            event.target.classList.add("shownSpecialty");
            formItem.classList.add("none");
            if (formItem.querySelector(".forms-list__input").checked) {
              formItem
                .querySelector(".forms-list__input")
                .removeAttribute("checked");
            }
            if (
              formItem.id === "0" ||
              formItem.id === "6" ||
              formItem.id === "7" ||
              formItem.id === "11" ||
              formItem.id === "12" ||
              formItem.id === "13"
            ) {
              formItem.classList.remove("none");
            }
            if (formItem.id === "0") {
              formItem.querySelector(".forms-list__input").checked = true;
            }
          }
        });
      });
    },

    chooseProgram: function (event) {
      let directionContent;
      let programName;
      let formValue;
      let subjectsQuantity = [];

      let patternRegExp = new RegExp(
        document.querySelector(".filter__input").value
      );
      let subjectItems = document.querySelectorAll(".subjects-list__item");
      let programInputs = document.querySelectorAll(".programs-list__input");
      let formInputs = document.querySelectorAll(".forms-list__input");
      let directionInputs = document.querySelectorAll(
        ".directions-list__input"
      );
      let rangeOutput = document.querySelector(".range__output");
      let showMoreSubjects = document.querySelector(".showMoreSubjects");
      let showLessSubjects = document.querySelector(".showLessSubjects");

      if (event.target.classList.contains("range__input")) {
        if (event.target.value === "0") {
          rangeOutput.value = "День";
        }
        if (event.target.value === "1") {
          rangeOutput.value = "Вечер";
        }
        if (event.target.value === "2") {
          rangeOutput.value = "2 года";
        }
        if (event.target.value === "3") {
          rangeOutput.value = "2 года 3 мес";
        }
        if (event.target.value === "4") {
          rangeOutput.value = "2.5 года";
        }
        if (event.target.value === "5") {
          rangeOutput.value = "3 года";
        }
        if (event.target.value === "6") {
          rangeOutput.value = "3.5 года";
        }
        if (event.target.value === "7") {
          rangeOutput.value = "4 года";
        }
        if (event.target.value === "8") {
          rangeOutput.value = "4.5 года";
        }
        if (event.target.value === "9") {
          rangeOutput.value = "5.5 лет";
        }
        if (event.target.value === "10") {
          rangeOutput.value = "Любой";
        }
      }

      directionInputs.forEach(function (directionInput) {
        if (directionInput.checked) {
          directionContent = directionInput.value;
        }
      });
      programInputs.forEach(function (programInput) {
        if (programInput.checked) {
          programName = programInput.value;
        }
      });
      formInputs.forEach(function (formInput) {
        if (formInput.checked) {
          formValue = formInput.value;
        }
      });

      subjectItems.forEach(function (subjectsItem) {
        subjectsItem.classList.add("none");
        let subjectName = subjectsItem.querySelector(".subjects-list__name");
        let subjectDirection = subjectsItem.querySelector(
          ".subjects-list__direction"
        );
        let priceItems = subjectsItem.querySelectorAll(".prices-list__item");

        priceItems.forEach(function (priceItem) {
          priceItem.classList.add("none");
          if (
            (priceItem.querySelector(".prices-list__name").id === formValue ||
              formValue === "any") &&
            (priceItem.querySelector(".prices-list__srock").id ===
              rangeOutput.value ||
              rangeOutput.value === "Любой")
          ) {
            priceItem.classList.remove("none");
            subjectsItem.classList.add("priceActivated");
          }
        });

        if (
          (subjectDirection.textContent === programName ||
            programName === "Любая") &&
          (subjectName.textContent === directionContent ||
            directionContent === "Все направления") &&
          patternRegExp.test(subjectName.textContent) &&
          subjectsItem.classList.contains("priceActivated")
        ) {
          subjectsItem.classList.remove("none");
          subjectsQuantity.push(subjectsItem);
        }
      });

      if (subjectsQuantity.length > 9) {
        showMoreSubjects.classList.remove("none");
        for (let i = 0; i < subjectsQuantity.length; i++) {
          if (i > 8 && !event.target.classList.contains("showMoreSubjects")) {
            subjectsQuantity[i].classList.add("none");
            showLessSubjects.classList.add("none");
          }
          if (i > 8 && event.target.classList.contains("showMoreSubjects")) {
            subjectsQuantity[i].classList.remove("none");
            event.target.classList.add("none");
            showLessSubjects.classList.remove("none");
          }
        }
      } else {
        showMoreSubjects.classList.add("none");
      }
    },
  },

  computed: {
    subjects() {
      if (store.state.subjects) {
        store.state.subjects.forEach((p, i) => {
          p.id = i;
          if (p.name === "Лингвистика") {
            p.color = "green";
          }
          if (p.name === "Педагогическое образование") {
            p.color = "bodily";
          }
          if (p.name === "Сервис") {
            p.color = "neon";
          }
          if (p.name === "Менеджмент") {
            p.color = "pink";
          }
          if (p.name === "Реклама и связи с общественностью") {
            p.color = "violet";
          }
          if (p.name === "Экономика") {
            p.color = "yellow";
          }
          if (p.name === "Психология") {
            p.color = "brown";
          }
          if (p.name === "Востоковедение и африканистика") {
            p.color = "deep-blue";
          }
          if (p.name === "Государственное и муниципальное управление") {
            p.color = "deep-green";
          }
          if (p.id > 8) {
            p.none = true;
          }
        });
      }
      return store.state.subjects;
    },
    forms() {
      if (store.state.forms) {
        store.state.forms.forEach((p, i) => {
          p.id = i;
        });
      }
      return store.state.forms;
    },
    directions() {
      if (store.state.directions) {
        store.state.directions.forEach((p, i) => {
          p.id = i;
          if (p.name === "Лингвистика") {
            p.color = "green";
          }
          if (p.name === "Педагогическое образование") {
            p.color = "bodily";
          }
          if (p.name === "Сервис") {
            p.color = "neon";
          }
          if (p.name === "Менеджмент") {
            p.color = "pink";
          }
          if (p.name === "Реклама и связи с общественностью") {
            p.color = "violet";
          }
          if (p.name === "Экономика") {
            p.color = "yellow";
          }
          if (p.name === "Психология") {
            p.color = "brown";
          }
          if (p.name === "Востоковедение и африканистика") {
            p.color = "deep-blue";
          }
          if (p.name === "Государственное и муниципальное управление") {
            p.color = "deep-green";
          }
        });
      }
      return store.state.directions;
    },
    programs() {
      if (store.state.programs) {
        store.state.programs.forEach((p, i) => {
          p.id = i;
          if (
            p.name === "Бакалавриат на базе СОО" ||
            p.name === "Бакалавриат на базе СПО" ||
            p.name === "Бакалавриат на базе ВО"
          ) {
            p.none = true;
          }
        });
      }
      return store.state.programs;
    },
  },
  async mounted() {
    store.dispatch("fetchSubjects");
    store.dispatch("fetchForms");
    store.dispatch("fetchDirections");
    store.dispatch("fetchPrograms");
  },
};
</script>
