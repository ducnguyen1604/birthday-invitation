const KEY = "birthday-plan";

let state = JSON.parse(localStorage.getItem(KEY)) || {
  day3: {},
  day4: {},
};

export function setChoice(day, key, value) {
  if (!state[day]) state[day] = {};
  state[day][key] = value;
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function getState() {
  return state;
}