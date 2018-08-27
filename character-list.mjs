import { Component } from "//unpkg.com/can@5/core.mjs";

const styles = document.createElement("style");
styles.innerHTML = `
character-list-page {
  margin: 0 3em;
}
character-list-page .wrapper {
  margin: 0 3em;
}
character-list-page .results {
  background-color: #00a1b7;
  border-radius: 10px;
  padding: 20px;
  margin: 20px 3em;
  text-align: center;
  color: #fef979;
  text-shadow: 2px 2px 0 #000;
}
character-list-page .results span {
  letter-spacing: 8px;
}
character-list-page .results button {
  font-family: 'Permanent Marker', cursive;
  padding: 3px 6px;
  border: none;
  color: #fef979;
  background-color: #00a1b7;
  border-radius: 6px;
  font-size: 30px;
  vertical-align: middle;
  text-shadow: 2px 2px 0 #000;
}
character-list-page .results button:hover {
  color: #fff;
  cursor: pointer;
}
character-list-page ul {
  margin: 0;
  padding: 0;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
character-list-page li {
  background-color: #00a1b7;
  border-radius: 10px;
  margin: 20px;
  padding: 25px;
  list-style: none;
  display: flex;
  width: 300px;
}
character-list-page li:hover {
  background-color: #0097ac;
}
character-list-page li a {
  color: #fff;
  letter-spacing: 3px;
}
character-list-page li img {
  width: 100%;
  height: inherit;
  border-radius: 10px;
}
character-list-page li p {
  padding: 10px;
  margin: 0 auto 15px auto;
  text-align: center;
  text-shadow: 0px 0px 20px black;
}
`;
document.body.appendChild(styles);

export default Component.extend({
  tag: "character-list-page",

  view: `
    <a href="{{ routeUrl(page="search" query=query) }}" class="search">&lt; Search</a>

    <div class="wrapper">
      {{# if(charactersPromise.isPending) }}
        <div class="loading">Loading...</div>
      {{/ if }}

      {{# if(charactersPromise.isResolved) }}
        <ul>
        {{# each(characters, character=value) }}
          <li>
            <a href="{{ routeUrl( page="details" characterId=character.id, true ) }}">
              <img src="{{character.image}}" alt="{{character.name}}" />
              <p>{{character.name}}</p>
            </a>
          </li>
        {{/ each }}
        </ul>
      {{/ if }}
    </div>

    <p class="results">
      <button on:click="goBack()" {{# unless(canGoBack) }}disabled{{/ unless }}>&lt; </button>
      <span>{{startIndex}} - {{endIndex}} of {{characterCount}}</span>
      <button on:click="goForward()" {{# unless(canGoForward) }}disabled{{/ unless }}>&gt;</button>
    </p>
  `,

  ViewModel: {
    query: "string",

    page: { type: "number", default: 1 },

    get canGoBack() {
      return this.startIndex > 1;
    },

    goBack() {
      this.page--;
    },

    get canGoForward() {
      return this.endIndex < this.characterCount;
    },

    goForward() {
      this.page++;
    },

    get startIndex() {
      return (this.page - 1) * 20 + 1;
    },

    get endIndex() {
      let index = this.page * 20;
      return index < this.characterCount ? index : this.characterCount;
    },

    get charactersPromise() {
      return fetch(`https://rickandmortyapi.com/api/character?name=${this.query}&page=${this.page}`)
        .then(resp => resp.json())
        .catch(err => ([]));
    },

    characters: {
      get(lastSet, resolve) {
        this.charactersPromise.then(data => resolve(data.results));
      }
    },

    characterCount: {
      get(lastSet, resolve) {
        this.charactersPromise.then(data => resolve(data.info.count));
      }
    }
  }
});
