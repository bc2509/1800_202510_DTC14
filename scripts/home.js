function insertNameFromFirestore() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log(user.uid);
      const currentUser = db.collection("users").doc(user.uid);
      currentUser.get().then((userDoc) => {
        let userName = userDoc.data().name;
        console.log(userName);
        document.getElementById("name-goes-here").innerHTML = userName;
      });
    } else {
      console.log("No user is logged in.");
    }
  });
}

function profileSetting() {
  const profileIcon = document.getElementById("profile-icon");
  const profileMenu = document.getElementById("profile-menu");

  // Toggle menu visibility
  profileIcon.addEventListener("click", function () {
    profileMenu.classList.toggle("hidden");
  });

  // Close the menu if clicked outside
  window.addEventListener("click", function (event) {
    if (
      !profileIcon.contains(event.target) &&
      !profileMenu.contains(event.target)
    ) {
      profileMenu.classList.add("hidden");
    }
  });
}
function logout() {
  const logoutBtn = document.getElementById("logout-btn");
  logoutBtn.addEventListener("click", function () {
    auth
      .signOut()
      .then(() => {
      
                console.log("User logged out successfully");

      })
      .catch((error) => {
        console.error("Error logging out: ", error);
      });
  });
}

function sideNavbar() {
  sideNav = document.querySelector(".side-nav");
  sideNavButtons = document.querySelector(".nav-buttons");

  // Add a mouseenter event listener to trigger on hover
  sideNavButtons.addEventListener("mouseenter", () => {
    sideNav.classList.add("w-48");
  });

  sideNavButtons.addEventListener("mouseleave", () => {
    sideNav.classList.remove("w-48");
  });
}

function home() {
  profileSetting();
  sideNavbar();
  logout();
}

function setup() {
  insertNameFromFirestore();
  home();

  // const postBtn = document.getElementById("post-btn");
  // if (postBtn) {
  //   postBtn.addEventListener("click", () => {
  //     console.log("Post button clicked!");
  //   });
  // } else {
  //   console.error("post-btn not found in the DOM");
  // }
}

document.addEventListener("DOMContentLoaded", setup);
