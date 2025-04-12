let current = 0;
let score = 0;
let playerName = "";

const questions = [
  { emoji: "🌕👨‍🚀🚀", answer: "Apollo 11 Görevi / Missão Apollo 11", options: ["Apollo 11 Görevi / Missão Apollo 11", "Titanik / Titanic", "Covid-19 / Pandemia", "Berlin Duvarı / Muro de Berlim"] },
  { emoji: "🧱🔨🎉", answer: "Berlin Duvarı’nın Yıkılışı / Queda do Muro de Berlim", options: ["Berlin Duvarı’nın Yıkılışı / Queda do Muro de Berlim", "Apollo 11", "Çernobil", "Covid"] },
  { emoji: "🏭☢️💥", answer: "Çernobil Felaketi / Desastre de Chernobyl", options: ["Çernobil Felaketi / Desastre de Chernobyl", "Titanik", "Covid", "Ay’a İniş"] },
  { emoji: "🏯🌊☢️", answer: "2011 Japonya Depremi / Terremoto no Japão", options: ["2011 Japonya Depremi / Terremoto no Japão", "Çernobil", "İkiz Kuleler", "Pandemi"] },
  { emoji: "😷🔒💉", answer: "Covid-19 Salgını / Pandemia de Covid-19", options: ["Covid-19 Salgını / Pandemia de Covid-19", "Atom Bombası", "Berlin Duvarı", "Titanik"] },
  { emoji: "🚢🧊🎻", answer: "Titanik Kazası / Acidente do Titanic", options: ["Titanik Kazası / Acidente do Titanic", "Çernobil", "Covid", "Uzay Görevi"] },
  { emoji: "🚀💥🌌", answer: "Challenger Felaketi / Desastre do Challenger", options: ["Challenger Felaketi / Desastre do Challenger", "Apollo 11", "Titanik", "Notre Dame Yangını"] },
  { emoji: "🏙️✈️✈️", answer: "İkiz Kuleler Saldırısı / Ataques às Torres Gêmeas", options: ["İkiz Kuleler Saldırısı / Ataques às Torres Gêmeas", "Berlin Duvarı", "Fukushima", "Mars Görevi"] },
  { emoji: "☢️💣🏯", answer: "Atom Bombası / Bomba Atômica", options: ["Atom Bombası / Bomba Atômica", "Çernobil", "Covid", "Japonya Depremi"] },
  { emoji: "🔥🏛️🇫🇷", answer: "Notre Dame Yangını / Incêndio de Notre-Dame", options: ["Notre Dame Yangını / Incêndio de Notre-Dame", "Atom Patlaması", "Titanik", "Uzay Mekiği"] }
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
  const q = questions[current];
  document.getElementById("question").textContent = q.emoji;
  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";

  q.options.sort(() => Math.random() - 0.5).forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => checkAnswer(btn, option);
    choicesDiv.appendChild(btn);
  });

  document.getElementById("result").textContent = "";
}

function checkAnswer(button, selected) {
  const correct = questions[current].answer;
  const allButtons = document.querySelectorAll("#choices button");

  allButtons.forEach(btn => {
    if (btn.textContent === correct) {
      btn.classList.add("correct");
    } else {
      btn.classList.add("wrong");
    }
    btn.disabled = true;
  });

  if (selected === correct) {
    score++;
    document.getElementById("result").textContent = "Doğru! ✅ / Correto!";
  } else {
    document.getElementById("result").textContent = `Yanlış ❌ Doğru cevap: ${correct}`;
    button.classList.add("shake");
  }

  current++;
  setTimeout(() => {
    if (current < questions.length) {
      showQuestion();
    } else {
      endGame();
    }
  }, selected === correct ? 1000 : 2000);
}

function endGame() {
  document.getElementById("quiz-screen").classList.add("hidden");
  document.getElementById("end-screen").classList.remove("hidden");
  document.getElementById("final-score").textContent = `Doğru: ${score} / ${questions.length}`;
}

function resetToStart() {
  document.getElementById("start-screen").classList.remove("hidden");
  document.getElementById("end-screen").classList.add("hidden");
  document.getElementById("nickname").value = "";
}
