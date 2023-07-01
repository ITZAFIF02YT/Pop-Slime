// Konfigurasi Firebase
var firebaseConfig = {
    // Masukkan konfigurasi Firebase Anda di sini
  };
  
  // Inisialisasi Firebase
  firebase.initializeApp(firebaseConfig);
  var database = firebase.database();
  
  // Referensi database leaderboard
  var leaderboardRef = database.ref('leaderboard');
  
  // Inisialisasi jumlah pop dan pemenang
  var popCount = 0;
  var winner = '';
  
  // Mendapatkan jumlah pop dari database
  leaderboardRef.child('popCount').once('value', function(snapshot) {
    popCount = snapshot.val();
    updatePopCountDisplay();
  });
  
  // Mendapatkan pemenang dari database
  leaderboardRef.child('winner').once('value', function(snapshot) {
    winner = snapshot.val();
    updateWinnerDisplay();
  });
  
  // Fungsi untuk mempop slime
  function popSlime() {
    var slimeElement = document.getElementById('slime');
    
    // Animasi pop slime
    slimeElement.style.animation = 'popAnimation 3.5s';
    slimeElement.addEventListener('animationend', function() {
      slimeElement.style.animation = '';
    });
    
    // Menambahkan suara pop
    var audio = new Audio('pop.wav');
    audio.play();
    
    // Mengupdate jumlah pop dan pemenang
    popCount++;
    if (popCount > leaderboardRef.child('popCount')) {
      leaderboardRef.child('popCount').set(popCount);
      winner = 'Player';
      leaderboardRef.child('winner').set(winner);
      updateWinnerDisplay();
    }
    updatePopCountDisplay();
  }
  
  // Mengupdate tampilan jumlah pop
  function updatePopCountDisplay() {
    document.getElementById('pop-count').innerHTML = popCount;
  }
  
  // Mengupdate tampilan pemenang
  function updateWinnerDisplay() {
    document.getElementById('winner').innerHTML = winner;
  }
  