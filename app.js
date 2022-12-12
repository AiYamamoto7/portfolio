class QuizSelection {
  constructor(a, b, c, d) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
  }
}
class Quiz {
  constructor(question, selection, text, value) {
    this.question = question;
    this.selection = new QuizSelection(selection[0], selection[1], selection[2], selection[3], selection[4])
    this.text = text;
    this.value = value;
  }
}
const $checked = document.getElementsByClassName('checked');
const $directive = document.getElementById('directive');
const $btn = document.getElementById('btn');
const $next = document.getElementById('next');
const $backToTop = document.getElementById('back-to-top');
const $showScore = document.getElementById('show-score');
const $quizFrame = document.getElementById('quiz');
const $quiz = [
  new Quiz('5 + 2 = ？', ['5', '6', '7', '8'], '●●●●● と ●● をたすと●は7だね！', 'c'),
  new Quiz('9 - 3 = ？', ['5', '6', '7', '8'], '●●●●●●●●● から ●を 3つとると のこりは 6だね ', 'b'),
  new Quiz('なかまはずれはどれかな？', ['とんぼ', 'ばった', 'かぶとむし', 'すずめ'], 'すずめは とりの なかま。ほかは むしの なかまだね！', 'd'),
  new Quiz('（　）にはいる もじは なにかな？<br>わたし（　）、なわとびが とくいです。', ['に', 'を', 'は', 'わ'], 'それぞれ もじをいれて よんでみよう！', 'c'),
  new Quiz('なかまはずれはどれかな？', ['きゃべつ', 'りんご', 'いちご', 'みかん'], 'きゃべつは やさい。ほかは くだものだね！', 'a'),
  new Quiz('（　）にはいる もじは なにかな？<br>これは、いもうと（　）おもちゃです。', ['に', 'を', 'は', 'の'], 'それぞれ もじをいれて よんでみよう！', 'd'),
];
let i = 0;
let score = 0;

const shuffleQuiz = () => {
  for (let x = ($quiz.length - 1); x > 0; x--) {
    let r = Math.floor(Math.random()*(x+1));
    let tmp = $quiz[x];
    $quiz[x] = $quiz[r];
    $quiz[r] = tmp;
  }
  return $quiz;
}

const createQuestion = () => {
  console.log(i);
  let n = Number(i) + 1;//Number()で文字列を数値に変換
  $btn.style.display = 'block';
  $next.style.display = 'none';
  $directive.style.display = 'block';
	$quizFrame.innerHTML = `<div class="container">
	  <div class="question-num">もんだい${n}</div>
	  <div class="question">${$quiz[i].question}</div>
	  <hr>
	  <form id="answer${i}" class="answers">
		  <label><input type="radio" name="answer" value="a">${$quiz[i].selection.a}</label>
		  <label><input type="radio" name="answer" value="b">${$quiz[i].selection.b}</label>
		  <label><input type="radio" name="answer" value="c">${$quiz[i].selection.c}</label>
		  <label><input type="radio" name="answer" value="d">${$quiz[i].selection.d}</label>
	  </form>
	  <div class="checked" style="display: none;">
		  <p id="judge${i}" class="judge"></p>
		  <p id="comment${i}" class="comment"></p>
	  </div>
    </div>`;
}

const init = () => {
  let score = 0;
  let i = 0;
	$quizFrame.innerHTML = '';
  $showScore.style.display = 'none';
  $backToTop.style.display = 'none';
  shuffleQuiz();
  createQuestion();
};
// 初期設定
init();

const check = () => {
	const $answer = document.getElementById(`answer${i}`);
	const $judge = document.getElementById(`judge${i}`);
	const $comment = document.getElementById(`comment${i}`);
	$comment.textContent = $quiz[i].text;

	if ($answer.answer.value == '') {// 選ばれていない
		alert(`こたえを えらんでね！`);
  } else {
    for (const elem of $checked) {
      elem.style.display = 'block';
    }
    $btn.style.display = 'none';
    $next.style.display = 'block';
    $directive.style.display = 'none';
    if ($answer.answer.value == $quiz[i].value) {// 正解
      score++;
      $judge.textContent = '〇せいかい！';
    } else {// 間違い
    $judge.textContent = `×ちがうよ！　せいかい：${$quiz[i].selection[$quiz[i].value]}`;
	  }
  }
};

$btn.addEventListener('click', () => {
  check();
});

$next.addEventListener('click', () => {
  if (i < 3) {
    i++;
    createQuestion();
  } else {
    showScore();
  }
});

const showScore = () => {
  $showScore.innerHTML = `あなたの てんすうは...<br>${score}/4 てん`;//Shift + @ = `
	$showScore.style.display = 'block';
	$btn.style.display = 'none';
  $next.style.display = 'none';
  $directive.style.display = 'none';
  $backToTop.style.display = 'block';
  $quizFrame.innerHTML = '';
  $backToTop.addEventListener('click', () => {
    window.location.reload();
  });
}