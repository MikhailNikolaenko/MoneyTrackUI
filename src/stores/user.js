import { writable } from 'svelte/store'

const stored = JSON.parse(localStorage.getItem('userData')) || {
  name: "Guest",
  startDate: new Date().toISOString(),
  activeDays: [],
  balance: 0,
  inputs: [],
  purchases: [],
  recurring: [],
  paychecks: [],
  goals: [],
  succeededGoals: []
}

export const userData = writable(stored)

userData.subscribe(val => {
  localStorage.setItem('userData', JSON.stringify(val))
})
