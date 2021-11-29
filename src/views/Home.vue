<template>
  <div class="filter">
    <h1 class="headline">Направления</h1>
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
          <div class="directions-list__name" :id="direction.id">
            {{ direction.name }}
          </div>
        </label>
      </li>
    </ul>

    <section class="center">
      <div class="filter-rpgrams-forms">
        <aside class="programs">
          <h2 class="programs__headline">Программы обучения</h2>
          <ul class="programs-list radio-list list">
            <li
              class="programs-list__item radio-list__item"
              v-for="program in programs"
              :key="program.id"
              :id="program.id"
            >
              <label class="programs-list__label" :id="program.id">
                <input
                  class="radio-input programs-list__input visually-hidden"
                  type="radio"
                  name="programInput"
                  :id="program.id"
                  :value="program.name"
                  :checked="program.checked"
                  @click="changeRange($event), chooseProgram($event)"
                />
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
              <label class="forms-list__label" :id="form.id">
                <input
                  class="radio-input forms-list__input visually-hidden"
                  type="radio"
                  name="formInput"
                  :id="form.name"
                  :value="form.value"
                  :checked="form.checked"
                  @click="changeRange($event), chooseProgram($event)"
                />
                <p class="radio-name programs-list__name" :id="form.id">
                  {{ form.name }}
                </p>
              </label>
            </li>
          </ul>
        </aside>
        <div class="range">
          <p class="range__budget">Срок обучения</p>
          <label for="range__label">
            <input
              class="range__input"
              type="range"
              name="range"
              id="range"
              min="0"
              max="9"
              step="1"
              value="7"
              @change="chooseProgram"
            />
          </label>
          <output for="range" class="range__output">4 года</output>
        </div>
      </div>
      <ul class="subjects-list list ul">
        <li
          class="subjects-list__item"
          v-for="subject in subjects"
          :key="subject.id"
          :id="subject.id"
        >
          <h3 class="subjects-list__name" :id="subject.id">
            {{ subject.name }}
          </h3>
          <p class="subjects-list__description">{{ subject.description }}</p>
          <p class="subjects-list__direction" :id="subject.id">
            {{ subject.direction }}
          </p>
          <p class="subjects-list__code up">{{ subject.code }}</p>
          <div class="flex">
            <p class="price-headline">Цена:</p>
            <ul class="prices-list list" :id="subject.id">
              <li
                class="prices-list__item"
                v-for="price in subject.prices"
                :key="price.id"
                :id="price.id"
                :class="{ none: !price.checked }"
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

    changeRange: function (event) {
      let rangeOutput = document.querySelector(".range__output");
      let programInputs = document.querySelectorAll(".programs-list__input");
      let formItems = document.querySelectorAll(".forms-list__item");

      document.querySelector(".range__input").value = "7";
      rangeOutput.value = "4 года";

      if (event.target.value === "Бакалавриат на базе СПО") {
        document.querySelector(".range__input").value = "5";
        rangeOutput.value = "3 года";
      }
      if (event.target.value === "Востоковедение и африканистика") {
        document.querySelector(".range__input").value = "0";
        rangeOutput.value = "День";
      }
      if (
        event.target.id === "Заочная (ГВД)" ||
        event.target.id === "Заочная (классика)" ||
        event.target.id === "Заочная (дистант)"
      ) {
        document.querySelector(".range__input").value = "8";
        rangeOutput.value = "4.5 года";
      }

      programInputs.forEach(function (programInput) {
        formItems.forEach(function (formItem) {
          if (programInput.checked && programInput.value === "Магистратура") {
            if (event.target.id === "Заочная (дистант)") {
              document.querySelector(".range__input").value = "3";
              rangeOutput.value = "2 года 3 мес";
            }
            if (event.target.id === "Очная") {
              document.querySelector(".range__input").value = "2";
              rangeOutput.value = "2 года";
            }
          }

          if (
            programInput.checked &&
            programInput.value === "Бакалавриат на базе СПО"
          ) {
            if (
              event.target.id === "Заочная (ГВД)" ||
              event.target.id === "Заочная (классика)" ||
              event.target.id === "Заочная (дистант)"
            ) {
              document.querySelector(".range__input").value = "6";
              rangeOutput.value = "3.5 года";
            }
            if (event.target.id === "Очная") {
              document.querySelector(".range__input").value = "5";
              rangeOutput.value = "3 года";
            }
          }

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
                formItem.id === "2" ||
                formItem.id === "3" ||
                formItem.id === "4"
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
            document.querySelector(".range__input").value = "5";
            rangeOutput.value = "2.5 года";
            formItem.classList.add("none");
            if (formItem.querySelector(".forms-list__input").checked) {
              formItem
                .querySelector(".forms-list__input")
                .removeAttribute("checked");
            }
            if (
              formItem.id === "0" ||
              formItem.id === "7" ||
              formItem.id === "8" ||
              formItem.id === "2" ||
              formItem.id === "3" ||
              formItem.id === "4"
            ) {
              formItem.classList.remove("none");
            }
            if (formItem.id === "0") {
              formItem.querySelector(".forms-list__input").checked = true;
            }
          }

          if (
            programInput.checked &&
            programInput.value === "Бакалавриат на базе ВО"
          ) {
            if (
              event.target.id === "Заочная (ГВД)" ||
              event.target.id === "Заочная (классика)" ||
              event.target.id === "Заочная (дистант)"
            ) {
              document.querySelector(".range__input").value = "5";
              rangeOutput.value = "3 года";
            }
            if (
              event.target.id === "Очная" ||
              event.target.id === "Очно-заочная (ГВД)" ||
              event.target.id === "Очно-заочная (классика)"
            ) {
              document.querySelector(".range__input").value = "4";
              rangeOutput.value = "2.5 года";
            }
          }

          if (event.target.value === "Магистратура") {
            event.target.classList.add("shownMagistracy");
            document.querySelector(".range__input").value = "2";
            rangeOutput.value = "2 года";
            formItem.classList.add("none");
            if (formItem.querySelector(".forms-list__input").checked) {
              formItem
                .querySelector(".forms-list__input")
                .removeAttribute("checked");
            }
            if (
              formItem.id === "0" ||
              formItem.id === "1" ||
              formItem.id === "4"
            ) {
              formItem.classList.remove("none");
            }
            if (formItem.id === "0") {
              formItem.querySelector(".forms-list__input").checked = true;
            }
          }

          if (programInput.checked && programInput.value === "Магистратура") {
            if (
              event.target.id === "Очная" ||
              event.target.id === "Заочная (2 года / 2 года и 3 мес)"
            ) {
              document.querySelector(".range__input").value = "2";
              rangeOutput.value = "2 года";
            }
            if (event.target.id === "Заочная (дистант)") {
              document.querySelector(".range__input").value = "3";
              rangeOutput.value = "2 года 3 мес";
            }
          }

          if (event.target.value === "Специалитет") {
            event.target.classList.add("shownSpecialty");
            document.querySelector(".range__input").value = "9";
            rangeOutput.value = "5.5 лет";
            formItem.classList.add("none");
            if (formItem.querySelector(".forms-list__input").checked) {
              formItem
                .querySelector(".forms-list__input")
                .removeAttribute("checked");
            }
            if (
              formItem.id === "5" ||
              formItem.id === "6" ||
              formItem.id === "10" ||
              formItem.id === "11" ||
              formItem.id === "12"
            ) {
              formItem.classList.remove("none");
            }
            if (formItem.id === "5") {
              formItem.querySelector(".forms-list__input").checked = true;
            }
          }

          if (programInput.checked && programInput.value === "Специалитет") {
            if (event.target.id === "Очная на базе СОО") {
              document.querySelector(".range__input").value = "9";
              rangeOutput.value = "5.5 лет";
            }
            if (
              event.target.id === "Очная на базе СПО" ||
              event.target.id === "Очная на базе медицинского СПО"
            ) {
              document.querySelector(".range__input").value = "8";
              rangeOutput.value = "4.5 года";
            }
            if (
              event.target.id ===
              "Очная на базе высшего психолого-педагогического, дефектологического и педагогического образования"
            ) {
              document.querySelector(".range__input").value = "5";
              rangeOutput.value = "3 года";
            }
            if (
              event.target.id ===
              "Очная на базе неспециального высшего образования"
            ) {
              document.querySelector(".range__input").value = "7";
              rangeOutput.value = "4 года";
            }
          }
        });
      });
    },

    chooseProgram: function (event) {
      let directionContent;
      let programName;
      let formValue;

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
            subjectDirection.textContent === programName &&
            subjectName.textContent === directionContent &&
            priceItem.querySelector(".prices-list__name").id === formValue &&
            priceItem.querySelector(".prices-list__srock").id ===
              rangeOutput.value &&
            patternRegExp.test(subjectName.textContent)
          ) {
            priceItem.classList.remove("none");
            subjectsItem.classList.remove("none");
          }
          if (
            programName === "Любая" &&
            subjectName.textContent === directionContent &&
            priceItem.querySelector(".prices-list__name").id === formValue &&
            priceItem.querySelector(".prices-list__srock").id ===
              rangeOutput.value &&
            patternRegExp.test(subjectName.textContent)
          ) {
            priceItem.classList.remove("none");
            subjectsItem.classList.remove("none");
          }
          if (
            directionContent === "Все направления" &&
            subjectDirection.textContent === programName &&
            priceItem.querySelector(".prices-list__name").id === formValue &&
            priceItem.querySelector(".prices-list__srock").id ===
              rangeOutput.value &&
            patternRegExp.test(subjectName.textContent)
          ) {
            priceItem.classList.remove("none");
            subjectsItem.classList.remove("none");
          }
          if (
            directionContent === "Все направления" &&
            programName === "Любая" &&
            priceItem.querySelector(".prices-list__name").id === formValue &&
            priceItem.querySelector(".prices-list__srock").id ===
              rangeOutput.value &&
            patternRegExp.test(subjectName.textContent)
          ) {
            priceItem.classList.remove("none");
            subjectsItem.classList.remove("none");
          }
        });
      });
    },
  },

  computed: {
    subjects() {
      if (store.state.subjects) {
        store.state.subjects.forEach((p, i) => {
          p.id = i;
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
  },
  async mounted() {
    store.dispatch("fetchSubjects");
    store.dispatch("fetchForms");
  },

  data() {
    return {
      directions: [
        {
          name: "Все направления",
          checked: true,
          id: 0,
        },
        { name: "Педагогическое образование", id: 1 },
        { name: "Менеджмент", id: 2 },
        { name: "Экономика", id: 3 },
        { name: "Психология", id: 4 },
        { name: "Востоковедение и африканистика", id: 5 },
        { name: "Государственное и муниципальное управление", id: 6 },
        { name: "Лингвистика", id: 7 },
        { name: "Сервис", id: 8 },
        { name: "Реклама и связи с общественностью", id: 9 },
      ],

      programs: [
        { name: "Любая", checked: true, id: 0 },
        { name: "Бакалавриат на базе СОО", id: 1 },
        { name: "Бакалавриат на базе СПО", id: 2 },
        { name: "Бакалавриат на базе ВО", id: 3 },
        { name: "Магистратура", id: 4 },
        { name: "Специалитет", id: 5 },
      ],
    };
  },
};
</script>
