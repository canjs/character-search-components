import {
	domEvents,
	enterEvent,
	Reflect,
	route,
	StacheElement,
	type
} from "//unpkg.com/can@pre/ecosystem.mjs";

domEvents.addEvent(enterEvent);

const styles = document.createElement("style");
styles.innerHTML = `
character-search-page {
  text-align: center;
  margin: 0 auto;
  width: 100%;
}
character-search-page input {
  display: flex;
  text-align: center;
  font-family: 'Permanent Marker', cursive;
  margin: auto;
  padding: 20px;
  background-color: white;
  border: 1px solid white;
  font-size: 1.3em;
  color: #000;
  border-radius: 10px;
  letter-spacing: 3px;
}
character-search-page a {
  color: #000;
  display: block;
  text-decoration: none;
  text-align: center;
  margin: 1em auto;
  letter-spacing: 4px;
}
character-search-page a:hover {
  color: #fff;
}
character-search-page a[disabled] {
  pointer-events: none;
  color: #aaa;;
}
`;
document.body.appendChild(styles);

export default class CharacterSearchPage extends StacheElement {
	static view = `
		<input type="text" on:enter="navigate(scope.element.value)" on:input="enableHref(scope.element.value)" value:bind="query" placeholder="Character Name" autofocus>
		<a {{# if(hrefEnabled) }}href="{{ routeUrl(page="list" query=query)}}"{{/ if }} {{# unless(hrefEnabled) }}disabled{{/ unless }}>Search</a>
	`;

	static props = {
		query: type.maybeConvert(String),

		hrefEnabled: {
			value({ resolve, lastSet, listenTo }) {
				listenTo(lastSet, resolve);

				listenTo("query", (ev, query) => {
					resolve(query.length > 0);
				});

				resolve(this.query.length > 0);
			}
		}
	};

	enableHref(val) {
		this.hrefEnabled = val.length > 0;
	}

	navigate(query) {
		if (query.length) {
			Reflect.update(route.data, {
				page: "list",
				query: query
			});
		}
	}
}

customElements.define("character-search-page", CharacterSearchPage);
