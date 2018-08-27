import { Component } from "//unpkg.com/can@5/core.mjs";

export default Component.extend({
  tag: "character-details-page",

  view: `
    <a href="{{ routeUrl(page="list" query=query)}}">&lt; Characters</a>

    {{# if(characterPromise.isPending) }}
      Loading...
    {{/ if }}

    {{# if(characterPromise.isResolved) }}
      <div>
        {{# with(characterPromise.value) }}
          <p>{{name}}</p>
          <img src="{{image}}" alt="{{name}}"/>
          <p>{{status}}</p>
          <p>{{species}}</p>
          <p>{{location.name}}</p>
          <p>{{type}}</p>
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
