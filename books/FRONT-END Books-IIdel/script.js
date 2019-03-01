function romanize(num) {
    var lookup = {
            M: 1000,
            CM: 900,
            D: 500,
            CD: 400,
            C: 100,
            XC: 90,
            L: 50,
            XL: 40,
            X: 10,
            IX: 9,
            V: 5,
            IV: 4,
            I: 1
        },
        roman = '',
        i;
    for (i in lookup) {

        while (num >= lookup[i]) {


            roman += i;
            num -= lookup[i];
        }
    }
    return roman;
}

let page = 1;
let itemsPerPage = 10;
let totalItemsInPage = 0;
let array1 = [];
let array2 = [];

books = [];
async function fetchData() {
    return fetch('https://raw.githubusercontent.com/sedc-codecademy/sedc5-frontend-exam/master/books.json')
        .then(response => response.json())
        .catch(error => {
            console.log(error);
            books = [];
        })
}

async function unitLoad() {
    let data = await fetchData();
    if (data.length) {
        books = data;
        console.log(books);
    }

    displayBooks(books);
}

function displayBooks(books) {
    let newBooks = books;

    let tbody = document.getElementById('tbody');
    tbody.innerHTML = "";


    for (let i in newBooks) {

        // if ((i >= (page - 1) * itemsPerPage) && (i < page * itemsPerPage)) 

        let tr = document.createElement("tr");
        tbody.appendChild(tr);

        let tdId = document.createElement('td');
        tdId.innerHTML = parseInt(i) + 1;
        tr.appendChild(tdId);


        let tdTitle = document.createElement('td');
        tdTitle.innerHTML = `${newBooks[i].title}`
        tr.appendChild(tdTitle);


        if (newBooks[i].kind === "novel") {
            let tdAuthor = document.createElement('td');
            tdAuthor.innerHTML = `${newBooks[i].author}`
            tr.appendChild(tdAuthor);
        } else {
            let tdAuthor = document.createElement('td');
            tdAuthor.innerHTML = `${newBooks[i].editor}`
            tr.appendChild(tdAuthor);
        }

        let tdPublication = document.createElement('td');
        tdPublication.innerHTML = `${newBooks[i].year} (${newBooks[i].publisher})`;
        tr.appendChild(tdPublication);

        let tdLength = document.createElement('td');
        tdLength.innerHTML = `${newBooks[i].length}`;

        tr.appendChild(tdLength);

        tdSerie = document.createElement('td');
        tr.appendChild(tdSerie);
        let ul = document.createElement('ul');
        tdSerie.appendChild(ul);

        if (newBooks[i].hasOwnProperty('series')) {

            let li = document.createElement('li');
            li.innerHTML = `${newBooks[i].series} (#${newBooks[i].seriesNumber}) ${romanize(newBooks[i].seriesNumber)}`;
            ul.appendChild(li);

        }

        if (newBooks[i].kind === "anthology") {
            array1.push(newBooks[i]);
            //console.log(array1);

        }
        let tdDelete = document.createElement('td');
        tdDelete.innerHTML = `<button onclick="deleteBook(${i})">Delete</button>`;

        tr.appendChild(tdDelete);



    }



}

function deleteBook(index) {


    // books.splice(index, 1);
    // displayBooks(books);

    books.shift(books[index], index);
    displayBooks(books);

}

let idNumber = document.querySelectorAll('#tbody >tr >td');
console.log(idNumber);

let sortId = false;
let sortTitle = false;

function sortById() {

    let trId = document.querySelectorAll("#tbody > tr");
    let idSort = [];

    for (let i = 0; i < trId.length; i++) {
        let child = trId[i].children;

        idSort.push(parseInt(child[0].textContent));

    }
    //console.log(idSort);

    idSort.sort((a, b) => {
        if (a < b) return 1;
        if (a > b) return -1;
        return 0;
    });

    sortId = !sortId;

    if (sortId === false)
        idSort.reverse();


    for (let i = 0; i < trId.length; i++) {
        let child = trId[i].children;
        console.log(child[0].innerHTML)
        for (let i = 0; i < idSort.length; i++) {
            child[0].innerHTML = `${idSort[i]}`;
            idSort.shift();
            break;
        }

    }



}

function sortByTitle() {

    let newBooks = books;

    // newBooks = newBooks.sort((a, b) => {
    //     if (a.title < b.title) return -1
    //     if (a.title > b.title) return 1
    //     return 0;

    // })
    // sortTitle = !sortTitle;
    // if (sortTitle === true) {
    //     newBooks.reverse();

    // }
    // displayBooks(newBooks);

    let array = [];
    for (let i in newBooks) {
        let tdTitle = document.createElement('td');
        tdTitle.innerHTML = `${newBooks[i].title}`
        array.push(`${newBooks[i].title}`);
    }
    console.log(array);

    array.sort((a, b) => {
        if (a < b) return -1;
        if (a > b) return -1
        return 0;
    });
   
    if(sortTitle === true){
        array.reverse();

        sortTitle = !sortTitle;

    }

   

}



unitLoad();