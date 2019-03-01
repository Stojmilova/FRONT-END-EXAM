/*
When opening the page, the user will be presented with a list of bands. The list will have at most 10 items2. 
The list will contain the following fields:

Row number
Name of the band
Visual indication if the band is active
Comma-separated list of tags
List of current band members (each on a separate line)
Total number of albums

The columns: Name and Total number of albums should be sortable
Initially the data will not be sorted, clicking on the Name header should sort the data ascendingly by name,
and clicking on the Albums header should sort the data descendingly by album count. Clicking on an already
sorted header should invert the sort order. The current sort order must be indicated somehow.

Above and below the list there should be a panel with the following controls:

Search box that allow the user to filter the bands by name
Tag dropdown that will be filled by all the available tags3 that will make the list only show bands that have that tag
A checkbox that will make the list to only show active bands
Paging controls, if needed.
*/

let bands = [];
let page = 1;
let totalPage = 0;
let itemForPage = 10;
let sortName = false;
let sortAlbums = false;
let searchString;
let tagsArray = [];
let chechArray = [];


let input = document.getElementById('name');
input.addEventListener('keyup', function (event) {
    searchString = event.target.value;
});

let select = document.getElementById('select');
select.addEventListener('change', function (event) {

    filterByTag(event.target.value);

});

let active = document.querySelector(".active");
active.addEventListener('change', function (event) {
    if (event.target.checked) {
        checkedActive();
    } else {
        chechArray = [];
        pagination(bands);
        renderBands(bands);
    }
});


async function fetchData() {
    return fetch('https://raw.githubusercontent.com/sedc-codecademy/sedc6-frontend-exam/master/band-data.json')
        .then(response => response.json())
        .catch(error => {
            console.log(error);
            bands = [];
        })

}
async function unitLoad() {
    let data = await fetchData();
    if (data && data.length) {
        bands = data;
        console.log(bands);
    }
    generatetags(bands)
    pagination(bands);
    renderBands(bands);
}

function renderBands(bands) {

    let newBands = bands;
    let tBody = document.getElementById('body');
    tBody.innerHTML = '';

    for (let i in newBands) {

        if (i >= ((page - 1) * itemForPage) && i < (page * itemForPage)) {


            let tr = document.createElement('tr');
            tBody.appendChild(tr);

            let tdRow = document.createElement('td');
            tdRow.innerHTML = parseInt(i) + 1;
            tr.appendChild(tdRow);

            let tdName = document.createElement('td');
            tdName.innerHTML = `${newBands[i].name}`
            tr.appendChild(tdName);

            let tdActive = document.createElement('td');
            if (newBands[i].active === true) {
                tdActive.setAttribute('style', "background-color:green")
                tdActive.innerHTML = `${true}`;
            } else if (newBands[i].active === false) {
                tdActive.setAttribute('style', "background-color:red")
                tdActive.innerHTML = `${false}`;

            }
            tr.appendChild(tdActive);

            let tdTags = document.createElement('td');
            tdTags.innerHTML = newBands[i].tags.join();
            tr.appendChild(tdTags);

            tdMember = document.createElement('td');
            let ul = document.createElement('ul');

            newBands[i].members.forEach(member => {
                if (!member.former || member.former === false) {
                    let li = document.createElement('li');
                    li.innerHTML = `${member.name}`;
                    ul.appendChild(li);

                }
                tdMember.appendChild(ul);
                tr.appendChild(tdMember);

            });

            let tdAlbums = document.createElement('td');
            tdAlbums.innerHTML = `${newBands[i].albums.length}`;
            tr.appendChild(tdAlbums);
        }

    }

}

function pagination(bands) {

    let newBands = bands;

    totalPage = Math.ceil(newBands.length / itemForPage);

    let div = document.querySelector('.page');
    div.innerHTML = "";
    for (let i = 0; i < totalPage; i++) {
        let span = document.createElement("span");
        span.setAttribute('class', "page-item")
        span.innerHTML = `<a onclick ="changePage(${i+1})">${i+1}<a/>`
        div.appendChild(span);

    }
}

function changePage(pageNumber) {

    let newBands = bands;
    page = pageNumber;
    renderBands(newBands);

    if (chechArray.length) {
        renderBands(chechArray);
    }
}


function sortByName() {
    page = 1;

    let newBands = bands;
    newBands.sort((a, b) => {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
    })
    
    if (sortName === true) {
        newBands.reverse();
    }
    sortName = !sortName;

    renderBands(newBands);
    pagination(bands);
}

function sortByAlbums() {

    page = 1;
    let newBands = bands;
    newBands.sort((a, b) => {
        if (a.albums.length > b.albums.length) return 1;
        if (a.albums.length < b.albums.length) return -1;
        return 0;
    })
    
    sortAlbums = !sortAlbums;
    if (sortAlbums === true) {
        newBands.reverse();
    }
    

    renderBands(newBands);
    pagination(bands);

}

function searchName() {

    let newBands = bands.filter(band => band.name.toLowerCase().match(searchString));

    page = 1;
    pagination(newBands);
    renderBands(newBands);

}
let button = document.getElementById("search");
button.addEventListener('click', searchName);

function generatetags() {
    let newBands = bands;
    newBands.forEach(band => band.tags.forEach(tag => {
        tagsArray.push(tag);
    }))
    tagsArray = [...new Set(tagsArray)];
    console.log(tagsArray);


    for (let i = 0; i < tagsArray.length; i++) {
        let option = document.createElement('option');
        option.innerHTML = tagsArray[i];
        select.appendChild(option);

    }
}

function filterByTag(tagName) {

    let newBands = bands.filter(band => band.tags.indexOf(tagName) !== -1);
    page = 1;
    pagination(newBands);
    renderBands(newBands);
}

function checkedActive() {
    let newBands = bands;

    newBands.forEach(band => {
        if (band.active === true) {
            chechArray.push(band);
        }
    });

    pagination(chechArray);
    renderBands(chechArray);
}


unitLoad()