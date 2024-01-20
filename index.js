document.addEventListener('DOMContentLoaded', function() {
  const collage = document.getElementById('collage');
  const fullscreenOverlay = document.getElementById('fullscreen-overlay');
  const fullscreenImage = document.getElementById('fullscreen-image');
  const closeButton = document.getElementById('close-button');

  let images = [];
  let currentIndex = 0;

  function fetchImages() {
    fetch('https://dog.ceo/api/breeds/image/random/18')
      .then(response => response.json())
      .then(data => {
        images = data.message;
        startCollage();
      })
      .catch(error => console.log(error));
  }

  function startCollage() {
    intervalId = setInterval(addNextImage, 3000);
  }

  function addNextImage() {
    if (currentIndex >= images.length) {
      currentIndex = 0;
      return;
    }

     const imageSrc = images[currentIndex % images.length];
    const image = document.createElement('img');
    image.src = imageSrc;
    image.addEventListener('load', function() {
      this.style.opacity = 1;
      this.style.maxHeight = '120px'
      this.style.maxWidth = '120px';
      this.style.minWidth = '50px'
      this.style.minHeight = '50px';
      this.style.width = Math.random();
      this.style.height = Math.random();
    });

    if (collage.children.length >= images.length) {
      const existingImage = collage.children[currentIndex % images.length];
      existingImage.style.opacity = 0; // добавляем плавное исчезновение существующего изображения
      setTimeout(function() {
        collage.replaceChild(image, existingImage);
      }, 3000); // заменяем существующее изображение через 3 секунды
    } else {
      collage.appendChild(image);
    }

    currentIndex++;
  }

  function openFullscreenImage(src) {
    fullscreenImage.src = src;
    fullscreenOverlay.classList.add('show');
  }

  function closeFullscreenImage() {
    fullscreenImage.src = '';
    fullscreenOverlay.classList.remove('show');
  }

  function downloadImage() {
    const link = document.createElement('a');
    link.href = fullscreenImage.src;
    link.download = 'image.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  collage.addEventListener('click', function(event) {
    if (event.target.tagName === 'IMG') {
      const imgSrc = event.target.src;
      openFullscreenImage(imgSrc);
    }
  });

  closeButton.addEventListener('click', closeFullscreenImage);
  document.getElementById('download-button').addEventListener('click', downloadImage);

  fetchImages();
 

  const tableBody = document.querySelector('#userTable tbody');
  const sidePanel = document.querySelector('#sidePanel');
  const postTitle = document.getElementById('postTitle');
  const postText = document.getElementById('postText');
  const idHeader = document.getElementById('idHeader');
  const loginHeader = document.getElementById('loginHeader');
  const emailHeader = document.getElementById('emailHeader');
  const nameHeader = document.getElementById('nameHeader');
  const birthDateHeader = document.getElementById('birthDateHeader');
  const heightHeader = document.getElementById('heightHeader');
  const ipAddressHeader = document.getElementById('ipAddressHeader');
  
  let userData = [];

  function fetchData() {
  
    fetch('https://dummyjson.com/users')
      .then(response => response.json())
      .then(function(data) {
        userData = data;
        displayUserData(userData);
      })
      .catch(error => console.log(error));
  }

  function displayUserData(data) {
    tableBody.innerHTML = '';
    for (let i = 0; i < data.length; i++) {
      const user = data[i];
      const row = document.createElement('tr');
      row.addEventListener('click', function() {
        showSidePanel(user.id);
      });
      row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.login}</td>
        <td>${user.email}</td>
        <td>${user.lastname}</td>
        <td>${user.firstname}</td>
        <td>${user.birthDate}</td>
        <td>${user.height}</td>
        <td>${user.ipaddress}</td>
      `;
      tableBody.appendChild(row);
    }
  }

  function showSidePanel(userId) {
    const user = userData.find(u => u.id === userId);
    postTitle.textContent = user.posts[0].title;
    postText.textContent = user.posts[0].text;
    sidePanel.style.display = 'block';
  }

  function closeSidePanel() {
    sidePanel.style.display = 'none';
  }

  function renderTable() {
    displayUserData(userData);
  }

  function sortTable(column) {
    const sortedData = Array.from(userData); // Create a copy of the original data
  
    sortedData.sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];
      return valueA.localeCompare(valueB);
    });
  
    userData = sortedData; // Update the original data
    renderTable();
  }

 

  function resetSortHeaders() {
    idHeader.innerHTML = 'ID';
    loginHeader.innerHTML = 'Login';
    emailHeader.innerHTML = 'Email';
    nameHeader.innerHTML = 'Name';
    birthDateHeader.innerHTML = 'Birth Date';
    heightHeader.innerHTML = 'Height';
    ipAddressHeader.innerHTML = 'IP Address';
  }

  idHeader.addEventListener('click', function() {
    resetSortHeaders();
    idHeader.innerHTML = 'ID ▼';
    sortTable('id');
  });

  loginHeader.addEventListener('click', function() {
    resetSortHeaders();
    loginHeader.innerHTML = 'Login ▼';
    sortTable('login');
  });

  emailHeader.addEventListener('click', function() {
    resetSortHeaders();
    emailHeader.innerHTML = 'Email ▼';
    sortTable('email');
  });

  nameHeader.addEventListener('click', function() {
    resetSortHeaders();
    nameHeader.innerHTML = 'Name ▼';
    sortTable('lastname');
  });

  birthDateHeader.addEventListener('click', function() {
    resetSortHeaders();
    birthDateHeader.innerHTML = 'Birth Date ▼';
    sortTable('birthDate');
  });

  heightHeader.addEventListener('click', function() {
    resetSortHeaders();
    heightHeader.innerHTML = 'Height ▼';
    sortTable('height');
  });

  ipAddressHeader.addEventListener('click', function() {
    resetSortHeaders();
    ipAddressHeader.innerHTML = 'IP Address ▼';
    sortTable('ipaddress');
  });

  renderTable();
  fetchData();


  
});

  