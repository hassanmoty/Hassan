// بيانات Firebase من مشروعك
const firebaseConfig = {
  apiKey: "AIzaSy************",
  authDomain: "your-app.firebaseapp.com",
  databaseURL: "https://your-app.firebaseio.com",
  projectId: "your-app",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdefg"
};

// تهيئة Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();

// تسجيل الدخول
function login() {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, pass)
    .then(() => {
      document.getElementById("login-form").style.display = "none";
      document.getElementById("shop").style.display = "block";
      loadProducts();
    })
    .catch(err => alert("خطأ: " + err.message));
}

// إنشاء حساب
function register() {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;

  auth.createUserWithEmailAndPassword(email, pass)
    .then(() => alert("تم إنشاء الحساب بنجاح"))
    .catch(err => alert("خطأ: " + err.message));
}

// تسجيل الخروج
function logout() {
  auth.signOut().then(() => {
    document.getElementById("login-form").style.display = "block";
    document.getElementById("shop").style.display = "none";
  });
}

// تحميل المنتجات من Firebase
function loadProducts() {
  const container = document.getElementById("product-list");
  container.innerHTML = "<p>تحميل...</p>";

  db.ref("products").once("value", snapshot => {
    const data = snapshot.val();
    container.innerHTML = "";

    for (let key in data) {
      const prod = data[key];
      container.innerHTML += `<div><h3>${prod.name}</h3><p>${prod.price} جنيه</p></div>`;
    }
  });
}
