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
    for(const item of collection) if(item.artist.toUpperCase().indexOf(search.toUpperCase()) >= 0) results.push(item);
    return results;
}

function search(searchObject) {
    // !'' = true and !null = true, therefore if either searchObject element is empty, return the collection
    // implement early exit if possible
    if(!searchObject || !searchObject.artist || !searchObject.year) return collection;
    let results = []; // object array
    // if there is no searchTrack; no specific track to search route, only album
    if(!searchObject.searchTrack) {
        for(const item of collection) {
            // non-case sensitive search of the artist's name
            if(item.artist.toUpperCase().indexOf(searchObject.artist.toUpperCase()) >= 0 && (item.year === searchObject.year))
                // push entire object into array
                results.push(item);
        }
    }
    // if there exists a searchTrack; specific track to search route
    else {
        for(const item of collection) {
            // non-case sensitive search of the artist's name
            if(item.artist.toUpperCase().indexOf(searchObject.artist.toUpperCase()) >= 0 && (item.year === searchObject.year))
                // if the artist and year is found, run through the tracks list to find the specific track
                for(let i=0; i<item.tracks.length; ++i) 
                    // non-case sensitive search of the track, using the keys of the array of objects. `object{key:value}`
                    // `Object.keys()` returns an array of keys, each object in the `item.tracks` object array only contains one key each, therefore
                    // `Object.keys()[0]` returns the only key within the `item.tracks[i]` object
                    // indexOf() returns -1 if not found (falsy), >= 0 otherwise (truthy).
                    if(Object.keys(item.tracks[i])[0].toUpperCase().indexOf(searchObject.searchTrack.toUpperCase()) >= 0)
                        // push an entire object similar to song objects into the results array
                        // with only the singular track found
                        results.push({
                            title: item.title,
                            artist: item.artist,
                            year: item.year,
                            tracks: item.tracks[i]
                        });
        }
    }
    // default return for empty array / failed searches
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

console.log('Searching for artist with "Bruno"',findByArtist('Bruno'));

console.log('Searching for artist with "Demon"',findByArtist('Demon'));

console.log('Searching for artist with "Taisei"',findByArtist('Taisei'));

console.log('Searching for artist with "and"',findByArtist('and'));

console.log('Search test with showCollection() using previous search');
showCollection(findByArtist('and'));

let newSearch = {
    artist: "MYTH & ROID",
    year: 2018,
    searchTrack: "Hydra"
};

console.log('search() test with newSearch object', newSearch);
console.log('results returned:',search(newSearch));         // should return with one object array

let newSearchTwo = {
    artist: 'Ray Charles',
    year: 1957,
    searchTrack: null
};

console.log('search() test with newSearchTwo object', newSearchTwo);
console.log('results returned:',search(newSearchTwo));      // should return empty array

let newSearchThree = {
    artist: "MYTH & ROID",
    year: 2018,
    searchTrack: 'VORACITY'
};

console.log('search() test with newSearchThree', newSearchThree);
console.log('results returned:',search(newSearchThree));

let newSearchFour = {
    artist: "Demondice",
    year: 2022,
    searchTrack: "fake ass gold"
};

console.log('search() test with newSearchFour', newSearchFour);
console.log('results returned:',search(newSearchFour));

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

console.log(search(emptySearch), emptySearch);

console.log(search(emptySearchTwo), emptySearchTwo);

console.log(search(emptySearchThree), emptySearchThree);