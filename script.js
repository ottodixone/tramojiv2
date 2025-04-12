const questions = [
    { emoji: "🌕👨‍🚀🚀", answer: "Apollo 11 Görevi / Missão Apollo 11", options: ["Apollo 11 Görevi / Missão Apollo 11", "Covid-19 / Pandemia", "Berlin Duvarı / Muro de Berlim", "Titanik / Titanic"] },
    { emoji: "😷🔒💉", answer: "Covid-19 / Pandemia", options: ["Covid-19 / Pandemia", "Çernobil / Chernobyl", "Ay Görevi / Missão Lunar", "Fukushima / Fukushima"] },
    { emoji: "🧱🔨🎉", answer: "Berlin Duvarı’nın Yıkılışı / Queda do Muro de Berlim", options: ["Berlin Duvarı’nın Yıkılışı / Queda do Muro de Berlim", "Ay'a İniş / Pouso na Lua", "İkiz Kuleler / Torres Gêmeas", "Atom Bombası / Bomba Atômica"] },
    { emoji: "🚢🧊🎻", answer: "Titanik / Titanic", options: ["Titanik / Titanic", "Çernobil / Chernobyl", "Notre Dame / Notre Dame", "Fukushima / Fukushima"] },
    { emoji: "🏭☢️💥", answer: "Çernobil / Chernobyl", options: ["Çernobil / Chernobyl", "Titanik / Titanic", "Berlin Duvarı / Muro de Berlim", "Covid / Covid"] },
    { emoji: "🌊🏯☢️", answer: "Fukushima / Fukushima", options: ["Fukushima / Fukushima", "Çernobil / Chernobyl", "Covid / Covid", "Apollo 11 / Apollo 11"] },
    { emoji: "🔥🏛️🇫🇷", answer: "Notre Dame / Notre Dame", options: ["Notre Dame / Notre Dame", "Titanik / Titanic", "İkiz Kuleler / Torres Gêmeas", "Apollo 11 / Apollo 11"] },
    { emoji: "🏙️✈️✈️", answer: "İkiz Kuleler / Torres Gêmeas", options: ["İkiz Kuleler / Torres Gêmeas", "Berlin Duvarı / Muro de Berlim", "Fukushima / Fukushima", "Covid / Covid"] },
    { emoji: "☢️💣🏯", answer: "Atom Bombası / Bomba Atômica", options: ["Atom Bombası / Bomba Atômica", "Çernobil / Chernobyl", "Covid / Covid", "Fukushima / Fukushima"] },
    { emoji: "🚀💥🌌", answer: "Challenger / Challenger", options: ["Challenger / Challenger", "Apollo / Apollo", "Mars / Marte", "Titanik / Titanic"] }
  ];
  
  let current = 0;
  let score = 0;
  let playerName = "";
  
  function startGame() {
    playerName = document.getElementById("nickname").value.trim();
    if (!playerName) return alert("Lütfen bir isim gir / Digite um apelido");
    current = 0;
    score = 0;
    document.getElementById("start-screen").classList.add("hidden");
    document.getElementById("end-screen").classList.add("hidden");
    document.getElementById("quiz-screen").classList.remove("hidden");
    showQuestion();
  }
  
  function showQuestion() {
    if (current >= questions.length) return endGame();
    const q = questions[current];
    document.getElementById("question").textContent = q.emoji;
    const choicesDiv = document.getElementById("choices");
    choicesDiv.innerHTML = '';
    q.options.sort(() => Math.random() - 0.5).forEach(option => {
      const btn = document.createElement("button");
      btn.textContent = option;
      btn.onclick = () => checkAnswer(btn, option);
      choicesDiv.appendChild(btn);
    });
    document.getElementById("result").textContent = '';
  }
  
  function checkAnswer(button, selected) {
    const correct = questions[current].answer;
    const buttons = document.querySelectorAll("#choices button");
    buttons.forEach(btn => {
      btn.disabled = true;
      if (btn.textContent === correct) {
        btn.classList.add("correct");
      } else {
        btn.classList.add("wrong");
      }
    });
  
    if (selected === correct) {
      score++;
    } else {
      button.classList.add("shake");
    }
  
    current++;
    const delay = selected === correct ? 1000 : 2000;
  
    setTimeout(() => {
      if (current === questions.length && score === questions.length) {
        showCombo();
      } else {
        showQuestion();
      }
    }, delay);
  }
  
  function showCombo() {
    const combo = document.getElementById("combo-message");
    combo.classList.remove("hidden");
    setTimeout(() => {
      combo.classList.add("hidden");
      endGame();
    }, 2000);
  }
  
  function endGame() {
    document.getElementById("quiz-screen").classList.add("hidden");
    document.getElementById("end-screen").classList.remove("hidden");
    document.getElementById("final-score").textContent = `Doğru: ${score} / 10 | Pontuação: ${score} de 10`;
  
    const list = JSON.parse(localStorage.getItem("stats") || "[]");
    list.push({ name: playerName, score });
    localStorage.setItem("stats", JSON.stringify(list));
  
    const statList = document.getElementById("player-stats");
    statList.innerHTML = "";
    list.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.name} - ${item.score} ✅ / ${10 - item.score} ❌`;
      statList.appendChild(li);
    });
  }
  
  function resetToStart() {
    document.getElementById("nickname").value = "";
    document.getElementById("start-screen").classList.remove("hidden");
    document.getElementById("quiz-screen").classList.add("hidden");
    document.getElementById("end-screen").classList.add("hidden");
  }
  