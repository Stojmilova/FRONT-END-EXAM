let bands = [];
let counter;
let typesOfAlbums = [];
let min, max, result
let yearsOfActive = [];


async function fetchData() {
    return fetch('https://raw.githubusercontent.com/sedc-codecademy/sedc6-frontend-exam/master/band-data.json')
        .then(response => response.json())
        .catch(error => {
            console.log(error)
            let bands = [];
        })
}

async function initLoad() {
    let data = await fetchData();
    console.log(data);
    if (data && data.length) {
        bands = data;
    }
    dropDownBands(bands);
    generateTypesOfAlbums(bands)
}

let select = document.getElementById('dropdown');
select.addEventListener('change', function (event) {
    filterByName(event.target.value);
})

function dropDownBands() {
    let newBands = bands;
    let select = document.getElementById('dropdown');

    newBands = bands.forEach(band => {
        let option = document.createElement('option');
        option.setAttribute('value', `${band.name}`);
        option.innerHTML = `${band.name}`;
        select.appendChild(option);

    });
}

function renderBands(bandsArray) {

    let tbody = document.getElementById('body');
    tbody.innerHTML = '';
    let tr = document.createElement('tr');
    tbody.appendChild(tr);

    //Past members:

    counter = 0;
    let tdPastMembers = document.createElement('td');

    bandsArray.forEach(band => band.members.forEach(member => {

        let ul = document.createElement('ul');
        if (member.former === true) {
            let li = document.createElement('li');
            li.innerHTML = `${member.name}`;
            ul.appendChild(li);


        }
        tdPastMembers.appendChild(ul);
        counter++;
    }));
    tr.appendChild(tdPastMembers);

    //Album summary:

    counter = 0;
    let tdTypeAlbum = document.createElement('td');
    for (let i = 0; i < typesOfAlbums.length; i++) {
        bandsArray.forEach(band => band.albums.forEach(x => {
            if (typesOfAlbums[i] === x.type) {
                counter++;
            }
        }))
        let ulAlbums = document.createElement('ul');
        let liAlbums = document.createElement('li');
        liAlbums.innerHTML = `Type:${typesOfAlbums[i]}:${counter}`;
        ulAlbums.appendChild(liAlbums);
        tdTypeAlbum.appendChild(ulAlbums);

    }
    tr.appendChild(tdTypeAlbum);

    //Years active:

    //Chronological list of albums:
    counter = 0;
    let tdListOfAlbums = document.createElement("td");
    bandsArray.forEach(band => band.albums.forEach((album, i) => {
        let ulListOfAlbums = document.createElement('ul');
        let liOfAlbums = document.createElement('li');
        liOfAlbums.innerHTML = `${i.name}${album.year}`;
        ulListOfAlbums.appendChild(liOfAlbums);
        counter++

    }))
    tr.appendChild(tdListOfAlbums);

}

function filterByName(nameOfBand) {
    let newBands = bands;
    if (nameOfBand !== "") {
        newBands = bands.filter(band => band.name.indexOf(nameOfBand) !== -1);

    }
    renderBands(newBands);

}

function generateTypesOfAlbums(newBands) {

    newBands.forEach(band => band.albums.forEach(album => {
        typesOfAlbums.push(album.type);

    }))
    typesOfAlbums = [...new Set(typesOfAlbums)];
    console.log(typesOfAlbums);


    newBands.forEach(band => band.albums.forEach(album => {
        yearsOfActive.push(album.year);
    }));
    yearsOfActive = [...new Set(yearsOfActive)];
    console.log(yearsOfActive);

    
    yearsOfActive.sort((a, b) => {
        if (a.year > b.year) return 1;
        if (a.year < b.year) return -1;
        return 0;
    })
    console.log(yearsOfActive);

    min = yearsOfActive[0];
    max = yearsOfActive[yearsOfActive.length - 1];
    result = max - min;
    //console.log(result);

}
initLoad();