let novels = [];

function displayNovel() {
    let novel = document.getElementById('display-Novel');
    if (novel.checked) {
        let formForNovel = document.getElementById('novel');
        formForNovel.setAttribute('style', `display:block`);
        let formForAnthology = document.getElementById('anthology');
        formForAnthology.setAttribute('style', `display:none`);

        let select = document.getElementById('publisher');
        let arrayOfPublisher = ["Reed Elsevier", "Kodansha", "Wolters Kluwer", "Shueisha", "Hachette Livre"];
        for (let i in arrayOfPublisher) {
            let option = document.createElement('option');
            option.setAttribute('value', `${arrayOfPublisher[i]}`);
            option.innerHTML = `${arrayOfPublisher[i]}`;
            select.appendChild(option);

        }
    }

}

function displayAnthology() {
    let anthology = document.getElementById('display-Anthology');
    if (anthology.checked) {
        let formForAnthology = document.getElementById('anthology');
        formForAnthology.setAttribute('style', `display:block`);
        let formForNovel = document.getElementById('novel');
        formForNovel.setAttribute('style', `display:none`);

    }
}

function validationNovel() {

    let title = document.getElementById('title').value;
    if (typeof title !== "string" || !title.length) {
        alert("Title must be a string!");
        return false;

    }
    let author = document.getElementById('author').value;
    if (!isNaN(author) || !author.length) {
        alert("Author must be a string!");
        return false;
    }

    let select = document.getElementById('publisher');
    let choosenPublisher = select.options[select.selectedIndex].value;
    if (choosenPublisher === "") {
        alert("Please select a publisher");
        return false;
    }

    let yearOfPublicationNovel = parseInt(document.getElementById('yearOfPublication').value);
    let currentYear = new Date().getFullYear();

    if (yearOfPublicationNovel < 1900 || yearOfPublicationNovel > currentYear) {
        alert("Year should be in range 1900 to current year");
        return false;
    }
    let pages = parseInt(document.getElementById('pages').value);
    if (pages < 1 || pages > 1000) {
        alert("Pages must be in range of 1 to 1000 pages");
        return false;

    }

    let series = document.getElementById('series').value;

    if (series.length) {
        if (!isNaN(series)) {
            alert('Series must be a string');
            return false;
        } else if (isNaN(series)) {
            let seriesNumberInput = document.getElementById("seriesNumber");
            seriesNumberInput.toggleAttribute('required');

            let seriesNumber = parseInt(document.getElementById("seriesNumber").value);
            if (seriesNumber < 0) {
                alert("Number of series must be greater than 0!");
                return false;
            }

        } else {
            seriesNumberInput.toggleAttribute('required');
        }

    }
    let isbn = document.getElementById('ISBN').value;
    if (!isbn.length || isbn.length !== 13) {
        alert("ISBN must have 13 digits!")
        return false;
    }
    let review = document.getElementById('review').value;
    if (!review.length || review.length < 5) {
        alert(" Review must be a longer text!");
        return false;
    }
    return true;
}

function enableInputNumberOfSeries() {

    let seriesNumberInput = document.getElementById("seriesNumber");
    seriesNumberInput.removeAttribute("disabled");
}

function getFormData(event) {

    event.preventDefault();

    let Novel = {
        title: false,
        author: false,
        publisher: false,
        year: false,
        pages: false,
        series: false,
        seriesNumber: false,
        isbn: false,
        review: false,

        setTitle: function (title) {
            this.title = title;
        },

        setAuthor: function (author) {
            this.author = author;
        },

        setPublisher: function (publisher) {
            this.publisher = publisher
        },
        setYear: function (year) {
            this.year = year;
        },
        setPages: function (pages) {
            this.pages = pages;
        },
        setSeries: function (series) {
            this.series = series;
        },
        setSeriesNumber: function (seriesNumber) {
            this.seriesNumber = seriesNumber;
        },
        setIsbn: function (isbn) {
            this.isbn = isbn;
        },
        setReview: function (review) {
            this.review = review;
        }
    }

    Novel.setTitle(document.getElementById('title').value);
    Novel.setAuthor(document.getElementById('author').value);
    Novel.setPublisher(document.getElementById('publisher').value);
    Novel.setYear(document.getElementById('yearOfPublication').value);
    Novel.setPages(document.getElementById('pages').value);
    Novel.setSeries(document.getElementById('series').value);
    Novel.setSeriesNumber(document.getElementById('seriesNumber').value);
    Novel.setIsbn(document.getElementById('ISBN').value);
    Novel.setReview(document.getElementById('review').value);
 

    document.getElementById('title').value = "";
    document.getElementById('author').value = "";
    document.getElementById('publisher').value = "";
    document.getElementById('yearOfPublication').value = "";
    document.getElementById('pages').value = "";
    document.getElementById('series').value = "";
    document.getElementById('seriesNumber').value = "";
    document.getElementById('ISBN').value = "";
    document.getElementById('review').value = "";

    if(validationNovel() === true){
        novels.push(Novel);
        console.log(novels);
        printNovel();


    }

}
let buttonNovel = document.getElementById('btn-novel');
buttonNovel.addEventListener('click', getFormData);

function printNovel() {

    let ul = document.getElementById('display-novel');
    ul.innerHTML="";
    for (let i in novels) {
        let select = document.getElementById('publisher');
        let choosenPublisher = select.options[select.selectedIndex].value;
        let li = document.createElement('li');
        li.innerHTML = `${novels[i].title} ${novels[i].author}${novels[i].publisher}${novels[i].year}${novels[i].pages}${novels[i].series}${novels[i].seriesNumber}${novels[i].isbn}${novels[i].review}`
        ul.appendChild(li);

    }
    
    
}