// Konfigurasi Firebase
var firebaseConfig = {
    apiKey: "AIzaSyDmBt1IctbOEK46UoPX7_jG7rYN91Bz5Uw",
    authDomain: "pop-slime-game.firebaseapp.com",
    projectId: "pop-slime-game",
    storageBucket: "pop-slime-game.appspot.com",
    messagingSenderId: "362362979820",
    appId: "1:362362979820:web:4b4f595c8248bd1f83acc9"
};

// Inisialisasi Firebase
firebase.initializeApp(firebaseConfig);

// Fungsi untuk menambah jumlah pop saat popcat diklik
function popCat() {
    var user = firebase.auth().currentUser;
    if (user) {
        var popRef = firebase.database().ref("popCount/" + user.uid);
        popRef.transaction(function(popCount) {
            return (popCount || 0) + 1;
        });
    }
    document.getElementById("popcat").classList.remove("animate-pop");
    void document.getElementById("popcat").offsetWidth; // Memaksa browser melakukan reflow
    document.getElementById("popcat").classList.add("animate-pop");
    playPopSound(); // Memainkan efek suara pop
}

// Fungsi untuk memainkan efek suara pop
function playPopSound() {
    var audio = document.getElementById("popSound");
    audio.play();
}

// Fungsi untuk mendapatkan jumlah pop dari Firebase Realtime Database
function getPopCount(callback) {
    var popRef = firebase.database().ref("popCount");
    popRef.once("value").then(function(snapshot) {
        if (snapshot.exists()) {
            callback(snapshot.val());
        } else {
            callback({});
        }
    });
}

// Fungsi untuk menampilkan leaderboard
function displayLeaderboard() {
    var leaderboardList = document.getElementById("leaderboardList");
    leaderboardList.innerHTML = ""; // Bersihkan isi leaderboard sebelum memuat yang baru

    // Mengambil leaderboard dari Firebase Realtime Database
    var leaderboardRef = firebase.database().ref("leaderboard");
    leaderboardRef.orderByValue().limitToLast(5).on("value", function(snapshot) {
        leaderboardList.innerHTML = ""; // Bersihkan isi leaderboard sebelum memuat yang baru
        snapshot.forEach(function(childSnapshot) {
            var uid = childSnapshot.key;
            var popCount = childSnapshot.val();
            // Mengambil informasi akun pengguna dari Firebase Authentication
            firebase.auth().getUser(uid).then(function(user) {
                var listItem = document.createElement("li");
                listItem.innerHTML = "<span>" + user.displayName + "</span>: <span>" + popCount + " pop</span>";
                leaderboardList.appendChild(listItem);
            }).catch(function(error) {
                console.error(error);
            });
        });
    });
}

// Fungsi untuk mengumumkan pemenang pop terbanyak pada tanggal 1 Januari
var today = new Date();
if (today.getMonth() === 0 && today.getDate() === 1) {
    announceWinner();
}

// Fungsi untuk mengumumkan pemenang pop terbanyak
function announceWinner() {
    // Mengambil leaderboard dari Firebase Realtime Database
    var leaderboardRef = firebase.database().ref("leaderboard");
    leaderboardRef.orderByValue().limitToLast(1).once("value").then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var uid = childSnapshot.key;
            var popCount = childSnapshot.val();
            // Mengambil informasi akun pengguna dari Firebase Authentication
            firebase.auth().getUser(uid).then(function(user) {
                alert("Pemenang Pop Terbanyak: " + user.displayName + " (" + popCount + " pop)");
            }).catch(function(error) {
                console.error(error);
            });
        });
    });
}

// Reset jumlah pop pada tanggal 2 Januari
if (today.getMonth() === 0 && today.getDate() === 2) {
    var popRef = firebase.database().ref("popCount");
    popRef.remove();
}
