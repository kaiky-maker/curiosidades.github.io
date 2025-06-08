emailjs.init("1GOohDdByOVpBgiT_"); // Substitua com seu USER ID

const heartsContainer = document.querySelector('.hearts-container');

function createHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.top = (60 + Math.random() * 30) + 'vh'; // corrigido aqui
  heart.style.animationDuration = (4 + Math.random() * 3) + 's';
  heartsContainer.appendChild(heart);

  setTimeout(() => heart.remove(), 7000);
}

setInterval(createHeart, 300);

// Botão "Não" se mexendo
const naoBtn = document.getElementById('nao');
naoBtn.addEventListener('mouseover', () => {
  const parent = document.querySelector('.buttons');
  const maxX = parent.offsetWidth - naoBtn.offsetWidth;
  const maxY = parent.offsetHeight - naoBtn.offsetHeight;
  naoBtn.style.position = 'absolute';
  naoBtn.style.left = Math.random() * maxX + 'px';
  naoBtn.style.top = Math.random() * maxY + 'px';
});

// Fogos
const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Firework {
  constructor(x, y) {
    this.particles = [];
    for (let i = 0; i < 100; i++) {
      this.particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 5,
        vy: (Math.random() - 0.5) * 5,
        alpha: 1,
        color: `hsl(${Math.random() * 360}, 100%, 60%)`
      });
    }
  }
  update() {
    this.particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= 0.02;
    });
    this.particles = this.particles.filter(p => p.alpha > 0);
  }
  draw() {
    this.particles.forEach(p => {
      ctx.fillStyle = `hsla(${Math.random()*360}, 100%, 60%, ${p.alpha})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      ctx.fill();
    });
  }
  isDone() {
    return this.particles.length === 0;
  }
}

let fireworks = [];

function animateFireworks() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  fireworks.forEach((fw, index) => {
    fw.update();
    fw.draw();
    if (fw.isDone()) fireworks.splice(index, 1);
  });
  requestAnimationFrame(animateFireworks);
}
animateFireworks();

function shootMultipleFireworks(count = 5) {
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight / 2 + window.innerHeight / 4;
      fireworks.push(new Firework(x, y));
    }, i * 300);
  }
}

// Botão Sim
document.getElementById('sim').addEventListener('click', function() {
  shootMultipleFireworks(8);
  emailjs.send("service_h3dm2oc", "template_f1b4csj", {
    to_email: "kaikytay10@gmail.com",
    message: "Ela clicou em SIM! ❤️"
  }).then(() => {
    alert('Resposta enviada com sucesso!');
  }, (error) => {
    alert('Erro ao enviar: ' + JSON.stringify(error));
  });
});
