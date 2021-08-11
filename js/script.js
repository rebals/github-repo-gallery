//profile information will appear//
const overview = document.querySelector(".overview");
//github username
const username = "rebals";

const githubProfile = async function (){
    const response = await fetch (`https://api.github.com/users/${username}`);
    const data = await response.json();
    // console.log(data);

    displayUserInfo(data);
};

githubProfile();

const displayUserInfo = function (data) {
    const userInfoDiv = document.createElement("div");
    userInfoDiv.classList.add("user-info");
    userInfoDiv.innerHTML = `
        <figure>
            <img alt="user avatar" src=${data.avatar_url} />
        </figure>
        <div>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Bio:</strong> ${data.bio}</p>
            <p><strong>Location:</strong> ${data.location}</p>
            <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
        </div>
    `;
    overview.append(userInfoDiv);
};