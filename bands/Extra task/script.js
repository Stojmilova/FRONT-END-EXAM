// Create an additional web page using the same data, but with the following format:
// The list of bands is offered in a dropdown. Once a band is selected, the data about the band is shown from the list is shown,
// along with:

// List of past members
// Album summary (How many albums of each type the band has issued)
// Years active
// Chronological list of albums
// It would be ideal if this page shares the code with the list page, i.e.you don't copy and paste the code twice;

let bands = [];
let nameOfBands = [];
let counter;
let typesOfAlbums = [];
let album;
let yearsOfActive = [];
let min;
let max;
let result;
let sort = [];

let select = document.getElementById('dropdown');
select.addEventListener('change', function (event) {
    filterByName(event.target.value);
})

async function fetchData() {
    return fetch("https://raw.githubusercontent.com/sedc-codecademy/sedc6-frontend-exam/master/band-data.json")
        .then(response => response.json())
        .catch(error => {
            console.log(error);
            bands = [];
        })

}
async function initLoad() {
    let data = await fetchData()
    console.log(data);
    if (data && data.length) {
        bands = data;
    }
    dropDownBands();
    renderBands();


}

function dropDownBands() {
    let newBands = bands;

    let div = document.getElementById('list');
    let select = document.getElementById('dropdown');
    div.appendChild(select);

    for (let band in newBands) {
        let option = document.createElement('option');
        option.setAttribute('value', `${newBands[band].name}`);
        option.innerHTML = `${newBands[band].name}`;
        select.appendChild(option);
    }
    // Drug nacin so forEach:

    /* newBands = bands.forEach(band => {
        let option = document.createElement('option');
        option.setAttribute('value', `${band.name}`);
        option.innerHTML = `${band.name}`;
        select.appendChild(option);

    }); */


}

function renderBands(bandsArray) {

    let tbody = document.getElementById('body');
    tbody.innerHTML = "";
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

    let tdYear = document.createElement('td');
    tdYear.innerHTML = `Active:${result}`;
    tr.appendChild(tdYear);

    //Chronological list of albums:

    let tdSort = document.createElement('td');
    let ulSort = document.createElement('ul');

   
    newBands.forEach(band => band.albums.forEach(album => {
        yearsOfActive.push(album.year, i);
        let liSort = document.createElement('li');
        liSort.innerHTML = `Name:${yearsOfActive[i].name},year:${sort.year}`;
        ulSort.appendChild(liSort);
    }))
    tdSort.appendChild(ulSort);
    tr.appendChild(tdSort);

}

function filterByName(nameOfBand) {

    let newBands = bands;
    if (nameOfBand !== "") {

        newBands = bands.filter((x) => x.name.indexOf(nameOfBand) !== -1);

    } else if (nameOfBand === "") {
        newBands = [];
    }
    generateTypeAndYears(newBands);
    renderBands(newBands);

}

function generateTypeAndYears(newBands) {

    newBands.forEach(band => band.albums.forEach(album => {
        typesOfAlbums.push(album.type);
        //console.log(typesOfAlbums);
    }))
    typesOfAlbums = [...new Set(typesOfAlbums)];
    console.log(typesOfAlbums);


    newBands.forEach(band => band.albums.forEach(album => {
        yearsOfActive.push(album.year);
        //console.log(yearsOfActive);
    }))
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