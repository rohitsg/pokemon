export const fetchPokemonData = url => {
  return fetch(url).then(response => {
    const data = response.json();
    return data;
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
  var base64Flag = "data:image/jpeg;base64,";

  return fetch(request, {
    method: "GET",
    mode: "cors",
    cache: "default"
  }).then(response => {
    return response.arrayBuffer().then(buffer => {
      return new Promise(resolve => {
        var imageStr = arrayBufferToBase64(buffer);
        var src = base64Flag + imageStr;
        resolve(src);
      });
    });
  });
};

export const fetchKantoPokemon = url => {
  return fetch(url)
    .then(response => response.json())
    .then(function(allpokemon) {
      const promises = [];
      allpokemon.results.forEach(function(pokemon) {
        promises.push(fetchPokemonData(pokemon.url));
      });
      return Promise.all(promises).then(data => {
        return data;
      });
    });
};

export const fetchImg = (data) => {
  const promises = [];
  let url = "https://pokeres.bastionbot.org/images/pokemon";
  data.forEach(img => {
    const _url = url + `/${img.id}.png`;
    promises.push(fetchPokemonImg(_url));
  });
  return Promise.all(promises).then(data => {
    return data;
  });
};
