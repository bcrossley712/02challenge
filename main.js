let clickUpgrades = {
  pickaxes: {
    price: 100,
    quantity: 0,
    multiplier: 1
  },

  dynamite: {
    price: 250,
    quantity: 0,
    multiplier: 15
  }
};

let automaticUpgrades = {
  rovers: {
    price: 600,
    quantity: 0,
    multiplier: 20
  },

  harvesters: {
    price: 10000,
    quantity: 0,
    multiplier: 200
  }
};

let cheese = 0

function mine() {
  cheese++
  increaseMine()
  document.getElementById('cheese-count').innerText = cheese
}

function buyClickUpgrade(upgradeName) {
  let upgrade = clickUpgrades[upgradeName]
  if (upgrade.price <= cheese) {
    cheese -= upgrade.price
    upgrade.quantity++
    upgrade.price += (Math.floor(upgrade.price - upgrade.price * .7))
    purchasedAlert()
  } else {
    declinedPurchaseAlert()
  }
  drawStats()
}

function buyAutoUpgrade(upgradeName) {
  let upgrade = automaticUpgrades[upgradeName]
  if (upgrade.price <= cheese) {
    cheese -= upgrade.price
    upgrade.quantity++
    upgrade.price += (Math.floor(upgrade.price - upgrade.price * .4))
    // console.log(upgrade);
    purchasedAlert()
  } else {
    declinedPurchaseAlert()
  }
  drawStats()
}

function increaseMine() {
  for (let key in clickUpgrades) {
    let upgrade = clickUpgrades[key]
    cheese += (upgrade.quantity * upgrade.multiplier)
  }
}

function runAutoUpgrades() {
  for (let key in automaticUpgrades) {
    let upgrade = automaticUpgrades[key]
    cheese += (upgrade.quantity * upgrade.multiplier)
  }
  drawStats()
}

function drawStats() {
  //NOTE Inventory tracker update
  document.getElementById('cheese-count').innerText = cheese
  document.getElementById('axe-count').innerText = clickUpgrades.pickaxes.quantity
  document.getElementById('tnt-count').innerText = clickUpgrades.dynamite.quantity
  document.getElementById('rover-count').innerText = automaticUpgrades.rovers.quantity
  document.getElementById('harvest-count').innerText = automaticUpgrades.harvesters.quantity
  //NOTE Stat tracker update
  let upgradedDynamite = (clickUpgrades.dynamite.multiplier * clickUpgrades.dynamite.quantity)
  let upgradedPickaxe = (clickUpgrades.pickaxes.multiplier * clickUpgrades.pickaxes.quantity)
  let upgradedRover = (automaticUpgrades.rovers.multiplier * automaticUpgrades.rovers.quantity)
  let upgradedHarvester = (automaticUpgrades.harvesters.multiplier * automaticUpgrades.harvesters.quantity)
  document.getElementById('click-collect').innerText = (upgradedDynamite + upgradedPickaxe + 1)
  document.getElementById('auto-collect').innerText = (upgradedRover + upgradedHarvester)
  //NOTE Price of upgrade update
  document.getElementById('pickaxes').innerText = (clickUpgrades.pickaxes.price)
  document.getElementById('dynamite').innerText = (clickUpgrades.dynamite.price)
  document.getElementById('rovers').innerText = (automaticUpgrades.rovers.price)
  document.getElementById('harvesters').innerText = (automaticUpgrades.harvesters.price)
}

function purchasedAlert() {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  Toast.fire({
    icon: 'success',
    title: 'Purchased Upgrade'
  })
}

function declinedPurchaseAlert() {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  Toast.fire({
    icon: 'error',
    title: 'Not enough cheddar!'
  })
}

drawStats()
let autoInterval = setInterval(runAutoUpgrades, 2000)