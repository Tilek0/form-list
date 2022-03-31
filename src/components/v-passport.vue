<template>
  <div class="common">
    <form class="form">
      <h2>Паспорт</h2>
      <p>Тип документа</p>
      <div class="form-select">
        <div
          class="form-select_icon"
          @click="dropPassport"
          :style="{ transform: isPassport ? 'rotate(180deg)' : '' }"
        >
          <img src="../assets/arrow.png" alt="#" />
        </div>
        <input
          placeholder="Выберите тип документа"
          class="form-select_btn"
          @focus="isPassport = true"
          v-model="passport.selectedPassport"
          :class="{
            errorInput:
              $v.passport.selectedPassport.$dirty &&
              !$v.passport.selectedPassport.required,
          }"
          readonly
        />
        <transition name="clientTransition">
          <div class="form-select_drop" v-show="isPassport">
            <div
              v-for="passp in typeOfPassport"
              :key="passp"
              :class="{ checked: passp === passport.selectedPassport }"
              @click="pickPassport(passp)"
            >
              {{ passp }}
            </div>
          </div>
        </transition>
      </div>
      <div class="form-underSpace">
        <small
          class="errorHelper"
          v-if="
            $v.passport.selectedPassport.$dirty &&
            !$v.passport.selectedPassport.required
          "
          >Добавьте тип документа</small
        >
      </div>
      <input
        v-model="passport.series"
        placeholder="Серия"
        :class="{
          errorInput: $v.passport.series.$dirty && !$v.passport.series.required,
        }"
      />
      <div class="form-underSpace">
        <small
          class="errorHelper"
          v-if="$v.passport.series.$dirty && !$v.passport.series.required"
          >Введите серию</small
        >
      </div>
      <input
        v-model="passport.numOfPassport"
        placeholder="Номер"
        :class="{
          errorInput:
            $v.passport.numOfPassport.$dirty &&
            !$v.passport.numOfPassport.required,
        }"
      />
      <div class="form-underSpace">
        <small
          class="errorHelper"
          v-if="
            $v.passport.numOfPassport.$dirty &&
            !$v.passport.numOfPassport.required
          "
          >Введите номер</small
        >
      </div>
      <input
        v-model="passport['issued-by']"
        placeholder="Кем выдан"
        :class="{
          errorInput:
            $v.passport['issued-by'].$dirty &&
            !$v.passport['issued-by'].required,
        }"
      />
      <div class="form-underSpace">
        <small
          class="errorHelper"
          v-if="
            $v.passport['issued-by'].$dirty &&
            !$v.passport['issued-by'].required
          "
          >Заполните обязательное поле</small
        >
      </div>
      <p>Дата выдачи</p>
      <div class="form-date">
        <input
          placeholder="День"
          @keydown="keyDay"
          v-model="date.day"
          :class="{
            errorInput: $v.date.day.$dirty && !$v.date.day.required,
          }"
          ref="day"
        />
        <input
          placeholder="Месяц"
          @keydown="keyMonth"
          v-model="date.month"
          :class="{
            errorInput: $v.date.month.$dirty && !$v.date.month.required,
          }"
          ref="month"
        />
        <input
          placeholder="Год"
          @keydown="keyYear"
          v-model="date.year"
          :class="{
            errorInput: $v.date.year.$dirty && !$v.date.year.required,
          }"
          ref="year"
        />
      </div>
      <div class="form-underSpace">
        <small
          class="errorHelper"
          v-if="
            ($v.date.day.$dirty && !$v.date.day.required) ||
            ($v.date.month.$dirty && !$v.date.month.required) ||
            ($v.date.year.$dirty && !$v.date.year.required)
          "
          >Введите дату выдачи</small
        >
        <small
          class="errorHelper"
          v-if="
            ($v.date.day.$dirty && !$v.date.day.between) ||
            ($v.date.month.$dirty && !$v.date.month.between) ||
            ($v.date.year.$dirty && !$v.date.year.between)
          "
          >Введите корректную дату выдачи</small
        >
      </div>
      <div class="form-button">
        <button @click.prevent="save">Создать</button>
        <button @click.prevent="prevPass">Назад</button>
      </div>
    </form>
  </div>
</template>

<script>
import DateMixin from "@/mixins/DateMixin";
import { validationMixin } from "vuelidate";
import { required, between } from "vuelidate/lib/validators";
import { mapActions } from "vuex/dist/vuex.mjs";
export default {
  name: "v-passport",
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
    typeOfPassport: [
      "Паспорт",
      "Свидетельство о рождении",
      "Вод. удостоверение",
    ],
    isPassport: false,
    passport: {
      selectedPassport: "",
      series: "",
      numOfPassport: "",
      "issued-by": "",
    },
  }),
  validations: {
    passport: {
      selectedPassport: { required },
      series: { required },
      numOfPassport: { required },
      "issued-by": { required },
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
      this.passport.selectedPassport = "";
      this.passport.series = "";
      this.passport.numOfPassport = "";
      this.passport["issued-by"] = "";
      this.date.day = "";
      this.date.month = "";
      this.date.year = "";
      this.$v.$reset();
    },
  },
  methods: {
    ...mapActions(["SET_PASSPORT"]),
    dropPassport() {
      this.isPassport = this.isPassport !== true;
    },
    pickPassport(p) {
      this.passport.selectedPassport = p;
    },
    prevPass() {
      this.$emit("prevPass");
    },
    save() {
      if (this.$v.$invalid) {
        this.$v.$touch();
      } else {
        const passport = {
          selectedPassport: this.passport.selectedPassport,
          series: this.passport.series,
          numOfPassport: this.passport.numOfPassport,
          "issued-by": this.passport["issued-by"],
        };
        this.SET_PASSPORT(passport);
        this.$emit("save");
      }
    },
  },
};
</script>

<style></style>
