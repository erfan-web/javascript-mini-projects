const usersList = document.querySelector(".user__list");
const input = document.querySelector("input");
const btn = document.querySelector("button");

async function fetchUsers() {
  try {
    usersList.innerHTML = `<p>loading...</p>`;
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    console.log(res);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const users = await res.json();
    return users;
  } catch (err) {
    console.log(err);
    usersList.innerHTML = `<p>There is no internet connection </p>`;
    return null;
  }
}

window.onload = async () => {
  const users = await fetchUsers();
  if (users.length > 0) usersList.innerHTML = generateUserItem(users);
  else usersList.innerHTML = `<p>No users found</p>`;

  btn.addEventListener("click", () => {
    const filtered = users.filter(
      (user) =>
        user.username.toLowerCase().startsWith(input.value.toLowerCase()) ||
        user.name.toLowerCase().startsWith(input.value.toLowerCase())
    );
    if (filtered.length > 0) usersList.innerHTML = generateUserItem(filtered);
    else usersList.innerHTML = `<p>user not found</p>`;
  });

  function generateUserItem(users) {
    let usersString = ``;
    users.map((user) => {
      usersString += `
      <div class="user__item">
        <p><b>fullname: </b> ${user.name}</p>
        <p><b>username: </b> ${user.username}</p>
        <p><b>email: </b> ${user.email}</p>
      </div>
    `;
    });
    return usersString;
  }
};
