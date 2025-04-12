const questions = [
    { emoji: "🌕👨‍🚀🚀", answer: "Apollo 11 Görevi / Missão Apollo 11", options: ["Apollo 11 Görevi / Missão Apollo 11", "Covid-19 / Pandemia", "Berlin Duvarı / Muro de Berlim", "Titanik / Titanic"] },
    { emoji: "😷🔒💉", answer: "Covid-19 / Pandemia", options: ["Covid-19 / Pandemia", "Berlin Duvarı / Muro de Berlim", "Apollo 11 Görevi / Missão Apollo 11", "Çernobil / Chernobyl"] },
    { emoji: "🔨🎉", answer: "Berlin Duvarı’nın Yıkılışı / Queda do Muro de Berlim", options: ["Berlin Duvarı’nın Yıkılışı / Queda do Muro de Berlim", "Apollo 11 Görevi / Missão Apollo 11", "İkiz Kuleler / Torres Gêmeas", "Atom Bombası / Bomba Atômica"] },
    { emoji: "🚢🎻", answer: "Titanik / Titanic", options: ["Titanik / Titanic", "Çernobil / Chernobyl", "Covid-19 / Pandemia", "Fukushima / Fukushima"] },
    { emoji: "🏭☢️💥", answer: "Çernobil / Chernobyl", options: ["Çernobil / Chernobyl", "Titanik / Titanic", "Ay'a İniş / Pouso na Lua", "Fukushima / Fukushima"] },
    { emoji: "🌊🏯☢️", answer: "Fukushima / Fukushima", options: ["Fukushima / Fukushima", "Çernobil / Chernobyl", "Covid-19 / Pandemia", "Apollo 11 / Apollo 11"] },
    { emoji: "🔥🏛️🇫🇷", answer: "Notre Dame / Notre Dame", options: ["Notre Dame / Notre Dame", "Titanik / Titanic", "İkiz Kuleler / Torres Gêmeas", "Ay'a İniş / Pouso na Lua"] },
    { emoji: "🏙️✈️✈️", answer: "İkiz Kuleler / Torres Gêmeas", options: ["İkiz Kuleler / Torres Gêmeas", "Berlin Duvarı / Muro de Berlim", "Fukushima / Fukushima", "Covid-19 / Pandemia"] },
    { emoji: "☢️💣🏯", answer: "Atom Bombası / Bomba Atômica", options: ["Atom Bombası / Bomba Atômica", "Çernobil / Chernobyl", "Titanik / Titanic", "Japonya Depremi / Terremoto Japão"] },
    { emoji: "🚀💥🌌", answer: "Challenger / Challenger", options: ["Challenger / Challenger", "Apollo 11 Görevi / Missão Apollo 11", "Mars Görevi / Missão Marte", "Notre Dame / Notre Dame"] }
  ];
  
  let current = 0;
  let score = 0;
  let nickname = '';
  
  function startGame() {
    nickname = document.getElementById('nickname').value || 'Anonim';
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('end-screen').classList.add('hidden');
    document.getElementById('quiz-screen').classList.remove('hidden');
    current = 0;
    score = 0;
    showQuestion();
  }
  
  function showQuestion() {
    if (!questions[current]) return endGame();
    const q = questions[current];
    document.getElementById('question').textContent = q.emoji;
    const choicesDiv = document.getElementById('choices');
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
      btn.disabled = true;
      if (btn.textContent === correct) {
        btn.classList.add('correct');
      } else {
        btn.classList.add('wrong');
      }
    });
  
    if (selected === correct) {
      score++;
      correctSound.play();
      button.classList.add("bounce");
      document.getElementById('result').textContent = 'Doğru! ✅ / Correto! ✅';
    } else {
      wrongSound.play();
      button.classList.add("shake");
      document.getElementById('result').textContent = `Yanlış ❌ Doğru cevap: ${correct} / Errado ❌ Resposta correta: ${correct}`;
    }
  
    setTimeout(() => {
      current++;
      if (current < questions.length) showQuestion();
      else endGame();
    }, selected === correct ? 1000 : 2000);
  }
  
  function endGame() {
    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('end-screen').classList.remove('hidden');
    document.getElementById('final-score').textContent = `${nickname} - Doğru: ${score} / ${questions.length}`;
  }
  
  function resetToStart() {
    document.getElementById('nickname').value = '';
    document.getElementById('start-screen').classList.remove('hidden');
    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('end-screen').classList.add('hidden');
  }
  