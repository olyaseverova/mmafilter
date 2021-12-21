<template>
  <div class="autorisation page">
    <header class="main-header">
      <h1 class="headline">Авторизация</h1>
      <router-link class="link" to="/">Направления</router-link>
    </header>
    <form class="sign-up" method="post" action="" enctype="multipart/form-data">
      <ul class="sign-up-types flex space-between list">
        <li
          class="sign-up-types__item"
          v-for="type in types"
          :key="type.id"
          :id="type.id"
        >
          <label class="sign-up-types__label" :id="type.id">
            <input
              class="sign-up-types__input visually-hidden"
              type="radio"
              name="signUpInput"
              :id="type.id"
              :value="type.value"
              :checked="type.checked"
              @click="changeForm"
            />
            <h3
              class="sign-up__headline"
              :id="type.id"
              :class="{ checked_headline: type.checked }"
            >
              {{ type.headline }}
            </h3>
            <ul
              class="fields-list list none"
              :class="{ block: type.checked }"
              :id="type.id"
            >
              <li
                class="fields-list__item"
                v-for="field in type.fields"
                :key="field.id"
              >
                <label class="fields-list__label">
                  <p class="fields-list__p">{{ field.name }}</p>
                  <input
                    class="fields-list__input"
                    :type="field.type"
                    :placeholder="field.placeholder"
                    :class="field.class"
                    @click="validateForm"
                    @keyup="validateForm"
                  />
                </label>
              </li>
              <label
                class="checkbox-label none"
                :class="{ flex: type.checkbox }"
              >
                <input
                  class="checkbox-input visually-hidden"
                  type="checkbox"
                  @click="validateForm"
                />
                <span class="check-box"></span>
                <p class="checkbox-label__p">Сохранить данные</p>
              </label>
              <div class="login">
                <button
                  type="submit"
                  class="sign-in__submit"
                  disabled
                  :class="{ margin0: type.checkbox }"
                >
                  Войти
                </button>
                <a
                  class="link none"
                  href="https://www.gmail.com/mail/help/intl/ru/about.html?de."
                  :class="{ block: type.checkbox }"
                >
                  Забыли пароль?
                </a>
              </div>
            </ul>
          </label>
        </li>
      </ul>
    </form>
  </div>
</template>

<script>
// import store from "@/store/index.js";

export default {
  name: "Autorisation",

  data() {
    return {
      types: [
        {
          headline: "Войти",
          id: 0,
          checked: true,
          checkbox: true,
          fields: [
            {
              name: "Логин",
              placeholder: "Иван Иванов",
              type: "text",
              class: "loginInputSignIn",
            },
            {
              name: "Пароль",
              placeholder: "••••••••••",
              type: "password",
              class: "passwordInputSignIn",
            },
          ],
        },
        {
          headline: "Зарегистрироваться",
          id: 1,
          fields: [
            {
              name: "Имя Фамилия",
              placeholder: "Иван Иванов",
              type: "text",
              class: "loginInputAutorisation",
            },
            {
              name: "Почта",
              placeholder: "ivan.ivanov@gmail.com",
              type: "text",
              class: "emailAutorisaton",
            },
            {
              name: "Пароль",
              placeholder: "••••••••••",
              type: "password",
              class: "passwordAutorisaton",
            },
            {
              name: "Подтвердите пароль",
              placeholder: "••••••••••",
              type: "password",
              class: "passwordConfirmAutorisaton",
            },
          ],
        },
      ],
    };
  },

  methods: {
    changeForm: function (event) {
      let headlineItems = document.querySelectorAll(".sign-up__headline");
      let fieldsList = document.querySelectorAll(".fields-list");
      fieldsList.forEach(function (fields) {
        headlineItems.forEach(function (headline) {
          headline.classList.remove("checked_headline");
          fields.classList.remove("block");
          if (event.target.id === fields.id) {
            fields.classList.add("block");
          }
          if (event.target.id === headline.id) {
            headline.classList.add("checked_headline");
          }
        });
      });
    },

    validateForm: function (event) {
      let loginInputAutorisation = document.querySelector(
        ".loginInputAutorisation"
      );
      let loginInput = document.querySelector(".loginInputSignIn");
      let emailAutorisaton = document.querySelector(".emailAutorisaton");
      let passwordAutorisaton = document.querySelector(".passwordAutorisaton");
      let passwordConfirmAutorisaton = document.querySelector(
        ".passwordConfirmAutorisaton"
      );
      let passwordInput = document.querySelector(".passwordInputSignIn");
      let submitButtons = document.querySelectorAll(".sign-in__submit");

      if (event.target.classList.contains("loginInputSignIn")) {
        if (passwordInput.value && event.target.value) {
          submitButtons.forEach(function (submitButton) {
            submitButton.removeAttribute("disabled", "disabled");
          });
        } else {
          submitButtons.forEach(function (submitButton) {
            submitButton.setAttribute("disabled", "disabled");
          });
        }
      }

      if (event.target.classList.contains("passwordInputSignIn")) {
        if (!loginInput.value) {
          loginInput.setAttribute("required", "required");
        }
        submitButtons.forEach(function (submitButton) {
          if (loginInput.value && event.target.value) {
            if (submitButton.classList.contains("margin0")) {
              submitButton.removeAttribute("disabled", "disabled");
            }
          } else {
            if (submitButton.classList.contains("margin0")) {
              submitButton.setAttribute("disabled", "disabled");
            }
          }
        });
      }
      if (event.target.classList.contains("checkbox-input")) {
        if (!loginInput.value) {
          loginInput.setAttribute("required", "required");
        }
        if (!passwordInput.value) {
          passwordInput.setAttribute("required", "required");
        }
      }

      if (event.target.classList.contains("loginInputAutorisation")) {
        submitButtons.forEach(function (submitButton) {
          if (
            event.target.value &&
            emailAutorisaton.value &&
            passwordAutorisaton.value.length > 0 &&
            passwordConfirmAutorisaton.value === passwordAutorisaton.value
          ) {
            if (!submitButton.classList.contains("margin0")) {
              submitButton.removeAttribute("disabled", "disabled");
            }
          } else {
            if (!submitButton.classList.contains("margin0")) {
              submitButton.setAttribute("disabled", "disabled");
            }
          }
        });
      }

      if (event.target.classList.contains("emailAutorisaton")) {
        if (!loginInputAutorisation.value) {
          loginInputAutorisation.setAttribute("required", "required");
        }

        submitButtons.forEach(function (submitButton) {
          if (
            loginInputAutorisation.value &&
            emailAutorisaton.value &&
            passwordAutorisaton.length > 0 &&
            passwordConfirmAutorisaton.value === passwordAutorisaton.value
          ) {
            if (!submitButton.classList.contains("margin0")) {
              submitButton.removeAttribute("disabled", "disabled");
            }
          } else {
            if (!submitButton.classList.contains("margin0")) {
              submitButton.setAttribute("disabled", "disabled");
            }
          }
        });
      }

      if (event.target.classList.contains("passwordAutorisaton")) {
        if (!loginInputAutorisation.value) {
          loginInputAutorisation.setAttribute("required", "required");
        }
        if (!emailAutorisaton.value) {
          emailAutorisaton.setAttribute("required", "required");
        }
        submitButtons.forEach(function (submitButton) {
          if (
            loginInputAutorisation.value &&
            emailAutorisaton.value &&
            passwordAutorisaton.value.length > 0 &&
            passwordConfirmAutorisaton.value === passwordAutorisaton.value
          ) {
            if (!submitButton.classList.contains("margin0")) {
              submitButton.removeAttribute("disabled", "disabled");
            }
          } else {
            if (!submitButton.classList.contains("margin0")) {
              submitButton.setAttribute("disabled", "disabled");
            }
          }
        });
      }

      if (event.target.classList.contains("passwordConfirmAutorisaton")) {
        if (!loginInputAutorisation.value) {
          loginInputAutorisation.setAttribute("required", "required");
        }
        if (!emailAutorisaton.value) {
          emailAutorisaton.setAttribute("required", "required");
        }
        if (!passwordAutorisaton.value) {
          passwordAutorisaton.setAttribute("required", "required");
        }
        submitButtons.forEach(function (submitButton) {
          if (
            loginInputAutorisation.value &&
            emailAutorisaton.value &&
            passwordAutorisaton.value === event.target.value
          ) {
            if (!submitButton.classList.contains("margin0")) {
              submitButton.removeAttribute("disabled", "disabled");
            }
          } else {
            if (!submitButton.classList.contains("margin0")) {
              submitButton.setAttribute("disabled", "disabled");
            }
          }
        });
      }
    },
  },

  // computed: {
  //   subjects() {
  //     if (store.state.subjects) {
  //       store.state.subjects.forEach((p, i) => {
  //         p.id = i;
  //         if (
  //           p.direction === "Бакалавриат на базе СПО" ||
  //           p.direction === "Магистратура" ||
  //           p.direction === "Специалитет" ||
  //           p.direction === "Бакалавриат на базе ВО" ||
  //           p.name === "Востоковедение и африканистика" ||
  //           p.id > 8
  //         ) {
  //           p.none = true;
  //         }
  //       });
  //     }
  //     return store.state.subjects;
  //   },
  //   forms() {
  //     if (store.state.forms) {
  //       store.state.forms.forEach((p, i) => {
  //         p.id = i;
  //       });
  //     }
  //     return store.state.forms;
  //   },
  //   directions() {
  //     if (store.state.directions) {
  //       store.state.directions.forEach((p, i) => {
  //         p.id = i;
  //       });
  //     }
  //     return store.state.directions;
  //   },
  //   programs() {
  //     if (store.state.programs) {
  //       store.state.programs.forEach((p, i) => {
  //         p.id = i;
  //         if (
  //           p.name === "Бакалавриат на базе СОО" ||
  //           p.name === "Бакалавриат на базе СПО" ||
  //           p.name === "Бакалавриат на базе ВО"
  //         ) {
  //           p.none = true;
  //         }
  //       });
  //     }
  //     return store.state.programs;
  //   },
  // },
  // async mounted() {
  //   store.dispatch("fetchSubjects");
  //   store.dispatch("fetchForms");
  //   store.dispatch("fetchDirections");
  //   store.dispatch("fetchPrograms");
  // },
};
</script>


