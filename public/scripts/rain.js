const canvas = document.querySelector("#raining-canvas");

const bg = {
  // https://unsplash.com/photos/DpI-_wydgJM
  dawn: "01.jpg",
  // https://unsplash.com/photos/QmODrrfVxck
  early_morning: "02.jpg",
  // https://unsplash.com/photos/nuhDM28wCZk
  late_morning: "03.jpg",
  // https://unsplash.com/photos/Oyuhv8rZa3U
  noon: "04.jpg",
  // https://unsplash.com/photos/g8Sq1d9Lm98
  early_afternoon: "05.jpg",
  // https://unsplash.com/photos/Pa3ntxg4Svw
  late_afternoon: "06.jpg",
  // https://unsplash.com/photos/WsxKHqrdibY
  early_evening: "07.jpg",
  // https://unsplash.com/photos/JBkwaYMuhdc
  mid_evening: "08.jpg",
  // https://unsplash.com/photos/Of2rc0KOfVU
  late_enening: "09.jpg",
  // https://unsplash.com/photos/oBUUbfmHKwM
  night: "10.jpg",
  // https://unsplash.com/photos/cXU6tNxhub0
  mid_night: "11.jpg",
  // https://unsplash.com/photos/4u2U8EO9OzY
  after_mid_night: "12.jpg",
};

const background = () => {
  const hour = new Date().getHours();
  if (hour === 5 || hour === 6) return bg.dawn;
  else if (hour === 7 || hour === 8) return bg.early_morning;
  else if (hour > 8 && hour < 12) return bg.late_morning;
  else if (hour === 12) return bg.noon;
  else if (hour > 12 && hour < 16) return bg.early_afternoon;
  else if (hour === 16 || hour === 17) return bg.late_afternoon;
  else if (hour === 18) return bg.early_evening;
  else if (hour === 19) return bg.mid_evening;
  else if (hour === 20) return bg.late_enening;
  else if (hour > 20 && hour < 24) return bg.night;
  else if (hour === 0) return bg.mid_night;
  else return bg.after_mid_night;
};

if (canvas) {
  // Set canvas size to fit the real size
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;

  const raindropFx = new RaindropFX({
    canvas: canvas,
    background: "/img/bg/12.jpg" // + background(),
  });
  raindropFx.start();

  // Resize the effect renderer
  window.onresize = () => {
    const rect = canvas.getBoundingClientRect();
    raindropFx.resize(rect.width, rect.height);
  };
}
