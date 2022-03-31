<template>
  <div class="common">
    <form class="form">
      <input
        v-model.trim="form.name"
        placeholder="Фамилия"
        :class="{ errorInput: $v.form.name.$dirty && !$v.form.name.required }"
      />
      <div class="form-underSpace">
        <small
          v-if="$v.form.name.$dirty && !$v.form.name.required"
          class="errorHelper"
          >Введите фамилию</small
        >
        <small
          v-if="$v.form.name.$dirty && !$v.form.name.word"
          class="errorHelper"
          >Ввод должен состоять только из букв</small
        >
      </div>
      <input
        v-model.trim="form.lastName"
        placeholder="Имя"
        :class="{
          errorInput: $v.form.lastName.$dirty && !$v.form.lastName.required,
        }"
      />
      <div class="form-underSpace">
        <small
          v-if="$v.form.lastName.$dirty && !$v.form.lastName.required"
          class="errorHelper"
          >Введите имя</small
        >
        <small
          v-if="$v.form.lastName.$dirty && !$v.form.lastName.word"
          class="errorHelper"
          >Ввод должен состоять только из букв</small
        >
      </div>
      <input
        :class="{
          errorInput: $v.form.middleName.$dirty && !$v.form.middleName.required,
        }"
        v-model.trim="form.middleName"
        placeholder="Отчество"
      />
      <div class="form-underSpace">
        <small
          v-if="$v.form.middleName.$dirty && !$v.form.middleName.required"
          class="errorHelper"
          >Введите отчество</small
        >
        <small
          v-if="$v.form.lastName.$dirty && !$v.form.middleName.word"
          class="errorHelper"
          >Ввод должен состоять только из букв</small
        >
      </div>
      <p>Дата рождения</p>
      <div class="form-date">
        <input
          placeholder="День"
          @keydown="keyDay"
          v-model.trim="date.day"
          :class="{
            errorInput: $v.date.day.$dirty && !$v.date.day.required,
          }"
          ref="day"
        />
        <input
          placeholder="Месяц"
          @keydown="keyMonth"
          v-model.trim="date.month"
          :class="{
            errorInput: $v.date.month.$dirty && !$v.date.month.required,
          }"
          ref="month"
        />
        <input
          placeholder="Год"
          @keydown="keyYear"
          v-model.trim="date.year"
          :class="{
            errorInput: $v.date.year.$dirty && !$v.date.year.required,
          }"
          ref="year"
        />
      </div>
      <small
        v-if="
          ($v.date.day.$dirty && !$v.date.day.required) ||
          ($v.date.month.$dirty && !$v.date.month.required) ||
          ($v.date.year.$dirty && !$v.date.year.required)
        "
        class="errorHelper"
        >Введите дату рождения</small
      >
      <small
        v-if="
          ($v.date.day.$dirty && !$v.date.day.between) ||
          ($v.date.month.$dirty && !$v.date.month.between) ||
          ($v.date.year.$dirty && !$v.date.year.between)
        "
        class="errorHelper"
        >Введите корректную дату рождения</small
      >
      <p>Номер телефона</p>
      <input
        v-model.trim="form.phoneNum"
        :class="{
          errorInput: $v.form.phoneNum.$dirty && !$v.form.phoneNum.required,
        }"
        ref="phoneNum"
      />
      <small
        v-if="$v.form.phoneNum.$dirty && !$v.form.phoneNum.required"
        class="errorHelper"
        >Введите номер телефона</small
      >
      <small
        v-if="$v.form.phoneNum.$dirty && !$v.form.phoneNum.minLength"
        class="errorHelper"
        >Номер должен состоть из 11 чисел а сейчас он
        {{ form.phoneNum.length }}</small
      >
      <small
        v-if="$v.form.phoneNum.$dirty && !$v.form.phoneNum.numeric"
        class="errorHelper"
        >Ввод должен состоять только из чисел</small
      >
      <p>Пол</p>
      <small
        v-if="$v.form.selectedGender.$dirty && !$v.form.selectedGender.required"
        class="errorHelper"
        >Добавьте пол</small
      >
      <div class="form-gender">
        <div @click="genderOne(one.name)" v-for="one in gender" :key="one.name">
          <p>{{ one.name }}</p>
          <div
            :style="{
              background: one.name === form.selectedGender ? '#61677c' : '',
              'box-shadow':
                one.name === form.selectedGender
                  ? 'inset 2px 2px 5px #fff, inset -2px -2px 5px #babecc'
                  : 'inset 2px 2px 5px #babecc, inset -5px -5px 10px #fff',
            }"
          ></div>
        </div>
      </div>
      <p>Группа клиентов</p>
      <small
        v-if="$v.form.selectedClient.$dirty && !$v.form.selectedClient.required"
        class="errorHelper"
        >Добавьте группу клиентов</small
      >
      <div class="form-select">
        <div
          class="form-select_icon"
          @click="dropClient"
          :style="{ transform: isClient ? 'rotate(180deg)' : '' }"
        >
          <img src="../assets/arrow.png" alt="#" />
        </div>
        <input
          class="form-select_btn"
          :class="{
            errorInput:
              $v.form.selectedClient.$dirty && !$v.form.selectedClient.required,
          }"
          @focus="isClient = true"
          v-model="form.selectedClient"
          placeholder="Выбор клиентов"
          readonly
        />
        <transition name="clientTransition">
          <div class="form-select_drop" v-show="isClient">
            <div
              v-for="(client, i) in clientOption"
              :key="client"
              @click="pickClient(client, i)"
              ref="isChecked"
            >
              {{ client }}
            </div>
          </div>
        </transition>
      </div>
      <p>Лечащий врач</p>
      <small
        v-if="$v.form.selectedDoctor.$dirty && !$v.form.selectedDoctor.required"
        class="errorHelper"
        >Добавьте лечащего врача</small
      >
      <div class="form-select">
        <div
          class="form-select_icon"
          @click="dropDoctor"
          :style="{ transform: isDoctor ? 'rotate(180deg)' : '' }"
        >
          <img src="../assets/arrow.png" alt="#" />
        </div>
        <input
          placeholder="Выбор врача"
          class="form-select_btn"
          :class="{
            errorInput:
              $v.form.selectedDoctor.$dirty && !$v.form.selectedDoctor.required,
          }"
          @focus="isDoctor = true"
          v-model="form.selectedDoctor"
          readonly
        />
        <transition name="clientTransition">
          <div class="form-select_drop" v-show="isDoctor">
            <div
              v-for="doctor in doctorOption"
              :key="doctor"
              :class="{ checked: doctor === form.selectedDoctor }"
              @click="pickDoctor(doctor)"
            >
              {{ doctor }}
            </div>
          </div>
        </transition>
      </div>
      <div class="form-sms" @click="form.isSms = !form.isSms">
        <p>Не отправлять СМС</p>
        <div
          :style="{
            background: form.isSms ? '#61677c' : '',
            'box-shadow': form.isSms
              ? 'inset 2px 2px 5px #fff, inset -2px -2px 5px #babecc'
              : 'inset 2px 2px 5px #babecc, inset -5px -5px 10px #fff',
          }"
        ></div>
      </div>
      <div class="form-button">
        <button @click.prevent="next">Далее</button>
      </div>
    </form>
  </div>
</template>

<script>
import DateMixin from "@/mixins/DateMixin";
import { validationMixin } from "vuelidate";
import {
  required,
  minLength,
  between,
  numeric,
} from "vuelidate/lib/validators";
import { mapActions } from "vuex/dist/vuex.mjs";
import { word } from "@/functions/wordValidator";

export default {
  name: "v-form",
  mixins: [DateMixin, validationMixin],
  props: {
    isClear: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  data: () => ({
    form: {
      name: "",
      lastName: "",
      middleName: "",
      phoneNum: 7,
      selectedGender: "",
      selectedClient: [],
      selectedDoctor: "",
      isSms: false,
    },
    clientOption: ["VIP", "Проблемные", "ОМС"],
    doctorOption: ["Иванов", "Захаров", "Чернышева"],
    gender: [{ name: "Мужчина" }, { name: "Женщина" }],
    isClient: false,
    isDoctor: false,
  }),
  validations: {
    form: {
      name: {
        required,
        word,
      },
      lastName: {
        required,
        word,
      },
      middleName: {
        required,
        word,
      },
      phoneNum: {
        required,
        minLength: minLength(11),
        numeric,
      },
      selectedGender: { required },
      selectedClient: { required },
      selectedDoctor: { required },
    },
    date: {
      day: {
        required,
        between: between(0, 12),
      },
      month: {
        required,
        between: between(0, 12),
      },
      year: {
        required,
        between: between(1930, 2022),
      },
    },
  },
  watch: {
    isClear() {
      this.form.name = "";
      this.form.lastName = "";
      this.form.middleName = "";
      this.form.phoneNum = 7;
      this.form.selectedGender = "";
      this.form.selectedClient = [];
      this.form.selectedDoctor = "";
      this.form.isSms = false;
      this.date.day = "";
      this.date.month = "";
      this.date.year = "";
      this.$v.$reset();
    },
  },
  methods: {
    ...mapActions(["SET_CLIENT"]),
    dropDoctor() {
      this.isDoctor = this.isDoctor !== true;
    },
    dropClient() {
      this.isClient = this.isClient !== true;
    },
    pickClient(c, i) {
      if (this.form.selectedClient.length) {
        let same = this.form.selectedClient.find((item) => item === c);
        if (same) {
          let index = this.form.selectedClient.indexOf(same);
          this.form.selectedClient.splice(index, 1);
          this.$refs.isChecked[i].classList.value = "";
        } else {
          this.form.selectedClient.push(c);
          this.$refs.isChecked[i].classList.value = "checked";
        }
      } else {
        this.form.selectedClient.push(c);
        this.$refs.isChecked[i].classList.value = "checked";
      }
    },
    pickDoctor(d) {
      this.form.selectedDoctor = d;
    },
    genderOne(one) {
      this.form.selectedGender = one;
    },
    next() {
      if (this.$v.$invalid) {
        this.$v.$touch();
      } else {
        const client = {
          name: this.form.name,
          lastName: this.form.lastName,
          middleName: this.form.middleName,
          phoneNumber: this.form.phoneNum,
          gender: this.form.selectedGender,
          selectedClient: this.form.selectedClient,
          selectedDoctor: this.form.selectedDoctor,
          smsAgree: this.form.isSms,
        };
        this.$emit("next");
        this.SET_CLIENT(client);
      }
    },
  },
};
</script>

<style lang="scss">
$ruler: 1rem;
$color-red: #ae1100;
$color-bg: #ebecf0;
$color-shadow: #babecc;
$color-white: #fff;
$p-color: #61677c;
.common {
  display: flex;
  justify-content: center;
  .form {
    width: 50vh;
    height: max-content;
    background: $color-bg;
    padding: 3rem;
    display: flex;
    flex-direction: column;
    border-radius: 30px;
    box-shadow: -5px -5px 20px $color-white, 5px 5px 20px $color-shadow;
    &-underSpace {
      height: 2.1rem;
      width: 100%;
    }
    .errorInput {
      box-shadow: inset 1px 1px 3px #bc1818, inset -3px -3px 5px #ff7e7e;
    }
    .errorHelper {
      color: red;
      margin: 5px 5px;
    }
    input {
      border: 0;
      outline: 0;
      font-size: $ruler;
      border-radius: $ruler * 20;
      padding: $ruler / 2;
      background-color: $color-bg;
      text-shadow: 1px 1px 0 $color-white;
      box-shadow: inset 2px 2px 5px $color-shadow,
        inset -5px -5px 10px $color-white;
      width: 100%;
      transition: all 0.2s ease-in-out;
      &:focus {
        box-shadow: inset 1px 1px 2px $color-shadow,
          inset -1px -1px 2px $color-white;
      }
    }

    &-date {
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      input {
        width: 20%;
      }
    }
    &-gender {
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      div {
        display: flex;
        align-items: center;
        width: 40%;
        justify-content: space-around;
        div {
          width: 25px;
          height: 25px;
          background-color: $color-bg;
          box-shadow: inset 2px 2px 5px $color-shadow,
            inset -5px -5px 10px $color-white;
          border-radius: 50%;
        }
      }
    }
    &-button {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      margin-top: 3%;
      button {
        width: 25%;
        border: 0;
        outline: 0;
        font-size: $ruler;
        border-radius: $ruler * 20;
        padding: $ruler / 1.8;
        background-color: $color-bg;
        text-shadow: 1px 1px 0 $color-white;
        color: #61677c;
        font-weight: bold;
        box-shadow: -5px -5px 20px $color-white, 5px 5px 20px $color-shadow;
        transition: all 0.2s ease-in-out;
        cursor: pointer;
        margin-right: 4%;

        &:hover {
          box-shadow: -2px -2px 5px $color-white, 2px 2px 5px $color-shadow;
        }

        &:active {
          box-shadow: inset 1px 1px 2px $color-shadow,
            inset -1px -1px 2px $color-white;
        }
      }
    }
    &-select {
      position: relative;
      &_icon {
        position: absolute;
        top: 5%;
        right: 2%;
        width: 25px;
        height: 25px;
        cursor: pointer;
        transition: 0.5s ease;
        img {
          width: 100%;
          height: 100%;
        }
      }
      &_btn {
        font-size: $ruler;
        color: #61677c;
        border-radius: $ruler * 20;
        padding: $ruler / 1.8;
        background-color: $color-bg;
        text-shadow: 1px 1px 0 $color-white;
        box-shadow: inset 2px 2px 5px $color-shadow,
          inset -5px -5px 10px $color-white;
        width: 100%;
        cursor: pointer;
      }
      &_drop {
        display: flex;
        flex-wrap: wrap;
        color: #61677c;
        justify-content: space-around;
        align-items: center;
        font-size: $ruler;
        border-radius: $ruler * 20;
        padding: $ruler / 1.8;
        background-color: $color-bg;
        text-shadow: 1px 1px 0 $color-white;
        box-shadow: inset 2px 2px 5px $color-shadow,
          inset -5px -5px 10px $color-white;
        width: 100%;
        transition: all 0.2s ease-in-out;
        cursor: pointer;
      }
    }
    .clientTransition-enter-active,
    .clientTransition-leave-active {
      transition: all 0.4s ease-in;
    }
    .clientTransition-enter,
    .clientTransition-leave-to {
      transform: translateY(-8vh);
    }
    .checked {
      box-shadow: inset 2px 2px 5px $color-shadow,
        inset -5px -5px 10px $color-white;
      border-radius: $ruler;
      font-weight: bold;
      padding: 2%;
    }
    &-sms {
      display: flex;
      align-items: center;
      width: 50%;
      justify-content: space-evenly;
      div {
        width: 25px;
        height: 25px;
        background-color: $color-bg;
        box-shadow: inset 2px 2px 5px $color-shadow,
          inset -5px -5px 10px $color-white;
        border-radius: 50%;
      }
    }
  }
}
@media (max-width: 700px) {
  .common {
    .form {
      padding: 2rem;
    }
  }
}
@media (max-height: 500px) {
  .common {
    .form {
      .errorHelper {
        font-size: 11px;
        margin: 0;
      }
    }
  }
}
@media (max-width: 450px) {
  .common {
    .form {
      width: 48vh;
      input {
        font-size: 14px;
      }
      p {
        font-size: 14px;
      }
      .errorHelper {
        font-size: 11px;
        margin: 0 3px;
      }
      &-gender {
        div {
          width: 100%;
        }
      }
      &-sms {
        width: 100%;
      }
      &-button {
        justify-content: space-between;
        button {
          width: 100%;
        }
      }
    }
  }
}
</style>
