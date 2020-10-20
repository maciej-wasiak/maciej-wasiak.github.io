import '../scss/main.scss';

// uncomment the lines below to enable PWA
// import {registerSW} from './pwa.js';
// registerSW();

/* place your code below */


function addProject(title, description, demoUrl, githubUrl) {
    const projects = document.querySelector('.projects__container--js');
    let content = `
    <article class="project">
        <div class="project__titlebar">• • •</div>
        <img class="project__github-logo" src="github.svg" alt="github-logo"/>
        <div class="project__content">
            <span>project:</span>
            <span class="project__content--title">${title}</span>
            <span>description:</span>
            <span class="project__content--description">${description}</span>
            <span>demo:</span>
            <span class="project__content--demo"><<a href="${demoUrl}">link</a>></span>
            <span>github:</span>
            <span class="project__content--github"><<a href="${githubUrl}">link</a>></span>
        </div>
    </article>
    `;
    projects.innerHTML += content;
}

// addProject('bla', 'ble', 'bli', 'blo');

fetch('https://api.github.com/users/maciej-wasiak/repos?sort=created')
    .then(resp => resp.json())
    .then(resp => {
        resp = resp.filter(e => e['name'] != 'maciej-wasiak.github.io');
        if(resp.length > 4){
            for (let i = 0; i < 4; i++) {
                const {name, html_url, description} = repo;
                addProject(name, description, `https://maciej-wasiak.github.io/${name}`, html_url);
            }
        } else {
            for (let repo of resp) {
                const {name, html_url, description} = repo;
                addProject(name, description, `https://maciej-wasiak.github.io/${name}`, html_url);
            }
        }
    })
    .catch(error => {
        console.log(`Error - API: ${error}`);
    })