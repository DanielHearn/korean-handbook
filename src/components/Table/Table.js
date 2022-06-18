import Search from '../Search/Search.vue'

export default {
  name: 'table',
  components: {
    Search,
  },
  props: {
    columns: {
      type: Array,
      required: true,
      default: () => [],
    },
    rows: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data: function() {
    return {
      search: '',
      filteredWords: this.rows,
    }
  },
  watch: {
    search: function() {
      this.filterWords()
    },
    columns: function() {
      this.search = ''
      this.filterWords()
    },
    rows: function() {
      this.search = ''
      this.filterWords()
    },
  },
  methods: {
    filterWords: function() {
      if (this.rows) {
        if (!this.search.length) {
          this.filteredWords = this.rows
        } else {
          const newWords = []
          const filter = this.search.toLowerCase()

          for (let word of this.rows) {
            let matchesFilter = false
            if (
              word.e.toLowerCase().includes(filter) ||
              word.k.toLowerCase().includes(filter)
            ) {
              matchesFilter = true
            }

            if (matchesFilter) {
              newWords.push(word)
            }
          }
          this.filteredWords = newWords
        }
      }
    },
    searchRows: function(value) {
      this.search = value
    },
  },
}
