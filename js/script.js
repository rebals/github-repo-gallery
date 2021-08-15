//profile information will appear//
const overview = document.querySelector(".overview");
//github username
const username = "rebals";
//repo list
const repoList = document.querySelector(".repo-list");
//class with repo informtion
const repoInformation = document.querySelector(".repos");
// Repo data
const repoData = document.querySelector(".repo-data");


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
    repoDisplay(repoData);
};

displayRepos();

const repoDisplay = function(repos){
    for (const repo of repos) {
    const li = document.createElement ("li");
    li.classList.add("repos");
    li.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(li);
    }
};

repoList.addEventListener("click", function(e){
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        specificRepoInfo(repoName);
    }
});

const specificRepoInfo = async function(repoName){
    const specificRepo = await fetch (`https:api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await specificRepo.json();
    console.log(repoInfo);

    const fetchLanguages = await fetch (repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    console.log(languageData);

    const languages = [];
    for (const language in languageData){
        languages.push(language);
    }

    displaySpecificRepo(repoInfo,languages);
};


const displaySpecificRepo = function(repoInfo,languages) {
    repoData.innerHTML = "";
    repoData.classList.remove("hide");
    repoInformation.classList.add("hide");
    const repoDivElement = document.createElement ("div");
    repoDivElement.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `;
    repoData.append(repoDivElement);
};