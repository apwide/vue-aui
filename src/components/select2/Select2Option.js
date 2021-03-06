export default {
  name: 'va-select2-option',
  props: {
    text: String,
    value: [String, Number],
    data: Object
  },

  watch: {
    text() {
      this.optionsChanged();
    },
    value() {
      this.optionsChanged();
    },
    data() {
      this.optionsChanged();
    }
  },

  render() {
  },

  mounted() {
    this.optionsChanged();
  },

  destroyed() {
    this.optionsChanged();
  },

  methods: {
    optionsChanged() {
      this.$parent.$emit('optionsChanged')
    }
  }
}
