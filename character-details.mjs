import { StacheElement, type } from "//unpkg.com/can@pre/ecosystem.mjs";

const styles = document.createElement("style");
styles.innerHTML = `
character-details-page {
  margin: 0 3em;
}
character-details-page .character-details {
  max-width: 400px;
  margin: 1em 3em;
  text-align: center;
  background-color: #00a1b7;
  border: 20px solid #00a1b7;
  border-radius: 10px;
}
character-details-page .character-details img {
  max-width: 100%;
  height: auto;
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

export default class CharacterDetailsPage extends StacheElement {
	static view = `
		<div class="breadcrumbs">
			<div>
				<a href="{{ routeUrl(page="list" query=this.query)}}" class="search">&lt; Characters</a>
			</div>
		</div>

		{{# if(characterPromise.isPending) }}
			<div class="loading">Loading...</div>
		{{/ if }}

		{{# if(characterPromise.isResolved) }}
			<div class="character-details">
				{{# with(characterPromise.value) }}
					<h2>{{this.name}}</h2>
					<img src="{{this.image}}" alt="{{this.name}}"/>
					<p><span>Status:</span> {{this.status}}</p>
					<p><span>Species:</span> {{this.species}}</p>
					<p><span>Location:</span> {{this.location.name}}</p>
					<p><span>Type:</span> {{# if(this.type) }}{{this.type}}{{ else }}Unknown{{/ if }}</p>
				{{/ with }}
			</div>
		{{/ if }}
	`;

	static props = {
		query: type.maybeConvert(String),
		id: type.maybeConvert(Number),

		get characterPromise() {
			return fetch(`https://rickandmortyapi.com/api/character/${this.id}`).then(
				resp => resp.json()
			);
		}
	};
}

customElements.define("character-details-page", CharacterDetailsPage);
