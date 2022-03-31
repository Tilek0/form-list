<template>
  <div class="common">
    <form class="form">
      <h2>Адрес</h2>
      <input
        v-model.trim="address.indexNum"
        placeholder="Индекс"
        :class="{
          errorInput:
            $v.address.indexNum.$dirty && !$v.address.indexNum.required,
        }"
      />
      <div class="form-underSpace">
        <small
          class="errorHelper"
          v-if="$v.address.indexNum.$dirty && !$v.address.indexNum.required"
          >Введите индекс</small
        >
      </div>
      <input
        v-model.trim="address.country"
        placeholder="Страна"
        :class="{
          errorInput: $v.address.country.$dirty && !$v.address.country.required,
        }"
      />
      <div class="form-underSpace">
        <small
          v-if="$v.address.country.$dirty && !$v.address.country.required"
          class="errorHelper"
          >Введите страну</small
        >
        <small
          v-if="$v.address.country.$dirty && !$v.address.country.word"
          class="errorHelper"
          >Ввод должен состоять только из букв</small
        >
      </div>
      <input
        v-model.trim="address.region"
        placeholder="Область"
        :class="{
          errorInput: $v.address.region.$dirty && !$v.address.region.required,
        }"
      />
      <div class="form-underSpace">
        <small
          class="errorHelper"
          v-if="$v.address.region.$dirty && !$v.address.region.required"
          >Введите область</small
        >
        <small
          v-if="$v.address.country.$dirty && !$v.address.region.word"
          class="errorHelper"
          >Ввод должен состоять только из букв</small
        >
      </div>
      <input
        v-model.trim="address.city"
        placeholder="Город"
        :class="{
          errorInput: $v.address.city.$dirty && !$v.address.city.required,
        }"
      />
      <div class="form-underSpace">
        <small
          class="errorHelper"
          v-if="$v.address.city.$dirty && !$v.address.city.required"
          >Введите город</small
        >
        <small
          v-if="$v.address.country.$dirty && !$v.address.city.word"
          class="errorHelper"
          >Ввод должен состоять только из букв</small
        >
      </div>
      <input
        v-model.trim="address.street"
        placeholder="Улица"
        :class="{
          errorInput: $v.address.street.$dirty && !$v.address.street.required,
        }"
      />
      <div class="form-underSpace">
        <small
          class="errorHelper"
          v-if="$v.address.street.$dirty && !$v.address.street.required"
          >Введите улицу</small
        >
      </div>
      <input
        v-model="address.house"
        placeholder="Дом"
        :class="{
          errorInput: $v.address.house.$dirty && !$v.address.house.required,
        }"
      />
      <div class="form-underSpace">
        <small
          class="errorHelper"
          v-if="$v.address.house.$dirty && !$v.address.house.required"
          >Введите дом</small
        >
      </div>
      <div class="form-button">
        <button @click.prevent="prevAdd">Назад</button>
        <button @click.prevent="nextAdd">Далее</button>
      </div>
    </form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { mapActions } from "vuex/dist/vuex.mjs";
import { word } from "@/functions/wordValidator";
export default {
  name: "v-address",
  mixins: [validationMixin],
  props: {
    isClear: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  data: () => ({
    address: {
      indexNum: "",
      country: "",
      region: "",
      city: "",
      street: "",
      house: "",
    },
  }),
  validations: {
    address: {
      indexNum: { required },
      country: {
        required,
        word,
      },
      region: {
        required,
        word,
      },
      city: {
        required,
        word,
      },
      street: { required },
      house: { required },
    },
  },
  watch: {
    isClear() {
      this.address.indexNum = "";
      this.address.country = "";
      this.address.region = "";
      this.address.city = "";
      this.address.street = "";
      this.address.house = "";
      this.$v.$reset();
    },
  },
  methods: {
    ...mapActions(["SET_ADDRESS"]),
    nextAdd() {
      if (this.$v.$invalid) {
        this.$v.$touch();
      } else {
        const address = {
          indexNum: this.address.indexNum,
          country: this.address.country,
          region: this.address.region,
          city: this.address.city,
          street: this.address.street,
          house: this.address.house,
        };
        this.$emit("nextAdd");
        this.SET_ADDRESS(address);
      }
    },
    prevAdd() {
      this.$emit("prevAdd");
    },
  },
};
</script>

<style></style>
