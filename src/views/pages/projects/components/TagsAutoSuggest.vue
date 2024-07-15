<template>
  <b-form-group
    :label="labelName"
    label-for="tagsAutoSuggest"
  >
    <vue-autosuggest
      ref="autocomplete"
      v-model="chooseTag"
      :suggestions="suggestions"
      :input-props="inputProps"
      :render-suggestion="renderSuggestion"
      :get-suggestion-value="getSuggestionValue"
      variant="primary"
      @selected="handleSelect"
      @input="fetchResults"
      @change="checkChange"
    />
  </b-form-group>
</template>

<script>
import { VueAutosuggest } from 'vue-autosuggest'
import { BFormGroup } from 'bootstrap-vue'
import { getAllTags } from '@/views/pages/tags/api'

export default {
  components: {
    VueAutosuggest,
    BFormGroup,
  },

  data() {
    return {
      labelName: 'Nome',

      chooseTag: null,
      results: [],
      timeout: null,
      selected: null,
      debounceMilliseconds: 300,
      inputProps: {
        id: 'autosuggest__input',
        onInputChange: this.fetchResults,
        placeholder: 'Nome',
        class: 'form-control',
        name: 'nome',
      },
      suggestions: [],
      result: [],
    }
  },

  methods: {
    checkChange() {
      this.chooseTag = null
    },

    handleSelect({ item }) {
      this.$emit('setTagName', item)
    },

    fetchResults(val) {
      if (val.length >= 3) {
        clearTimeout(this.timeout)

        this.timeout = setTimeout(() => {
          const params = {
            name: val,
          }

          getAllTags(params)
            .then(response => {
              const { data } = response

              this.suggestions = []
              this.selected = null
              this.result = data

              if (data.length > 0) {
                this.suggestions.push({ data })
              }
            })
        }, this.debounceMilliseconds)
      }
    },

    renderSuggestion(suggestion) {
      return suggestion.item.name
    },

    getSuggestionValue(suggestion) {
      return suggestion.item.name
    },
  },
}
</script>

<style lang="scss">
#autosuggest__input {
  outline: none;
  position: relative;
  display: block;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
}

.autosuggest__results-container {
  position: relative;
  width: 100%;
}

.autosuggest__results {
  position: absolute;
  z-index: 100;
  width: 100%;
  margin-top: 5px;
  border-radius: 0.358rem;
  max-height: 200px;
  overflow-y: scroll;
  background: #161d31;
  scrollbar-width: none;
}

.autosuggest__results::-webkit-scrollbar {
  display: none;
}

.autosuggest__results ul {
  list-style: none;
  padding-left: 0;
  margin: 0;
}
.autosuggest__results li {
  padding-bottom: 7px;
  padding-top: 7px;
  padding-left: 15px;
}

.autosuggest__results {
  cursor: pointer;
}
.autosuggest__results-item:hover {
  background-color: rgba(39,114,192,0.2);;
  color: #2772C0;
}
</style>
