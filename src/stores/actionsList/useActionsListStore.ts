import { defineStore } from 'pinia'
import { IAction } from 'src/@types/actions'

export const useActionsListStore = defineStore('actionsList', {
  state: () => {
    return {
      listOfActions: [] as IAction[],
    }
  },

  getters: {
    getActionsList: (state) => state.listOfActions,
  },

  actions: {
    addAction({ id, from, to, listOrder }: IAction) {
      this.listOfActions.push({ id, from, to, listOrder, value: this.listOfActions.length })
    },

    removeOlderActions(value: number) {
      if (value === 0) {
        this.listOfActions.splice(0, this.listOfActions.length)
      }
      const itemIndex = this.listOfActions.findIndex((a) => a.value === value)
      this.listOfActions.splice(0, itemIndex + 1)
    },
  },
})
