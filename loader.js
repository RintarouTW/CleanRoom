/*
 * http://github.com/RintarouTW/SimplifiedFilter
 */

function loadScript(src, type = "") {
	/* Insert the final install script to the head */
	var s = document.createElement('script');
	if (type != "")
		s.type = type;
	s.src = chrome.runtime.getURL(src);
	s.onload = function () {
		this.remove();
	};
	(document.head || document.documentElement).appendChild(s);
}

/* Update Option to the hack script. */
function updateOptions(data) {

	let evt = new CustomEvent("UpdateOptions", { detail: data });

	document.dispatchEvent(evt);
}


function setup(options) {

	/* Config changed */
	chrome.storage.onChanged.addListener(function (changes, namespace) {

		if (namespace != "local") return;

		let data = {};

		for (var key in changes)
			data[key] = changes[key].newValue;

		updateOptions(data);
	});

	/* Clear Badge Text */
	chrome.runtime.sendMessage({ cmd: "SetBage", text: "" });

	document.addEventListener("SFToLoaderEvent", function (evt) {

		switch (evt.detail.cmd) {
			case "LoadOptions":
				/* the hack script would ask to load options after install too */
				chrome.storage.local.get(Object.keys(options), (data) => updateOptions(data));
				break;
			case "SetBage":
				chrome.runtime.sendMessage(evt.detail);
				break;
		}
	});

	/* Load the options */
	chrome.storage.local.get(Object.keys(options), (data) => updateOptions(data));
}


loadScript("SimplifiedFilter.js");

(async () => {

	// Default Configuration
	const options = await import("./default.js");

	setup(options);
})();

