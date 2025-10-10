document.addEventListener("DOMContentLoaded", () => {
  const blogGrid = document.getElementById("blogGrid");
  const categoryFilter = document.getElementById("categoryFilter");

  // Fetch the JSON file
  fetch("data/blogs.json")
    .then((response) => response.json())
    .then((blogs) => {
      // Render all blogs initially
      renderBlogs(blogs);

      // Filter blogs by category
      categoryFilter.addEventListener("change", () => {
        const selectedCategory = categoryFilter.value;
        if (selectedCategory === "all") {
          renderBlogs(blogs);
        } else {
          const filtered = blogs.filter(
            (blog) => blog.category === selectedCategory
          );
          renderBlogs(filtered);
        }
      });
    })
    .catch((error) => {
      console.error("Error fetching blog data:", error);
      blogGrid.innerHTML =
        "<p style='color:red;'>Unable to load blog posts at this time.</p>";
    });

  function renderBlogs(blogArray) {
    blogGrid.innerHTML = ""; // clear previous posts
    blogArray.forEach((blog) => {
      const blogCard = document.createElement("div");
      blogCard.className = "blog-card";

      blogCard.innerHTML = `
        <img src="${blog.image}" alt="${blog.title}" class="blog-card-img" />
        <div class="blog-card-content">
          <h3>${blog.title}</h3>
          <p class="blog-date">${blog.date}</p>
          <p>${blog.content}</p>
        </div>
      `;

      blogGrid.appendChild(blogCard);
    });
  }
});
