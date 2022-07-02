function setStyle(a, b) {
  document.documentElement.style.setProperty(a, b);
}
let battery_charging_time = navigator.getBattery().then((bat) => {
  return bat.chargingTime;
});
let battery_level = navigator.getBattery().then((bat) => {
  return Math.round(bat.level * 100 - 1);
});
let battery_charging = navigator.getBattery().then((bat) => {
  return bat.charging;
});
let battery_discharging_time = navigator.getBattery().then((bat) => {
  return Math.round(bat.dischargingTime / 60 - 1);
});
var userBattery = {
  level: battery_level,
  chargingTime: battery_charging_time,
  charging: battery_charging,
  dischargingTime: battery_discharging_time,
};
  
let lev = userBattery.level.then((e) =>
  setStyle("--width", (75 * e) / 100 + "px")
);

const bat = document.getElementById("battery");
let charging = userBattery.charging.then((e) =>
  setStyle("--state", e === false ? "charging" : "")
);
let clr = userBattery.level
  .then((e) =>
    setStyle("--bg", e < 20 ? "#fa022c" : e < 50 ? "yellow" : "#30ff5d")
  )
  .then((e) => {
    e < 20 ? bat.classList.add("warning") : bat.classList.remove("warning");
  });

navigator.getBattery().then((b) => {
  b.onchargingchange = () => {
    b.charging === true
      ? bat.classList.add("charging")
      : bat.classList.remove("charging");
  };
});
