const listItem = document.querySelector(".posts");
const postTemplate = document.getElementById("single-post");
const form = document.querySelector("#new-post form");
const fetchButton = document.querySelector("#available-posts button");

const sentHttpRequest = (method, url, data) => {
	const promise = new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();

		xhr.open(method, url);

		// to parse it to a javascript array automatically
		xhr.responseType = "json";

		xhr.onload = () => {
			resolve(xhr.response);
		};
		xhr.send(JSON.stringify(data));
	});
	return promise;
};

async function fetchPost() {
	const responseData = await sentHttpRequest(
		"GET",
		"https://jsonplaceholder.typicode.com/posts"
	);
	const postList = responseData;
	for (const post of postList) {
		const postEl = document.importNode(postTemplate.content, true);
		postEl.querySelector("h2").textContent = post.title.toUpperCase();
		postEl.querySelector("p").textContent = post.body;
		listItem.append(postEl);
	}
}

async function createPost(title, content) {
	userId = Math.random();
	const post = {
		title: title,
		body: content,
		userId: userId,
	};

	sentHttpRequest("POST", "https://jsonplaceholder.typicode.com/posts", post);
}
fetchButton.addEventListener("click", fetchPost);
form.addEventListener("submit", (e) => {
	e.preventDefault();
	const title = e.currentTarget.querySelector("#title").value;
	const content = e.currentTarget.querySelector("#content").value;

	createPost(title, content);
});
