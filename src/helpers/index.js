export const fetchPokemonData = url => {
  return fetch(url).then(response => {
    return response.json();
  });
};

function arrayBufferToBase64(buffer) {
  var binary = "";
  var bytes = [].slice.call(new Uint8Array(buffer));

  bytes.forEach(b => (binary += String.fromCharCode(b)));

  return window.btoa(binary);
}

export const fetchPokemonImg = url => {
  var request = new Request(url);

  fetch(request, {
    method: "GET",
    mode: 'cors',
    cache: 'default'
  }).then(response => {
    return response.arrayBuffer().then((buffer) => {
        var base64Flag = 'data:image/jpeg;base64,';
        var imageStr = arrayBufferToBase64(buffer);
        console.log('src 1', base64Flag + imageStr)
        // document.querySelector('img').src = base64Flag + imageStr;
      });
  });
};

export const fetchKantoPokemon = url => {
  fetch(url)
    .then(response => response.json())
    .then(function(allpokemon) {
      const promises = [];
      allpokemon.results.forEach(function(pokemon) {
        console.log("pokemon", pokemon);
        promises.push(fetchPokemonData(pokemon.url));
      });
      Promise.all(promises).then(data => {
        const promises = [];
        const url = `https://pokeres.bastionbot.org/images/pokemon/${data[0].id}.png`;
        promises.push(fetchPokemonImg(url));
        Promise.all(promises).then(data => {
            console.log("all images", data);
            var base64Flag = "data:image/jpeg;base64,";
          data.forEach(buffer => {
            var imageStr = arrayBufferToBase64(buffer);
            const src = base64Flag + imageStr;
            console.log('src', src)
            return src;
            //   document.querySelector("img").src = base64Flag + imageStr;
          });
        });
      });
    });
};
