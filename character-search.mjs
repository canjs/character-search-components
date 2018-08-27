import { Component } from "//unpkg.com/can@5/core.mjs";

const styles = document.createElement("style");
styles.innerHTML = `
`;
document.body.appendChild(styles);

const SearchPage = Component.extend({
	tag: "character-search-page",

	view: `
	<input type="text" value:bind="query">
	<a href="{{ routeUrl(page="list" query=query)}}">Search</a>
  `,

	ViewModel: {
		query: "string"
	}
});
