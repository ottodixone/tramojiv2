const questions = [
    {
      emoji: "🌕👨‍🚀🚀",
      answer: "Apollo 11 Görevi / Missão Apollo 11",
      options: [
        "Apollo 11 Görevi / Missão Apollo 11",
        "Covid-19 / Pandemia",
        "Berlin Duvarı / Muro de Berlim",
        "Titanik / Titanic"
      ]
    },
    {
      emoji: "😷🔒💉",
      answer: "Covid-19 / Pandemia",
      options: [
        "Covid-19 / Pandemia",
        "Çernobil / Chernobyl",
        "Apollo 11 / Apollo 11",
        "Berlin Duvarı’nın Yıkılışı / Queda do Muro de Berlim"
      ]
    },
    {
      emoji: "🏭☢️💥",
      answer: "Çernobil Felaketi / Desastre de Chernobyl",
      options: [
        "Çernobil Felaketi / Desastre de Chernobyl",
        "Titanik / Titanic",
        "Ay’a İniş / Pouso na Lua",
        "Japonya Depremi / Terremoto no Japão"
      ]
    },
    {
      emoji: "🏯🌊☢️",
      answer: "2011 Japonya Depremi / Terremoto no Japão 2011",
      options: [
        "2011 Japonya Depremi / Terremoto no Japão 2011",
        "Çernobil / Chernobyl",
        "İkiz Kuleler / Torres Gêmeas",
        "Pandemi / Pandemia"
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
      emoji: "<span style='display:inline-block;padding:0 0.3em;background:#d9b38c;border-radius:6px;'>🧱</span>🔨🎉",
      answer: "Berlin Duvarı’nın Yıkılışı / Queda do Muro de Berlim",
      options: [
        "Berlin Duvarı’nın Yıkılışı / Queda do Muro de Berlim",
        "Apollo 11 Görevi / Missão Apollo 11",
        "Çernobil Felaketi / Desastre de Chernobyl",
        "Covid-19 Salgını / Pandemia de Covid-19"
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
  
  let current = 0;
  let score = 0;
  let nickname = "";
  
  function startGame() {
    nickname = document.getElementById("nickname").value.trim();
    if (nickname === "") {
      alert("Lütfen takma ad girin. / Por favor, insira um apelido.");
      return;
    }
    document.getElementById("start-screen").classList.add("hidden");
    document.getElementById("end-screen").classList.add("hidden");
    document.getElementById("quiz-screen").classList.remove("hidden");
    current = 0;
    score = 0;
    showQuestion();
  }
  
  function showQuestion() {
    if (current >= questions.length) return endGame();
    const q = questions[current];
    document.getElementById("question").innerHTML = q.emoji;
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
    const buttons = document.querySelectorAll(".choices button");
  
    buttons.forEach(btn => {
      btn.disabled = true;
      if (btn.textContent === correct) btn.classList.add("correct");
      else btn.classList.add("wrong");
    });
  
    if (selected === correct) {
      score++;
      document.getElementById("result").textContent = "Doğru! ✅ / Correto! ✅";
      setTimeout(() => {
        current++;
        showQuestion();
      }, 1000);
    } else {
      document.getElementById("result").textContent = `Yanlış ❌ Doğru cevap: ${correct} / Errado ❌ Resposta correta: ${correct}`;
      button.classList.add("shake");
      setTimeout(() => {
        current++;
        showQuestion();
      }, 2000);
    }
  }
  
  function endGame() {
    document.getElementById("quiz-screen").classList.add("hidden");
    document.getElementById("end-screen").classList.remove("hidden");
    document.getElementById("final-score").textContent = `Doğru sayısı: ${score} / ${questions.length} | Pontuação: ${score} de ${questions.length}`;
  
    let playerData = JSON.parse(localStorage.getItem("tramoji-players")) || [];
    playerData.push({ name: nickname, score });
    localStorage.setItem("tramoji-players", JSON.stringify(playerData));
  
    renderStats();
  }
  
  function renderStats() {
    const list = document.getElementById("player-stats");
    list.innerHTML = "";
    const playerData = JSON.parse(localStorage.getItem("tramoji-players")) || [];
    playerData.slice(-10).reverse().forEach(p => {
      const li = document.createElement("li");
      li.textContent = `${p.name} - ${p.score} / ${questions.length}`;
      list.appendChild(li);
    });
  }
  
  function resetToStart() {
    document.getElementById("nickname").value = "";
    document.getElementById("start-screen").classList.remove("hidden");
    document.getElementById("quiz-screen").classList.add("hidden");
    document.getElementById("end-screen").classList.add("hidden");
  }
  