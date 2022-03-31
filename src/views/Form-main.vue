<template>
  <div class="main">
    <div
      :style="{ opacity: modal ? '0.5' : '' }"
      v-if="modal"
      class="main-shadow"
    />
    <transition name="fadeModal">
      <div class="main-modalBox" v-if="modal">
        <div v-if="modal" class="main-modalBox-modal">
          <h2>Новый клиент успешно создан.</h2>
          <button @click="clear">Ok</button>
        </div>
      </div>
    </transition>
    <v-form
      @next="next"
      class="main-formPos"
      :class="{ transformCard: isForm }"
      :isClear="isClear"
    />
    <v-address
      @nextAdd="nextAdd"
      @prevAdd="prevAdd"
      class="main-addPos"
      :isClear="isClear"
      :class="{ transformCard: isAddress }"
    />
    <v-passport
      @save="modal = !modal"
      @prevPass="prevPass"
      class="main-passpPos"
      :isClear="isClear"
    />
  </div>
</template>

<script>
import vForm from "@/components/v-form";
import vAddress from "@/components/v-address";
import vPassport from "@/components/v-passport";
export default {
  name: "Form-main",
  components: {
    vForm,
    vAddress,
    vPassport,
  },
  data: () => ({
    isForm: false,
    isAddress: false,
    modal: false,
    isClear: false,
  }),
  methods: {
    next() {
      this.isForm = true;
    },
    nextAdd() {
      this.isAddress = true;
    },
    prevAdd() {
      this.isForm = false;
    },
    prevPass() {
      this.isAddress = false;
    },
    clear() {
      this.modal = false;
      this.isClear = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  min-height: 120vh;
  position: relative;
  z-index: 1;
  padding: 0;
  overflow: hidden;
  margin: 0;
  &-shadow {
    width: 100%;
    height: 100%;
    background: black;
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    transition: 0.3s ease;
  }
  .fadeModal-enter-active,
  .fadeModal-leave-active {
    transition: all 0.6s ease-in;
  }
  .fadeModal-enter,
  .fadeModal-leave-to {
    transform: translateY(-30vh);
  }
  &-modalBox {
    position: absolute;
    z-index: 20;
    width: 100%;
    height: 100%;
    display: block;
    padding: 10% 0;
    &-modal {
      width: 25rem;
      height: 10rem;
      margin: 0 auto;
      background: #ebecf0;
      border-radius: 30px;
      text-shadow: 1px 1px 0 #fff;
      box-shadow: inset 5px 5px 20px #babecc, inset -5px -5px 20px #fff;
      display: flex;
      justify-content: space-evenly;
      flex-direction: column;
      align-items: center;
      button {
        width: 30%;
        padding: 0.1rem;
        line-height: 2rem;
        border-radius: 2rem;
        border: 0;
        outline: 0;
        background-color: #ebecf0;
        text-shadow: 1px 1px 0 #fff;
        color: #61677c;
        font-weight: bold;
        box-shadow: -5px -5px 20px #fff, 5px 5px 20px #babecc;
        transition: all 0.2s ease-in-out;
        cursor: pointer;
        &:hover {
          box-shadow: -2px -2px 5px #fff, 2px 2px 5px #babecc;
        }

        &:active {
          box-shadow: inset 1px 1px 2px #babecc, inset -1px -1px 2px #fff;
        }
      }
    }
  }
  &-formPos {
    position: absolute;
    top: 5rem;
    width: 100%;
    left: 2%;
    z-index: 4;
    transition: all 1s ease;
  }
  &-addPos {
    position: absolute;
    width: 100%;
    top: 4.3rem;
    left: 1%;
    z-index: 3;
    transition: all 1s ease;
  }
  &-passpPos {
    position: absolute;
    top: 3.5rem;
    width: 100%;
    left: 0;
    z-index: 2;
    transition: all 1s ease;
  }
  .transformCard {
    left: 100%;
  }
}
@media (max-height: 750px) {
  .main {
    min-height: 180vh;
  }
}
@media (max-width: 450px) {
  .main {
    &-modalBox {
      &-modal {
        width: 18rem;
        height: 7rem;
        h2 {
          font-size: 18px;
        }
      }
    }
  }
}
</style>
