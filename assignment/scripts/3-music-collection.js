function addToCollection(title, artist, yearPublished, tracks) {
    const song = {
        title: title,           //string
        artist: artist,         //string
        year: yearPublished,    //integer
        tracks: tracks          //object array, name:duration
    };
    collection.push(song);
    return song;
}

function showCollection(array) {
    console.log('The collection has ' + array.length + ' items.');
    // for every object in object-array, output the objects in set format
    for(const item of array) {
        console.log(item.title + ' by ' + item.artist + ', published in ' + item.year + ":");
        // for loop. i index, to array length. output all tracks
        for(let i=0; i<item.tracks.length; ++i) console.log(i+1 + ". ", item.tracks[i]);
    }
    return;
}

function findByArtist(search) {
    let results = [];
    // for every object in object-array collection, loop
    // indexOf returns -1 if not found
    // push the object into results array
    for(const item of collection) if(item.artist.indexOf(search) >= 0) results.push(item);
    return results;
}

function search(searchObject) {
    // !'' = true and !null = true, therefore if either searchObject element is empty, return the collection
    // implement early exit if possible
    if(!searchObject || !searchObject.artist || !searchObject.year) return collection;
    let results = [];
    if(!searchObject.searchTrack) {
        for(const item of collection) {
            if(item.artist.toUpperCase().indexOf(searchObject.artist.toUpperCase()) >= 0 && (item.year === searchObject.year))
                results.push(item);
        }
    }
    else {
        for(const item of collection) {
            if(item.artist.toUpperCase().indexOf(searchObject.artist.toUpperCase()) >= 0 && (item.year === searchObject.year))
                for(let i=0; i<item.tracks.length; ++i) 
                    if(Object.keys(item.tracks[i])[0].toUpperCase() === searchObject.searchTrack.toUpperCase())
                        results.push({
                            title:item.title,
                            artist:item.artist,
                            year:item.year,
                            tracks:item.tracks[i]
                        });
        }
    }
    return results;
}

// Debug and Testing //

console.log('***** Music Collection *****')
let collection = [];

console.log(addToCollection('Myth&Roid Overlord TV OST', 'MYTH & ROID' , 2018, [{'Hydra':'4:54'}, {'VORACITY':'3:51'}]));
console.log(addToCollection('Belle OST', 'Ludvig Forssell and Taisei Iwasaki', 2021, [{'Gales of Song':'4:00'},{'A Million Miles Away':'8:02'}]));
console.log(addToCollection('Unorthodox Jukebox', 'Bruno Mars', 2012, [{'Locked out of Heaven':'3:54'},{'When I Was Your Man':'3:32'}]));
console.log(addToCollection('The Script', 'The Script', 2008, [{"The Man Who Can't Be Moved":"4:02"},{"I'm Yours":'4:15'}]));
console.log(addToCollection('SHUT UP, GET HAPPY', 'Demondice', 2022, [{'wanting, getting, wanting':'2:33'},{'take the bait':'3:46'},{'dark hour':'4:12'},{'fake ass gold':'3:31'}]));
console.log(addToCollection('The Greatest Showman: Reimagined', 'Benj Pasek and Justin Paul', 2017, [{'A Million Dreams':'4:34'},{'Rewrite The Stars':'3:38'}, {'This Is Me':'4:26'}]));
console.log(collection);

showCollection(collection);

console.log('Searching for artist with "Bruno"');
console.log(findByArtist('Bruno'));

console.log('Searching for artist with "Demon"');
console.log(findByArtist('Demon'));

console.log('Searching for artist with "Taisei"');
console.log(findByArtist('Taisei'));

console.log('Searching for artist with "and"');
console.log(findByArtist('and'));

console.log('Search test with showCollection() using previous search');
showCollection(findByArtist('and'));

let newSearch = {
    artist: "MYTH & ROID",
    year: 2018,
    searchTrack: "Hydra"
};

console.log('search() test with newSearch object');
console.log(search(newSearch));         // should return with one object array

let newSearchTwo = {
    artist: 'Ray Charles',
    year: 1957,
    searchTrack: null
};

console.log('search() test with newSearchTwo object');
console.log(search(newSearchTwo));      // should return empty array

let newSearchThree = {
    artist: "MYTH & ROID",
    year: 2018,
    searchTrack: 'VORACITY'
};

console.log('search() test with newSearchThree');
console.log(search(newSearchThree));

let newSearchFour = {
    artist: "Demondice",
    year: 2022,
    searchTrack: "fake ass gold"
};

console.log('search() test with newSearchFour');
console.log(search(newSearchFour));

let emptySearch = {
    artist: '',             // empty
    year: 2005,
    searchTrack: null
};

let emptySearchTwo = {
    artist: 'Ed Sheeran',
    year: null,             // empty
    searchTrack: null
};

let emptySearchThree;       // empty

console.log('--- three search() tests with empty objects / missing elements; should return full collection each ---');

console.log(search(emptySearch));

console.log(search(emptySearchTwo));

console.log(search(emptySearchThree));