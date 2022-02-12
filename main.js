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
  upgrade.quantity++
  // console.log(upgrade);
  document.getElementById('axe-count').innerText = clickUpgrades.pickaxes.quantity
  document.getElementById('tnt-count').innerText = clickUpgrades.dynamite.quantity
  // console.log(upgradedClick);
  drawStats()
}

function buyAutoUpgrade(upgradeName) {
  let upgrade = automaticUpgrades[upgradeName]
  upgrade.quantity++
  // console.log(upgrade);
  document.getElementById('rover-count').innerText = automaticUpgrades.rovers.quantity
  document.getElementById('harvest-count').innerText = automaticUpgrades.harvesters.quantity
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
  document.getElementById('cheese-count').innerText = cheese
}

function drawStats() {
  let upgradedDynamite = (clickUpgrades.dynamite.multiplier * clickUpgrades.dynamite.quantity)
  let upgradedPickaxe = (clickUpgrades.pickaxes.multiplier * clickUpgrades.pickaxes.quantity)
  let upgradedRover = (automaticUpgrades.rovers.multiplier * automaticUpgrades.rovers.quantity)
  let upgradedHarvester = (automaticUpgrades.harvesters.multiplier * automaticUpgrades.harvesters.quantity)
  // console.log(upgradedDynamite + upgradedPickaxe + 1);
  document.getElementById('click-collect').innerText = (upgradedDynamite + upgradedPickaxe + 1)
  document.getElementById('auto-collect').innerText = (upgradedRover + upgradedHarvester)
}


let autoInterval = setInterval(runAutoUpgrades, 3000)