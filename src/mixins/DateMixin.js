export default {
  data: () => ({
    date: {
      day: "",
      month: "",
      year: "",
    },
  }),
  methods: {
    keyDay() {
      if (this.date.day.length === 2) {
        let focus = this.$refs.month;
        focus.focus();
      }
    },
    keyMonth() {
      if (this.date.month.length === 2) {
        let focus = this.$refs.year;
        focus.focus();
      }
      if (this.date.month.length <= 0) {
        let focus = this.$refs.day;
        focus.focus();
      }
    },
    keyYear() {
      if (this.date.year.length <= 0) {
        let focus = this.$refs.month;
        focus.focus();
      }
    },
  },
};
