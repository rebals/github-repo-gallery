//profile information will appear//
const overview = document.querySelector(".overview");
//github username
const username = "rebals";
//repo list
const repoList = document.querySelector(".repo-list");

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

const displayRepos = async function(){
    const repoRes = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await repoRes.json();
    // console.log(repoData);
    repoInfo(repoData);
}

displayRepos();

const repoInfo = function(repos){
    for (const repo of repos) {
    const li = document.createElement ("li");
    li.classList.add("repos");
    li.innerHTML =`<h3>${repo.name}</h3>`;
    repoList.append(li);
    };
};