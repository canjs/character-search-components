import { Component } from "//unpkg.com/can@5/core.mjs";

const styles = document.createElement("style");
styles.innerHTML = `
character-details-page {
  margin: 0 3em;
}
character-details-page .character-details {
  margin: 1em 3em;
  text-align: center;
  background-color: #00a1b7;
  border: 20px solid #00a1b7;
  border-radius: 10px;
}
character-details-page .character-details img {
  width: 400px;
  height: 400px;
  border: 10px solid #fff;
  border-radius: 6px;
}
character-details-page .character-details h2 {
  font-size: 1.3em;
  color: #fff;
  text-shadow: 3px 4px 0 #000;
  letter-spacing: 8px;
  margin-top: 0;
}
character-details-page .character-details p {
  color: #fff;
  text-shadow: 2px 2px 0 #000;
  letter-spacing: 3px;
}
character-details-page .character-details p span {
  color: #000;
  text-shadow: none;
}
`;
document.body.appendChild(styles);

export default Component.extend({
  tag: "character-details-page",

  view: `
    <div class="breadcrumbs">
      <div>
        <a href="{{ routeUrl(page="list" query=query)}}" class="search">&lt; Characters</a>
      </div>
    </div>

    {{# if(characterPromise.isPending) }}
      <div class="loading">Loading...</div>
    {{/ if }}

    {{# if(characterPromise.isResolved) }}
      <div class="character-details">
        {{# with(characterPromise.value) }}
          <h2>{{name}}</h2>
          <img src="{{image}}" alt="{{name}}"/>
          <p><span>Status:</span> {{status}}</p>
          <p><span>Species:</span> {{species}}</p>
          <p><span>Location:</span> {{location.name}}</p>
          <p><span>Type:</span> {{# if(type) }}{{type}}{{ else }}Unknown{{/ if }}</p>
        {{/ with }}
      </div>
    {{/ if }}
  `,

  ViewModel: {
    query: "string",
    id: "number",

    get characterPromise() {
      return fetch(`https://rickandmortyapi.com/api/character/${this.id}`)
        .then(resp => resp.json());
    }
  }
});
