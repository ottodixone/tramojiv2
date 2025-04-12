let current = 0;
let score = 0;
let playerName = "";
let stats = [];

const questions = [
  {
    emoji: "🌕👨‍🚀🚀",
    answer: "Apollo 11 Görevi / Missão Apollo 11",
    options: [
      "Apollo 11 Görevi / Missão Apollo 11",
      "Titanik Faciası / Acidente do Titanic",
      "Covid-19 Salgını / Pandemia de Covid-19",
      "Berlin Duvarı / Muro de Berlim"
    ]
  },
  {
    emoji: "🧱🔨🎉",
    answer: "Berlin Duvarı’nın Yıkılışı / Queda do Muro de Berlim",
    options: [
      "Berlin Duvarı’nın Yıkılışı / Queda do Muro de Berlim",
      "Apollo 11 Görevi / Missão Apollo 11",
      "Çernobil Felaketi / Desastre de Chernobyl",
      "Covid-19 Salgını / Pandemia de Covid-19"
    ]
  },
  {
    emoji: "🏭☢️💥",
    answer: "Çernobil Felaketi / Desastre de Chernobyl",
    options: [
      "Çernobil Felaketi / Desastre de Chernobyl",
      "Titanik Faciası / Acidente do Titanic",
      "Ay’a İniş / Pouso na Lua",
      "Japonya Depremi / Terremoto no Japão"
    ]
  },
  {
    emoji: "🏯🌊☢️",
    answer: "2011 Japonya Depremi / Terremoto no Japão",
    options: [
      "2011 Japonya Depremi / Terremoto no Japão",
      "Çernobil Felaketi / Desastre de Chernobyl",
      "İkiz Kuleler / Torres Gêmeas",
      "Pandemi / Pandemia"
    ]
  },
  {
    emoji: "😷🔒💉",
    answer: "Covid-19 Salgını / Pandemia de Covid-19",
    options: [
      "Covid-19 Salgını / Pandemia de Covid-19",
      "Atom Bombası / Bomba Atômica",
      "Berlin Duvarı / Muro de Berlim",
      "Titanik / Titanic"
    ]
  },
  {
    emoji: "🚢🧊🎻",
    answer: "Titanik Kazası / Acidente do Titanic",
    options: [
      "Titanik Kazası / Acidente do Titanic",
      "Çernobil / Chernobyl",
      "Covid / Covid",
      "Uzay Görevi / Missão Espacial"
    ]
  },
  {
    emoji: "🚀💥🌌",
    answer: "Challenger Felaketi / Desastre do Challenger",
    options: [
      "Challenger Felaketi / Desastre do Challenger",
      "Apollo 11 / Apollo 11",
      "Titanik / Titanic",
      "Notre Dame Yangını / Incêndio de Notre-Dame"
    ]
  },
  {
    emoji: "🏙️✈️✈️",
    answer: "İkiz Kuleler Saldırısı / Ataques às Torres Gêmeas",
    options: [
      "İkiz Kuleler Saldırısı / Ataques às Torres Gêmeas",
      "Berlin Duvarı / Muro de Berlim",
      "Fukushima / Fukushima",
      "Mars Görevi / Missão Marte"
    ]
  },
  {
    emoji: "☢️💣🏯",
    answer: "Atom Bombası / Bomba Atômica",
    options: [
      "Atom Bombası / Bomba Atômica",
      "Çernobil / Chernobyl",
      "Covid / Covid",
      "Japonya Depremi / Terremoto Japão"
    ]
  },
  {
    emoji: "🔥🏛️🇫🇷",
    answer: "Notre Dame Yangını / Incêndio de Notre-Dame",
    options: [
      "Notre Dame Yangını / Incêndio de Notre-Dame",
      "Atom Patlaması / Explosão Atômica",
      "Titanik / Titanic",
      "Uzay Mekiği / Ônibus Espacial"
    ]
  }
];

function startGame() {
  const nicknameInput = document.getElementById("nickname");
  const name = nicknameInput.value.trim();
  if (!name || name.length > 20) {
    alert("Lütfen geçerli bir takma ad girin (maks. 20 karakter).");
    return;
  }

  playerName = name;
  current = 0;
  score = 0;
  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("quiz-screen").classList.remove("hidden");
  showQuestion();
}

function showQuestion() {
  if (!questions[current]) return endGame();
  const q = questions[current];
  document.getElementById("question").innerHTML = q.emoji;
  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = '';
  q.options.sort(() => Math.random() - 0.5).forEach(option => {
    const btn = document.createElement('button');
    btn.textContent = option;
    btn.onclick = () => checkAnswer(btn, option);
    choicesDiv.appendChild(btn);
  });
  document.getElementById('result').textContent = '';
}

function checkAnswer(button, selected) {
  const correct = questions[current].answer;
  const correctSound = document.getElementById('correctSound');
  const wrongSound = document.getElementById('wrongSound');
  const buttons = document.querySelectorAll(".choices-grid button");

  buttons.forEach(btn => {
    if (btn.textContent === correct) btn.classList.add('correct');
    else btn.classList.add('wrong');
    btn.disabled = true;
  });

  if (selected === correct) {
    score++;
    correctSound.play();
    document.getElementById('result').textContent = 'Doğru! ✅ / Correto! ✅';
  } else {
    wrongSound.play();
    document.getElementById('result').textContent = `Yanlış ❌ Doğru cevap: ${correct} / Errado ❌ Resposta correta: ${correct}`;
  }

  current++;
  setTimeout(() => {
    if (current < questions.length) showQuestion();
    else endGame();
  }, selected === correct ? 1000 : 2000);
}

function endGame() {
  document.getElementById("quiz-screen").classList.add("hidden");
  document.getElementById("end-screen").classList.remove("hidden");
  document.getElementById("final-score").textContent = `Doğru sayısı: ${score} / ${questions.length} | Pontuação: ${score} de ${questions.length}`;
  stats.push({ name: playerName, score, wrong: questions.length - score });
  saveStats();
  updateStats();
}

function resetToStart() {
  document.getElementById("start-screen").classList.remove("hidden");
  document.getElementById("end-screen").classList.add("hidden");
  document.getElementById("quiz-screen").classList.add("hidden");
  document.getElementById("nickname").value = "";
}

function updateStats() {
  const list = document.getElementById("player-stats");
  list.innerHTML = '';
  stats.forEach(p => {
    const li = document.createElement("li");
    li.textContent = `${p.name}: ${p.score} / ${p.wrong}`;
    list.appendChild(li);
  });
}

function saveStats() {
  localStorage.setItem("tramoji_stats", JSON.stringify(stats));
}

function loadStats() {
  const saved = localStorage.getItem("tramoji_stats");
  if (saved) stats = JSON.parse(saved);
}

function clearStatsDaily() {
  const today = new Date().toISOString().split("T")[0];
  const last = localStorage.getItem("tramoji_last_reset");
  if (last !== today) {
    stats = [];
    localStorage.setItem("tramoji_last_reset", today);
    saveStats();
  }
}

clearStatsDaily();
loadStats();
updateStats();
