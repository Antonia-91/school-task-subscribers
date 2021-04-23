let loginPassword = document.querySelector("#loginPassword");
let username = document.querySelector("#userName");

const submit = document.querySelector("#submit-login");
const logOut = document.querySelector("#submit-logOut");

submit.addEventListener("click", () => {
  adminInfo = {
    userName: username.value,
    password: loginPassword.value,
  };
  getAdminInfo(adminInfo);
});

function subscriberInfo() {
  console.log("subscribers");
}

//--------------  EndPoint call --------------- //
function getAdminInfo(admininfo) {
  fetch("https://awesome-pictures.herokuapp.com/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(admininfo),
  })
    .then((res) => res.json())
    .then((admin) => {
      console.log(admin);
      if (admin.isUserFound) {
        getUsers();
      }
      // printAdminInfo(users)
    })
    .catch((err) => console.log(err));
}

function getUsers() {
  fetch("https://awesome-pictures.herokuapp.com/users")
    .then((res) => res.json())
    .then((users) => {
      printAdminInfo(users);
      //console.log(users);
    })
    .catch((err) => console.log(err));
}

//--------------  GLOBAL EVENTLISTENERS --------------- //
window.addEventListener("click", (e) => {
  if (e.target.matches("#submit-logOut")) {
    printLoginForm();
  }
});

//--------------  DOM functions --------------- //
function printAdminInfo(users) {
  document.querySelector(".main-content").innerHTML = "";

  let newArray = users.map((user) => {
    return user.email;
  });
  console.log(newArray);
  let output = newArray.join(" ");
  console.log(output);

  let listTamplate = `
          <div class="login-wrapper">
          <div class="admin form">
            <div>
              <h1>Admin</h1>
              <p>SUBSCRIBERS  = <i class="fa fa-check-circle" aria-hidden="true"></i></p>
            </div>
            <div>
              <ul class="subscribers">
              ${users.map((user) => {
                return `<li>${user.email} ${
                  user.subscribed
                    ? `<i class="fa fa-check-circle" aria-hidden="true"></i>`
                    : ""
                }</li>`;
              })}
              </ul>
              <input
            type="button"
            value="LogOut"
            class="submit-btn"
            id="submit-logOut"
          />
         
            
        </div>
          `;

  document
    .querySelector(".main-content")
    .insertAdjacentHTML("beforeend", listTamplate);
}

// ${users.map((user) => {
//   console.log(user.email);
//   return ` <li>${user.email}</li> `;
// })}

function printLoginForm() {
  document.querySelector(".main-content").innerHTML = "";

  let listTamplate = `
    <div class="login-wrapper" id="login-div">
    <form action="" class="form">
      <h2>Admin login</h2>

      <div class="input-group">
        <input type="text" name="userName" id="userName" required />
        <label for="userName">User Name</label>
      </div>
      <div class="input-group">
        <input
          type="password"
          name="loginPassword"
          id="loginPassword"
          required
        />
        <label for="loginPassword">Password</label>
      </div>

      <input
        type="button"
        value="Login"
        class="submit-btn"
        id="submit-login"
      />
      <a href="#forgot-pw" class="forgot-pw">Forgot Password?</a>
    </form>
  </div>
    `;

  document
    .querySelector(".main-content")
    .insertAdjacentHTML("beforeend", listTamplate);
}
