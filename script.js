const questions = [
    {
      emoji: "🌕👨‍🚀🚀",
      answer: "Apollo 11 Görevi / Missão Apollo 11",
      options: [
        "Apollo 11 Görevi / Missão Apollo 11",
        "Covid-19 / Pandemia",
        "Çernobil / Chernobyl",
        "Titanik / Titanic"
      ]
    },
    {
      emoji: "😷🔒💉",
      answer: "Covid-19 / Pandemia",
      options: [
        "Covid-19 / Pandemia",
        "Berlin Duvarı / Muro de Berlim",
        "Apollo 11 Görevi / Missão Apollo 11",
        "Çernobil / Chernobyl"
      ]
    }
    // ← Diğer soruları da buraya aynı formatta eklersin, toplam 10 tane olacak şekilde
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
      document.getElementById('result').textContent = 'Doğru! ✅ / Correto! ✅';
    } else {
      wrongSound.play();
      document.getElementById('result').textContent = `Yanlış ❌ Doğru cevap: ${correct} / Errado ❌ Resposta correta: ${correct}`;
      button.classList.add('shake');
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
  