document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');
  const modeToggle = document.getElementById('mode-toggle');
  const passwordInput = document.getElementById('password');
  const linkInput = document.getElementById('link');
  const deskripsiInput = document.getElementById('deskripsi');
  const uploadBtn = document.getElementById('upload-btn');
  const resetBtn = document.getElementById('reset-btn');
  const linkList = document.getElementById('link-list');
  const body = document.body;
  const loading = document.getElementById('loading');
  let isDarkMode = false;
  let links = localStorage.getItem('links') ? JSON.parse(localStorage.getItem('links')) : [];
  const waktuLoading = 2000; // 2 detik
  menuToggle.addEventListener('click', function() {
    menuToggle.classList.toggle('active');
    menu.classList.toggle('active');
  });
  modeToggle.addEventListener('click', function() {
    isDarkMode = !isDarkMode;
    body.classList.toggle('dark', isDarkMode);
    body.classList.toggle('light', !isDarkMode);
    modeToggle.textContent = isDarkMode ? 'Mode Terang' : 'Mode Gelap';
  });
  uploadBtn.addEventListener('click', function() {
    loading.style.display = 'block';
    const password = passwordInput.value.trim();
    const link = linkInput.value.trim();
    const deskripsi = deskripsiInput.value.trim();
    if (password === 'rifal' && link && deskripsi) {
      links.push({ link, deskripsi });
      localStorage.setItem('links', JSON.stringify(links));
      tampilkanLink();
      passwordInput.value = '';
      linkInput.value = '';
      deskripsiInput.value = '';
    } else {
      alert('Password atau link salah!');
    }
    setTimeout(function() {
      loading.style.display = 'none';
    }, waktuLoading);
  });
  resetBtn.addEventListener('click', function() {
    loading.style.display = 'block';
    const passwordReset = prompt('Masukkan password untuk reset link:');
    if (passwordReset === 'rifal') {
      links = [];
      localStorage.removeItem('links');
      tampilkanLink();
      alert('Link telah direset!');
    } else {
      alert('Password salah!');
    }
    setTimeout(function() {
      loading.style.display = 'none';
    }, waktuLoading);
  });
  function tampilkanLink() {
    linkList.innerHTML = '';
    links.forEach((link) => {
      const linkElement = document.createElement('div');
      linkElement.innerHTML = `<a href="${link.link}">${link.deskripsi}</a>`;
      linkList.appendChild(linkElement);
    });
  }
  tampilkanLink();
});