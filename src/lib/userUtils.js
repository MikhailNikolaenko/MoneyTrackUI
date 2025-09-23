import { userData } from '../stores/user.js'

export function markActive() {
  userData.update(u => {
    const today = new Date().toISOString().slice(0, 10)
    if (!u.activeDays.includes(today)) {
      u.activeDays.push(today)
    }
    return u
  })
}

export function addInput(content) {
  userData.update(u => {
    u.inputs.push({
      content,
      timestamp: new Date().toISOString()
    })
    return u
  })
}

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export function addPurchase(name, date, price, category) {
  userData.update(u => {
    if (!u.purchases) u.purchases = []
    u.purchases.push({
      id: makeId(),
      purchaseName: name,
      price,
      category,
      type: "one-time",
      date: new Date().toISOString()
    })
    return u
  })
}

export function addRecurring(name, price, category, date) {
  userData.update(u => {
    if (!u.recurring) u.recurring = []
    u.recurring.push({
      id: makeId(),
      purchaseName: name,
      price,
      category,
      type: "recurring",
      date,
      createdAt: new Date().toISOString()
    })
    return u
  })
}

export function addPaycheck(name, amount, paycheckDay) {
  userData.update(u => {
    if (!u.paychecks) u.paychecks = []
    u.paychecks.push({
      id: makeId(),
      purchaseName: name,
      price: amount,
      category: "income",
      type: "paycheck",
      date: paycheckDay,
      createdAt: new Date().toISOString()
    })
    return u
  })
}

export function simulateUserData() {
  const startDate = new Date("2025-02-01")
  const endDate = new Date("2025-09-22")
  const categories = ["food","clothing","transportation","entertainment","utilities","healthcare"]

  const purchases = []
  const recurring = []

  let current = new Date(startDate)

  while (current <= endDate) {
    const numPurchases = Math.floor(Math.random() * 4)
    for (let i = 0; i < numPurchases; i++) {
      purchases.push({
        id: makeId(),
        purchaseName: `Item ${Math.floor(Math.random() * 100)}`,
        price: (Math.random() * 50 + 5).toFixed(2),
        category: categories[Math.floor(Math.random() * categories.length)],
        type: "one-time",
        date: new Date(current).toISOString()
      })
    }
    current.setDate(current.getDate() + 1)
  }

  const paychecks = [{
    id: makeId(),
    purchaseName: "Monthly Salary",
    price: 3000,
    category: "income",
    type: "paycheck",
    date: "2025-02-15",
    createdAt: new Date().toISOString()
  }]

  recurring.push({
    id: makeId(),
    purchaseName: "Netflix",
    price: 15.99,
    category: "subscription",
    type: "recurring",
    date: "2025-02-05",
    createdAt: new Date().toISOString()
  })
  recurring.push({
    id: makeId(),
    purchaseName: "Car Loan",
    price: 350,
    category: "car-loan",
    type: "recurring",
    date: "2025-02-10",
    createdAt: new Date().toISOString()
  })

  userData.set({
    name: "Simulated User",
    startDate: startDate.toISOString(),
    activeDays: [],
    purchases,
    recurring,
    paychecks
  })
}

export function deletePurchase(id) {
  userData.update(u => {
    u.purchases = (u.purchases || []).filter(p => p.id !== id)
    return u
  })
}

export function deleteRecurring(id) {
  userData.update(u => {
    u.recurring = (u.recurring || []).filter(r => r.id !== id)
    return u
  })
}

export function deletePaycheck(id) {
  userData.update(u => {
    u.paychecks = (u.paychecks || []).filter(p => p.id !== id)
    return u
  })
}

userData.update(u => {
  if (u.balance === undefined) u.balance = 0
  return u
})

export function addGoal(goalType, amount, timeframe, category = "all") {
  userData.update(u => {
    if (!u.goals) u.goals = []
    u.goals.push({
      id: makeId(),
      type: goalType,
      amount,
      timeframe,
      category,
      createdAt: new Date().toISOString()
    })
    return u
  })
}

export function deleteGoal(id) {
  userData.update(u => {
    u.goals = (u.goals || []).filter(g => g.id !== id)
    return u
  })
}

export function succeedGoal(id) {
  userData.update(u => {
    if (!u.succeededGoals) u.succeededGoals = []
    if (!u.goals) u.goals = []
    const goal = u.goals.find(g => g.id === id)
    if (goal) {
      u.succeededGoals.push({
        ...goal,
        succeededAt: new Date().toISOString()
      })
      u.goals = u.goals.filter(g => g.id !== id)
    }
    return u
  })
}

export function updatePurchase(updated) {
  userData.update(u => {
    u.purchases = u.purchases.map(p => p.id === updated.id ? { ...p, ...updated } : p)
    return u
  })
}

export function updateRecurring(updated) {
  userData.update(u => {
    u.recurring = u.recurring.map(r => r.id === updated.id ? { ...r, ...updated } : r)
    return u
  })
}

export function updatePaycheck(updated) {
  userData.update(u => {
    u.paychecks = u.paychecks.map(p => p.id === updated.id ? { ...p, ...updated } : p)
    return u
  })
}
