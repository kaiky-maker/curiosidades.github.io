// Inicializa EmailJS
(function() {
    emailjs.init("1GOohDdByOVpBgiT_"); // <<< Coloque seu USER ID
  })();
  
  // Corações animados
  const heartsContainer = document.querySelector('.hearts-container');
  
  function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (3 + Math.random() * 2) + 's';
    heartsContainer.appendChild(heart);
  
    setTimeout(() => {
      heart.remove();
    }, 5000);
  }
  
  setInterval(createHeart, 300);
  
  // Botão "Não" se movendo
  const naoBtn = document.getElementById('nao');
  
  function moveButton() {
    const parent = document.querySelector('.buttons');
    const parentWidth = parent.offsetWidth - naoBtn.offsetWidth;
    const parentHeight = parent.offsetHeight - naoBtn.offsetHeight;
  
    const randomX = Math.random() * parentWidth;
    const randomY = Math.random() * parentHeight;
  
    naoBtn.style.position = 'absolute';
    naoBtn.style.left = `${randomX}px`;
    naoBtn.style.top = `${randomY}px`;
  }
  
  naoBtn.addEventListener('mouseover', moveButton);
  
  // Fogos de artifício - múltiplos
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
      this.x = x;
      this.y = y;
      this.particles = [];
  
      for (let i = 0; i < 100; i++) {
        this.particles.push({
          x: x,
          y: y,
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
        ctx.fillStyle = `rgba(${hexToRgb(p.color)},${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
      });
    }
  
    isDone() {
      return this.particles.length === 0;
    }
  }
  
  // Função para converter HSL para RGB string
  function hexToRgb(hsl) {
    // hsl = hsl(hue, saturation%, lightness%)
    // Para simplificar, usaremos a cor do particle direto em hsl e converter para rgb com canvas não é trivial, 
    // então alterei para usar hsl direto no fillStyle abaixo.
    return hsl;
  }
  
  let fireworks = [];
  
  function animateFireworks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fireworks.forEach((fw, index) => {
      fw.update();
      ctx.fillStyle = 'white';
      fw.particles.forEach(p => {
        ctx.fillStyle = `hsla(${Math.floor(Math.random()*360)}, 100%, 70%, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
      });
  
      if (fw.isDone()) {
        fireworks.splice(index, 1);
      }
    });
    requestAnimationFrame(animateFireworks);
  }
  
  animateFireworks();
  
  // Dispara vários fogos em locais aleatórios
  function shootMultipleFireworks(count = 5) {
    for(let i = 0; i < count; i++) {
      setTimeout(() => {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight / 2 + window.innerHeight / 4; // meio topo da tela
        fireworks.push(new Firework(x, y));
      }, i * 300);
    }
  }
  
  // Botão "Sim"
  const simBtn = document.getElementById('sim');
  
  simBtn.addEventListener('click', function() {
    shootMultipleFireworks(8);
  
    // Envia o e-mail
    emailjs.send("service_h3dm2oc", "template_f1b4csj", {
      to_email: "kaikytay10@gmail.com",
      message: "Ela clicou em SIM! ❤️"
    }).then(function(response) {
      alert('Resposta enviada com sucesso!');
    }, function(error) {
      alert('Falha ao enviar resposta: ' + JSON.stringify(error));
    });
  });
  