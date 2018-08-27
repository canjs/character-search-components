import { Component } from "//unpkg.com/can@5/core.mjs";

const styles = document.createElement("style");
styles.innerHTML = `
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
`;
document.body.appendChild(styles);

export default Component.extend({
	tag: "character-search-page",

	view: `
	<input type="text" value:bind="query">
	<a href="{{ routeUrl(page="list" query=query)}}">Search</a>
  `,

	ViewModel: {
		query: "string"
	}
});
