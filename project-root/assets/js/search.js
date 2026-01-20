const books = window.books ?? []; // ✅ 추가 (books.js가 window.books면)

const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("searchBtn");
const list = document.getElementById("list");

function closeResults() {
  list.innerHTML = "";
  list.classList.remove("is-open");
}
function openResults() {
  list.classList.add("is-open");
}

function searchBooks(input) {
  const q = (input ?? "").trim().toLowerCase();
  if (q.length < 2) return [];
  return books.filter((book) => (book.title ?? "").toLowerCase().includes(q));
}

function getProductLabel(productType) {
  switch (productType) {
    case "domestic":
      return "국내도서";
    case "overseas":
      return "해외도서";
    case "used":
      return "중고책";
    case "ebook":
      return "eBook";
    default:
      return "기타";
  }
}

function groupByProductType(items) {
  const grouped = { domestic: [], overseas: [], used: [], ebook: [] };

  items.forEach((book) => {
    const key = book.productType;
    if (!grouped[key]) return;
    grouped[key].push(book);
  });

  return grouped;
}

function renderGroupedResults(grouped) {
  list.innerHTML = "";

  const order = ["domestic", "overseas", "used", "ebook"];
  order.forEach((key) => {
    const items = grouped[key];
    if (!items || items.length === 0) return;

    const sectionLi = document.createElement("li");
    sectionLi.className = "search-group";

    sectionLi.innerHTML = `
      <div class="search-group__title">[${getProductLabel(key)}]</div>
      <ul class="search-group__list"></ul>
    `;

    const ul = sectionLi.querySelector(".search-group__list");

    items.forEach((book) => {
      const itemLi = document.createElement("li");
      itemLi.className = "search-item";
      itemLi.innerHTML = `
        <span class="title">${book.title ?? ""}</span>
        <span class="author">${book.author ?? ""}</span>
      `;
      ul.appendChild(itemLi);
    });

    list.appendChild(sectionLi);
  });
}

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const val = searchInput.value.trim();
  if (val.length < 2) {
    closeResults();
    return;
  }

  const results = searchBooks(val);
  openResults();

  if (results.length === 0) {
    list.innerHTML = `<li><p>검색 결과가 없습니다.</p></li>`;
    return;
  }

  const grouped = groupByProductType(results);
  renderGroupedResults(grouped);
});

searchInput.addEventListener("input", () => {
  const val = searchInput.value.trim();
  if (!val) closeResults();
});
