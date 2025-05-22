document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("bgCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width, height;
  let t = 0;
  const spacing = 30;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener("resize", resize);
  resize();

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  function draw() {
    ctx.clearRect(0, 0, width, height);

    for (let x = 0; x < width; x += spacing) {
      for (let y = 0; y < height; y += spacing) {
        const angle = Math.sin(x * 0.005 + t) + Math.cos(y * 0.005 + t);

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);

        ctx.font = "22px 'avenir-next-world', sans-serif";
        ctx.fillStyle = "rgba(227, 255, 0, 0.22)";
        ctx.fillText(":", 0, 0);

        ctx.restore();
      }
    }

    t += 0.01;
    requestAnimationFrame(draw);
  }

  draw();
});

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("footerCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width, height;
  let t = 0;
  const spacing = 30;

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    width = canvas.width = rect.width;
    height = canvas.height = rect.height;
  }

  window.addEventListener("resize", resize);
  resize();

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  function draw() {
    ctx.clearRect(0, 0, width, height);

    for (let x = 0; x < width; x += spacing) {
      for (let y = 0; y < height; y += spacing) {
        const angle = Math.sin(x * 0.005 + t) + Math.cos(y * 0.005 + t);

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);

        ctx.font = "18px 'avenir-next-world', sans-serif";
        ctx.fillStyle = "rgba(227, 255, 0, 0.4)";
        ctx.fillText(":", 0, 0);

        ctx.restore();
      }
    }

    t += 0.01;
    requestAnimationFrame(draw);
  }

  draw();
});

document.fonts.ready.then(() => {
    document.querySelector(".loader-text").style.visibility = "visible";
  });

document.addEventListener("DOMContentLoaded", function () {
  const text = document.querySelector(".playgroundparagraph");

  const fontMap = {
    avenir: "avenir-next-world",
    connect: "Abcconnect Flat",
    galapagos: "ABC Galapagos",
    picnic: "Picnic",
    pilowlava: "Pilowlava Atome",
    readybygone: "Readybygone"
  };

  document.querySelectorAll(".typefacecontainer a").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const fontKey = btn.classList[0];
      const font = fontMap[fontKey];
      if (font) {
        text.style.fontFamily = `"${font}", sans-serif`;
      }
    });
  });

  const sizeSlider = document.querySelector(".sizeslider input[type='range']");
  if (sizeSlider) {
    sizeSlider.addEventListener("input", function () {
      const sizeValue = 10 + (this.value / 100) * 100;
      text.style.fontSize = sizeValue + "px";
    });
  }

  const spacingSlider = document.querySelector(".spacingslider input[type='range']");
  if (spacingSlider) {
    spacingSlider.addEventListener("input", function () {
      const spacingValue = (this.value / 100) * 1.2;
      text.style.letterSpacing = spacingValue + "em";
    });
  }

  document.querySelectorAll(".typecolorcontainer .coloroption").forEach((colorEl) => {
    colorEl.addEventListener("click", () => {
      const color = getComputedStyle(colorEl).backgroundColor;
      text.style.color = color;
    });
  });

  document.querySelectorAll(".bgcolorcontainer .coloroption").forEach((colorEl) => {
    colorEl.addEventListener("click", () => {
      const color = getComputedStyle(colorEl).backgroundColor;
      document.querySelector(".contentpanel").style.backgroundColor = color;
    });
  });

  const originalText = text.textContent;
  text.innerHTML = "";
  const letters = originalText.split("");
  const spanElements = letters.map(letter => {
    const span = document.createElement("span");
    span.textContent = letter;
    span.style.display = "inline-block";
    text.appendChild(span);
    return span;
  });

  const rotationFactors = spanElements.map(() => (Math.random() * 2 - 1)); // -1 to 1

  const rotateSlider = document.querySelector(".rotate-slider");
  if (rotateSlider) {
    rotateSlider.addEventListener("input", function () {
      const rotationStrength = parseFloat(this.value);
      const skewValue = parseFloat(skewSlider?.value || 0);
      spanElements.forEach((span, i) => {
        const rotation = rotationFactors[i] * rotationStrength;
        span.style.transform = `rotate(${rotation}deg) skew(${skewValue}deg)`;
      });
    });
  }

  const skewSlider = document.querySelector(".skew-slider");
  if (skewSlider) {
    skewSlider.addEventListener("input", function () {
      const skewValue = parseFloat(this.value);
      const rotationStrength = parseFloat(rotateSlider?.value || 0);
      spanElements.forEach((span, i) => {
        const rotation = rotationFactors[i] * rotationStrength;
        span.style.transform = `rotate(${rotation}deg) skew(${skewValue}deg)`;
      });
    });
  }

  document.getElementById("resetBtn").addEventListener("click", function (e) {
    e.preventDefault();

    text.style.fontFamily = '"avenir-next-world", sans-serif';
    text.style.fontSize = "3vw";
    text.style.letterSpacing = "0em";
    text.style.color = "#fff";

    spanElements.forEach(span => {
      span.style.transform = "rotate(0deg) skew(0deg)";
    });

    document.querySelector(".contentpanel").style.backgroundColor = "transparent";

    if (sizeSlider) sizeSlider.value = 20;
    if (spacingSlider) spacingSlider.value = 20;
    if (rotateSlider) rotateSlider.value = 0;
    if (skewSlider) skewSlider.value = 0;
  });

  
	document.getElementById("saveBtn").addEventListener("click", function () {
  const contentPanel = document.querySelector(".contentpanel");
  let bgColor = window.getComputedStyle(contentPanel).backgroundColor;

  if (!bgColor || bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent') {
    bgColor = '#000';
  }

  html2canvas(contentPanel, {
    backgroundColor: bgColor
  }).then(canvas => {
    const link = document.createElement("a");
    link.download = "typeunbound.png";
    link.href = canvas.toDataURL();
    link.click();
  });
});

  window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");

    const MIN_DURATION = 3000;

    const start = performance.now();

    requestAnimationFrame(function checkTime() {
      const elapsed = performance.now() - start;
      if (elapsed >= MIN_DURATION) {
        preloader.classList.add("hidden");
        setTimeout(() => preloader.remove(), 800);
      } else {
        requestAnimationFrame(checkTime);
      }
    });
  });


});