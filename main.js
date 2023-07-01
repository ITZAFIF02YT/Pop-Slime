// Firebase setup
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Inisialisasi jumlah pop
let popCount = 0;

// Fungsi untuk memainkan suara "pop"
function playPopSound() {
  const popSound = document.getElementById("pop-sound");
  popSound.currentTime = 0;
  popSound.play();
}

// Fungsi untuk menampilkan animasi slime
function showPopAnimation() {
  const gameContainer = document.getElementById("game-container");
  const popAnimation = document.createElement("div");
  popAnimation.classList.add("pop-animation");
  gameContainer.appendChild(popAnimation);
  setTimeout(() => {
    gameContainer.removeChild(popAnimation);
  }, 500);
}

// Fungsi ketika tombol "Pop Slime" dipencet
function popSlime() {
  playPopSound();
  showPopAnimation();
  popCount++;

  // Simpan jumlah pop ke Firebase (jika dibutuhkan)
  // Misalnya: db.collection("leaderboard").doc("popCount").set({ count: popCount });
}

