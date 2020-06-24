const listItem = document.querySelector(".posts");
const postTemplate = document.getElementById("single-post");
const form = document.querySelector("#new-post form");
const fetchButton = document.querySelector("#available-posts button");
const postList = document.querySelector("ul");

const sentHttpRequest = (method, url, data) => {
	const promise = new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();

		xhr.open(method, url);

		// to parse it to a javascript array automatically
		xhr.responseType = "json";

		xhr.onload = () => {
			if (xhr.status >= 200 && xhr.status < 300) {
				resolve(xhr.response);
			} else {
				reject(new Error("Something went wrong"));
			}
		};
		xhr.onerror = () => {
			reject(new Error("failed to load http request"));
		};
		xhr.send(JSON.stringify(data));
	});
	return promise;
};

async function fetchPost() {
	try {
		const responseData = await sentHttpRequest(
			"GET",
			"https://jsonplaceholder.typicode.com/posts"
		);
		const postList = responseData;
		for (const post of postList) {
			const postEl = document.importNode(postTemplate.content, true);
			postEl.querySelector("h2").textContent = post.title.toUpperCase();
			postEl.querySelector("p").textContent = post.body;
			postEl.querySelector("li").id = post.id;
			listItem.append(postEl);
		}
	} catch (error) {
		alert(error.message);
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

postList.addEventListener("click", (e) => {
	if (e.target.tagName === "BUTTON") {
		const postId = e.target.closest("li").id;
		sentHttpRequest(
			"DELETE",
			`https://jsonplaceholder.typicode.com/posts/${postId}`
		);
	}
});
