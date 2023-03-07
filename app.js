const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

const giveaway = document.querySelector(".giveaway");
const deadline = document.querySelector(".deadline");
const items = document.querySelectorAll(".deadline-format h4");

let futureDate = new Date(2023, 2, 8, 5, 5, 0);
const futureTime = futureDate.getTime();

const year = futureDate.getFullYear();
const date = futureDate.getDate();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();
const month = months[futureDate.getMonth()];
const weekday = weekdays[futureDate.getDay()];

if (hours < 10) {
  giveaway.textContent = `giveaway ends on ${weekday}, ${month} ${year} 0${hours}:${minutes}`;
}
if (minutes < 10) {
  giveaway.textContent = `giveaway ends on ${weekday}, ${month} ${year} ${hours}:0${minutes}`;
}
if (hours < 10 && minutes < 10) {
  giveaway.textContent = `giveaway ends on ${weekday}, ${month} ${year} 0${hours}:0${minutes}`;
}
if (hours > 9 && minutes > 9) {
  giveaway.textContent = `giveaway ends on ${weekday}, ${month} ${year} ${hours}:${minutes}`;
}


function getRemainingTime() {
  const today = new Date().getTime();
  const t = futureTime - today;

  // 1s = 1000ms
  // 1m = 60s
  // 1h = 60min
  // 1d = 24hr
  
  // values in ms
  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;

  // calculate all values
  let days = Math.floor(t / oneDay);
  let hours = Math.floor((t % oneDay) / oneHour);
  let minutes = Math.floor((t % oneHour) / oneMinute);
  let seconds = Math.floor((t % oneMinute) / 1000);

  // set values array
  const values = [days, hours, minutes, seconds];

  function format(item) {
    if (item < 10) {
      return (item = `0${item}`);
    } else {
      return item;
    }
  }
  
  items.forEach(function (item, index) {
    item.innerHTML = format(values[index]);
  });

  if (t < 0) {
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class="expired">sorry, this giveaway has expired</h4>`;
  }
}

let countdown = setInterval(getRemainingTime, 1000);
getRemainingTime();