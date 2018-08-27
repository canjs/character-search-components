import { Component } from "//unpkg.com/can@5/core.mjs";

const styles = document.createElement("style");
styles.innerHTML = `
character-list-page img {
  height: 50px;
  width: 50px;
}
`;
document.body.appendChild(styles);

const ListPage = Component.extend({
  tag: "character-list-page",

  view: `
    <a href="{{ routeUrl(page="search" query=query) }}">&lt; Search</a>

    <div>
      {{# if(charactersPromise.isPending) }}
        Loading...
      {{/ if }}

      {{# if(charactersPromise.isResolved) }}
        {{# if(characters.length) }}
          <p>
            <button on:click="goBack()" {{# unless(canGoBack) }}disabled{{/ unless }}>&lt;</button>
            <span>{{startIndex}} - {{endIndex}} of {{characterCount}}</span>
            <button on:click="goForward()" {{# unless(canGoForward) }}disabled{{/ unless }}>&gt;</button>
          </p>

          <ul>
          {{# each(characters, character=value) }}
            <li>
              <a href="{{ routeUrl( page="details" characterId=character.id, true ) }}">
                <p><img src="{{character.image}}" alt="{{character.name}}" /> {{character.name}}</p>
              </a>
            </li>
          {{/ each }}
          </ul>
        {{ else }}
          No Results Found
        {{/ if }}
      {{/ if }}
    </div>
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
