<template>
  <b-form-group
    :label="labelName"
    label-for="teamUsersAutoSuggest"
  >
    <vue-autosuggest
      ref="autocomplete"
      v-model="chooseTeamUser"
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
import { getTeamUsers } from '@/views/pages/team-users/api'

export default {
  components: {
    VueAutosuggest,
    BFormGroup,
  },

  data() {
    return {
      labelName: 'Nome ou E-mail',

      chooseTeamUser: null,
      results: [],
      timeout: null,
      selected: null,
      debounceMilliseconds: 300,
      inputProps: {
        id: 'autosuggest__input',
        onInputChange: this.fetchResults,
        placeholder: 'Digite nome ou e-mail',
        class: 'form-control',
        name: 'nome',
      },
      suggestions: [],
      result: [],
    }
  },

  methods: {
    checkChange() {
      this.chooseTeamUser = null
    },

    handleSelect({ item }) {
      this.$emit('setTeamUser', item)
    },

    fetchResults(val) {
      if (val.length >= 3) {
        clearTimeout(this.timeout)

        this.timeout = setTimeout(() => {
          const params = {
            page: 1,
            perPage: 1000,
            nameOrEmail: val,
          }

          getTeamUsers(params)
            .then(response => {
              const { data } = response.data

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
      return suggestion.item.name ? suggestion.item.name : suggestion.item.email
    },

    getSuggestionValue(suggestion) {
      return suggestion.item.name ? suggestion.item.name : suggestion.item.email
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
