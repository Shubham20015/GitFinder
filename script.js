const searchBtn = document.querySelector(".btn");
const userName = document.querySelector(".username");
const headerName = document.querySelector(".headerName");
const github = document.querySelector(".github_link");
const joinedAt = document.querySelector(".joinedDate");
const bio = document.querySelector("#bio");
const repos = document.querySelector(".repo_count");
const followers = document.querySelector(".follower_count");
const followings = document.querySelector(".following_count");
const liveAt = document.querySelector(".locationName");
const twitterHandle = document.querySelector(".twitterName");
const website = document.querySelector(".websiteName");
const companyName = document.querySelector(".companyName");
const userDP = document.querySelector(".userPic");

searchBtn.addEventListener("click", () => {
  if (userName.value == "") return null;
  else {
    fetchUser(userName.value);
    userName.value = "";
  }
});

userName.addEventListener("keyup", (event) => {
  if (event.key == "Enter") {
    if (userName.value == "") return null;
    else {
      fetchUser(userName.value);
      userName.value = "";
    }
  }
});

const fetchUser = (userName) => {
  fetch(`https://api.github.com/users/${userName}`)
    .then((response) => {
      if (!response.ok) {
        alert("No user found.");
      }
      return response.json();
    })
    .then((data) => displayUser(data))
    .catch((error) => console.log(error));
};

const displayUser = (data) => {
  userDP.src = data.avatar_url;
  headerName.innerText = data.name || data.login;
  github.innerText = `@${data.login}`;
  github.href = data.html_url;
  repos.innerText = data.public_repos;
  followers.innerText = data.followers;
  followings.innerText = data.following;
  joinedAt.innerText = `Joined ${dateformat(data.created_at) || "At nothing"}`;

  null_checker(liveAt, data.location);
  null_checker(twitterHandle, data.twitter_username);
  null_checker(website, data.blog);
  null_checker(companyName, data.company);

  if (data.bio) {
    bio.innerHTML = `<p>${data.bio}<p>`;
    bio.classList.remove("null_value");
  } else {
    bio.innerHTML = `<p>This profile has no bio<p>`;
    bio.classList.add("null_value");
  }
};

const dateformat = (date) => {
  var options = { year: "numeric", month: "short", day: "numeric" };
  var today = new Date(date);
  return today.toLocaleDateString("en-US", options);
};

const null_checker = (tag, value) => {
  if (value) {
    tag.innerHTML = value;
    tag.parentElement.classList.remove("null_value");
  } else {
    tag.innerHTML = `Not Available`;
    tag.parentElement.classList.add("null_value");
  }
};

// Theme switcher

let themeSwitch = document.querySelector(".theme-changer");
let mode = true;

let trans = () => {
  document.documentElement.classList.add("transition");
  window.setTimeout(() => {
    document.documentElement.classList.remove("transition");
  }, 1000);
};

themeSwitch.addEventListener("click", function () {
  trans();
  if (mode) {
    document.documentElement.setAttribute("data-theme", "dark");
    themeSwitch.innerHTML = `
                                <h3>LIGHT</h3>
                                <i class="fas fa-sun"></i>
    `;
    mode = false;
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    themeSwitch.innerHTML = `
                                <h3>DARK</h3>
                                <i class="fas fa-moon"></i>
    `;
    mode = true;
  }
});
