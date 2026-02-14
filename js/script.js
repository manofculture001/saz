// ---- External image URLs for each petal ----
const photos = [
"https://www.instagram.com/p/DCrg24DIdZV/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==", // petal 1
  "https://images.unsplash.com/photo-1553583384-7b6b61cb4c43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", // petal 2
  "https://images.unsplash.com/photo-1596160461173-d8a6a4a7c0b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", // petal 3
  "https://images.unsplash.com/photo-1591089793848-2f1b7f0b2f58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", // petal 4
  "https://images.unsplash.com/photo-1560368137-5db346d8f48d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", // petal 5
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", // petal 6
  "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", // petal 7
  "https://images.unsplash.com/photo-1493244040629-496f6d136cc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", // petal 8
  "https://images.unsplash.com/photo-1531327431639-1f9c4b5f5d0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", // petal 9
  "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", // petal 10
  "https://images.unsplash.com/photo-1549887532-8b3fbcf05185?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", // petal 11
  "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", // petal 12
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", // petal 13
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"  // petal 14
];

const loading = document.getElementById("loading");
const countdown = document.getElementById("countdown");
const countHolder = document.getElementById("countHolder");
const actor = document.getElementById("actor");
const bouquet = document.getElementById("bouquet");
const flower = document.getElementById("flower");
const text = document.getElementById("text");
const restart = document.getElementById("restart");

function sleep(ms){ return new Promise(r => setTimeout(r, ms)); }

// ---- Countdown 3..2..1 ----
async function startCountdown(){
  for(let i = 3; i >= 1; i--){
    const el = document.createElement("div");
    el.className = "count";
    el.textContent = i;
    countHolder.innerHTML = "";
    countHolder.appendChild(el);
    await sleep(1200);
  }
  countdown.style.display = "none";
  startScene();
}

// ---- Start animation scene ----
function startScene(){
  actor.classList.add("walk");
  setTimeout(()=>{
    createBouquet();
    text.classList.add("show");
    restart.classList.add("show");
    createFloatingHearts();
  },7000);
}

// ---- Create bouquet petals ----
function createBouquet(){
  flower.innerHTML = "";
  const centerX = flower.offsetWidth / 2;
  const centerY = flower.offsetHeight / 2;

  let photoIndex = 0;

  function getPhoto(){
    if(photoIndex < photos.length){
      return photos[photoIndex++]; // next sequential photo
    } else {
      return photos[photoIndex++ % photos.length]; // loop if more petals than images
    }
  }

  function createPetal(x, y, size, imgSrc, angle=0){
    const petal = document.createElement("div");
    petal.className = "petal";
    petal.style.width = size + "px";
    petal.style.height = size + "px";
    petal.style.left = x + "px";
    petal.style.top = y + "px";
    petal.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;

    const img = document.createElement("img");
    img.src = imgSrc;
    petal.appendChild(img);

    addClickHandler(petal);
    flower.appendChild(petal);
  }

  // ---- Center petal ----
  createPetal(centerX, centerY, 100, getPhoto());

  // ---- Surrounding petals ----
  const layers = [
    {count:8, radius:120, size:80},
    {count:12, radius:200, size:70}
  ];

  layers.forEach(layer=>{
    const angleStep = (2 * Math.PI) / layer.count;
    for(let i = 0; i < layer.count; i++){
      const angle = i * angleStep;
      const x = centerX + Math.cos(angle) * layer.radius;
      const y = centerY + Math.sin(angle) * layer.radius;
      createPetal(x, y, layer.size, getPhoto(), angle * 180 / Math.PI);
    }
  });
}

// ---- Click to zoom bouquet petal ----
function addClickHandler(petal){
  const close = document.createElement("button");
  close.className = "close-btn";
  close.textContent = "×";
  close.onclick = e=>{
    e.stopPropagation();
    flower.classList.remove("dim");
    document.querySelectorAll(".petal").forEach(p=>p.classList.remove("active"));
  };
  petal.appendChild(close);

  petal.onclick = e=>{
    e.stopPropagation();
    flower.classList.add("dim");
    document.querySelectorAll(".petal").forEach(p=>p.classList.remove("active"));
    petal.classList.add("active");
  };
}

// ---- Floating hearts animation ----
function createFloatingHearts(){
  for(let i=0;i<40;i++){
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.style.left = Math.random()*100 + "%";
    heart.style.top = -20 + "px";
    heart.style.width = 5 + Math.random()*10 + "px";
    heart.style.height = 5 + Math.random()*10 + "px";
    document.body.appendChild(heart);
    let speed = 0.5 + Math.random();
    function fall(){
      let top = parseFloat(heart.style.top);
      if(top > window.innerHeight){
        heart.style.top = -20 + "px";
        heart.style.left = Math.random()*100 + "%";
      } else {
        heart.style.top = (top + speed) + "px";
        heart.style.left = parseFloat(heart.style.left) + Math.sin(top/50)*0.3 + "%";
      }
      requestAnimationFrame(fall);
    }
    fall();
  }
}

// ---- Restart button ----
restart.onclick = ()=>{
  actor.classList.remove("walk");
  flower.innerHTML = "";
  document.querySelectorAll(".heart").forEach(h => h.remove());
  countdown.style.display = "grid";
  startCountdown();
};

// ---- Initial loading ----
setTimeout(()=>{ loading.style.display="none"; startCountdown(); },1500);
