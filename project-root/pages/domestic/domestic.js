// 전역 데이터를 현재 파일에서 쓰기 쉽게 변수로 받음
const books = window.books;     

// books 배열에서 isBest === true, type === "domestic"인 책만 골라서 새 배열을 만듦
const bestsellerBooks = books.filter(
  book => book.isBest && book.type === "domestic"
); 

let currentIndex = 0;     // 현재 대표로 보여줄 베스트 도서의 인덱스

const bestsellerBox = document.querySelector(".bestseller-box");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

// 베스트셀러 렌더링
function renderBestseller() {

  // 기존 내용 제거
  const oldLayout = bestsellerBox.querySelector(".bestseller-layout");
  if (oldLayout) oldLayout.remove();

  // 레이아웃 컨테이너 생성
  const layout = document.createElement("div");
  layout.className = "bestseller-layout";


  // 왼쪽 베스트셀러 도서
  const main = document.createElement("div");
  main.className = "bestseller-main";

  const mainBook = bestsellerBooks[currentIndex];     // 현재 인덱스의 책이 대표 도서

  // 메인 전용 구조 분해
  const { id, title, author, image, shortDesc } = mainBook;

  main.innerHTML = `
    <img src="${image}" alt="${title}">
    <div class="book-info">
      <h3>${title}</h3>
      <p>${author}</p>
      <p>${shortDesc}</p>
    </div>
  `;     // currentIndex가 바뀌면 자동으로 다른 책이 메인에 표시됨 

  // 클릭시 상세페이지 이동
  main.addEventListener("click", () => {
    location.href = `../detailPage/detailPage.html?id=${id}`;
  });


  // 오른쪽 미리보기 도서
  const previewWrapper = document.createElement("div");
  previewWrapper.className = "bestseller-preview-wrapper";

  const preview = document.createElement("div");
  preview.className = "bestseller-preview";

  for (let i = 1; i <= 3; i++) {    // 대표 도서 다음 순서부터 3권
    const idx = (currentIndex + i) % bestsellerBooks.length;
    const { image, title } = bestsellerBooks[idx];

    // 미리보기 카드 생성
    const card = document.createElement("div");
    card.className = "preview-card";
    card.innerHTML = `<img src="${image}" alt="${title}">`;

    // 미리보기 클릭 시 해당 책을 메인으로
    card.addEventListener("click", () => {
      currentIndex = idx;   // 해당 책 인덱스로 currentIndex 변경
      renderBestseller();   // 화면 다시 렌더링
    });

    preview.appendChild(card);
  }

  previewWrapper.appendChild(preview);

  layout.append(main, previewWrapper);
  bestsellerBox.insertBefore(layout, prevBtn);
}


// '다음','이전' 버튼 이벤트
nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % bestsellerBooks.length;
  renderBestseller();
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + bestsellerBooks.length) % bestsellerBooks.length;    // + books.length : 음수 방지용
  renderBestseller();
});

document.addEventListener("DOMContentLoaded", () => {
  renderBestseller();
});  // HTML이 모두 로딩된 뒤에 JS 실행하겠다는 의미


// 책 목록 부분
const categories = [
  { name: "소설", key: "novel" },
  { name: "에세이", key: "essay" },
  { name: "시/희곡", key: "poem" }
];

const container = document.getElementById("bookSections");

// 카테고리별로 섹션 만듦
categories.forEach(category => {    // categories 배열을 하나씩 순회. category 하나 = 하나의 섹션
  const section = document.createElement("section");
  section.className = "book-section content-box";
  section.setAttribute("data-category", category.name);   // 스크롤 이동용 연결고리

  // 섹션 헤더 만듦 (제목)
  const header = document.createElement("div");
  header.className = "section-header";

  const title = document.createElement("h3");
  title.className = "section-title";
  title.textContent = category.name;    // 데이터 들어감

  header.appendChild(title);

  // 책 목록 컨테이너 만듦
  const list = document.createElement("div");
  list.className = "book-list";

  // 카테고리에 맞는 책만 필터링
  const filteredBooks = books.filter(
    book => book.category === category.key
  );

  filteredBooks.forEach(book => {

    // 카드 전용 구조 분해
    const { id, title, image } = book;

    // 책 카드 생성
    const card = document.createElement("div");
    card.className = "book-card";

    // 책 이미지
    const img = document.createElement("img");
    img.src = image;

    // 책 제목
    const name = document.createElement("p");
    name.className = "book-name";
    name.textContent = title;

    card.append(img, name);

    // 클릭시 상세페이지 이동
    card.addEventListener("click", () => {
      location.href = `../detailPage/detailPage.html?id=${id}`;
    });

    list.appendChild(card);
  });


  // 더보기 버튼
  const moreBtn = document.createElement("button");
  moreBtn.className = "more-btn";
  moreBtn.textContent = "더보기";

  moreBtn.addEventListener("click", () => {
    alert("준비 중인 페이지입니다");
  });

  section.append(header, list, moreBtn);
  container.appendChild(section);
});


// 왼쪽 사이드바
const sidebarCategories = [
  "소설", "에세이", "시/희곡", "자기계발", "인문", "사회", "과학", "예술", "여행", "역사", 
  "종교", "정치", "자연과학", "경제/경영", "인물", "유아", "어린이", "청소년", "만화", "여행"
];

const categoryList = document.getElementById("categoryList");

sidebarCategories.forEach(name => {    // forEach로 카테고리 이름 하나씩 처리
  const li = document.createElement("li");
  li.textContent = name;
  li.className = "category-item";

  li.addEventListener("click", () => {
    const target = document.querySelector(`[data-category="${name}"]`);

    if (target) {   // 해당 카테고리 섹션이 있는 경우
      target.scrollIntoView({ behavior: "smooth" });
    } else {       // 해당 카테고리 섹션이 없는 경우
      alert("준비 중인 카테고리입니다");
    }
  });

  categoryList.appendChild(li);
});


// 맨 위로 이동하는 버튼
const toTopBtn = document.getElementById("toTopBtn");

// 스크롤하면 버튼 보이기
window.addEventListener("scroll", () => {   // 페이지를 스크롤할 때마다 실행
  toTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
});     // 300px 내려왔다면 버튼 보이기

// 클릭하면 맨 위로
toTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});     // 브라우저에게 명령