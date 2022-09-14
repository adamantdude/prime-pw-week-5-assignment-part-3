function addToCollection(title, artist, yearPublished, tracks) {
    const song = {
        title: title,           //string
        artist: artist,         //string
        year: yearPublished,    //integer
        tracks: tracks          //2d array; [0] names, [1] durations
    };
    collection.push(song);
    return song;
}

function showCollection(array) {
    console.log('The collection has ' + array.length + ' items.');
    // for every object in object-array, output the objects in set format
    for(const item of array) {
        console.log(item.title + ' by ' + item.artist + ', published in ' + item.year + ":");
        // for loop. i index, to 2d array length. output all tracks
        for(let i=0; i<item.tracks[0].length; ++i) console.log(i+1 + ". " + item.tracks[0][i] + ": " + item.tracks[1][i]);
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
    if(searchObject == null || !searchObject.artist || !searchObject.year) return collection;
    let results = [];
    for(const item of collection) if(item.artist.indexOf(searchObject.artist) >= 0 && (item.year === searchObject.year)) results.push(item);
    return results;
}

// Debug and Testing //

console.log('***** Music Collection *****')
let collection = [];

// wasn't sure how to implement an object array within an object. opted for simple 2d array
// since it's easier to keep track of
// [0][x] contains names, [1][x] contains durations

console.log(addToCollection('Myth&Roid Overlord TV OST', 'MYTH & ROID' , 2018, [['Hydra', 'VORACITY'],['4:54', '3:51']]));
console.log(addToCollection('Belle OST', 'Ludvig Forssell and Taisei Iwasaki', 2021, [['Gales of Song', 'A Million Miles Away'],['4:00', '8:02']]));
console.log(addToCollection('Unorthodox Jukebox', 'Bruno Mars', 2012, [['Locked out of Heaven', 'When I Was Your Man'],['3:54', '3:32']]));
console.log(addToCollection('The Script', 'The Script', 2008, [["The Man Who Can't Be Moved", "I'm Yours"],['4:02', '4:15']]));
console.log(addToCollection('SHUT UP, GET HAPPY', 'Demondice', 2022, [['wanting, getting, wanting', 'take the bait', 'dark hour', 'fake ass gold'], ['2:33', '3:46', '4:12', '3:31']]));
console.log(addToCollection('The Greatest Showman: Reimagined', 'Benj Pasek and Justin Paul', 2017, [['A Million Dreams', 'Rewrite The Stars', 'This Is Me'], ['4:34', '3:38', '4:26']]));
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
    year: 2018
};

console.log('search() test with newSearch object');
console.log(search(newSearch));         // should return with one object array

let newSearchTwo = {
    artist: 'Ray Charles',
    year: 1957
};

console.log('search() test with newSearchTwo object');
console.log(search(newSearchTwo));      // should return empty array

let emptySearch = {
    artist: '',             // empty
    year: 2005
};

let emptySearchTwo = {
    artist: 'Ed Sheeran',
    year: null              // empty
};

let emptySearchThree;       // empty

console.log('--- three search() tests with empty objects / missing elements; should return full collection each ---');

console.log(search(emptySearch));

console.log(search(emptySearchTwo));

console.log(search(emptySearchThree));