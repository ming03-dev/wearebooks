//하나의 detailPage로 여러 책의 상세 정보를
// 동적으로 렌더링.(url파라미터:페이지 주소에
// 데이터를 전달하는 방식 ) => url에 해당책의
// id만 전달하여 하나의 detailPage에서 해당 id에
// 맞는 데이터를 불러오는 구조임.

//장바구니에 잘 저장됐는지 콘솔에 확인 테스트용
//localStorage.getItem("cartItems")

const books = window.books;
//books.js에 있는 전역 배열 가져오기

const CART_KEY = "cartItems";
//localStorage에 장바구니 배열을 저장할 key 이름 설정

const won = (n) => Number(n).toLocaleString() + "원";

function getBookIdFromUrl() {
  return new URLSearchParams(location.search).get("id");
}

function getBookById(id) {
  return books.find((b) => b.id === id) ?? null;
}

// ---- cart storage
function getCartItems() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function setCartItems(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

function addToCartOnce(book) {
  const items = getCartItems();

  const exists = items.some((it) => it.id === book.id);
  if (exists) return { ok: false, reason: "EXISTS" };

  items.push({ ...book, qty: 1 });
  setCartItems(items);

  return { ok: true };
}

// ---- render
function render(book) {
  document.querySelector(".book-title").textContent = book.title;

  const cover = document.querySelector(".book-cover");
  cover.src = book.image;
  cover.alt = book.title;

  // 페이지 제목
  document.title = `${book.title} 상세페이지`;

  //오른쪽 박스 제목, 지은이
  const Rtitle = document.querySelector(".side-title");
  if (Rtitle) Rtitle.textContent = `${book.title}`;

  const Rauthor = document.querySelector(".side-author");
  if (Rauthor) Rauthor.textContent = `${book.author}`;

  //카테고리
  const Rcategory = document.querySelector(".side-category");
  if (!book.category) {
    Rcategory.textContent = "카테고리 : BEST 도서";
  } else {
    Rcategory.textContent = `카테고리 : ${book.category}`;
  }

  // 가격
  const priceLine = document.querySelector(".side-price");
  if (priceLine) priceLine.textContent = `${won(book.price)}`;

  const subnavPrice = document.querySelector(".subnavRprice");
  if (subnavPrice) subnavPrice.textContent = `${won(book.price)}`;

  // 소개 영역
  const intro = document.querySelector("#intro .muted");
  intro.textContent =
    "〈마스터셰프 코리아2〉의 우승자이자 〈흑백요리사〉 〈냉장고를 부탁해〉 등에 출연한 셰프 최강록의 자전적 에세이. 음식, 요리, 식당, 요리사라는 네 가지 키워드로 지난날과 지금의 일상을 담았다. 요리사라는 직업인으로서, 먹는 것을 좋아하는 평범한 생활인으로서 잔잔하면서도 솔직하게 써내려간 기쁨과 슬픔, 희망과 걱정이 독자들의 몰입과 공감을 높인다. 이 책 곳곳에 돋보이는 최강록 특유의 유머 사이에 가슴 찡한 장면들이 반짝인다. 이 진솔한 에세이를 읽다보면 음식과 요리란 무엇인지, 일과 직업이란 무슨 의미인지 생각해보게 될 것이다.〈마스터셰프 코리아2〉의 우승자이자 〈흑백요리사〉 〈냉장고를 부탁해〉 등에 출연한 셰프 최강록의 자전적 에세이. 음식, 요리, 식당, 요리사라는 네 가지 키워드로 지난날과 지금의 일상을 담았다. 요리사라는 직업인으로서, 먹는 것을 좋아하는 평범한 생활인으로서 잔잔하면서도 솔직하게 써내려간 기쁨과 슬픔, 희망과 걱정이 독자들의 몰입과 공감을 높인다. 이 책 곳곳에 돋보이는 최강록 특유의 유머 사이에 가슴 찡한 장면들이 반짝인다. 이 진솔한 에세이를 읽다보면 음식과 요리란 무엇인지, 일과 직업이란 무슨 의미인지 생각해보게 될 것이다.〈마스터셰프 코리아2〉의 우승자이자 〈흑백요리사〉 〈냉장고를 부탁해〉 등에 출연한 셰프 최강록의 자전적 에세이. 음식, 요리, 식당, 요리사라는 네 가지 키워드로 지난날과 지금의 일상을 담았다. 요리사라는 직업인으로서, 먹는 것을 좋아하는 평범한 생활인으로서 잔잔하면서도 솔직하게 써내려간 기쁨과 슬픔, 희망과 걱정이 독자들의 몰입과 공감을 높인다. 이 책 곳곳에 돋보이는 최강록 특유의 유머 사이에 가슴 찡한 장면들이 반짝인다. 이 진솔한 에세이를 읽다보면 음식과 요리란 무엇인지, 일과 직업이란 무슨 의미인지 생각해보게 될 것이다.〈마스터셰프 코리아2〉의 우승자이자 〈흑백요리사〉 〈냉장고를 부탁해〉 등에 출연한 셰프 최강록의 자전적 에세이. 음식, 요리, 식당, 요리사라는 네 가지 키워드로 지난날과 지금의 일상을 담았다. 요리사라는 직업인으로서, 먹는 것을 좋아하는 평범한 생활인으로서 잔잔하면서도 솔직하게 써내려간 기쁨과 슬픔, 희망과 걱정이 독자들의 몰입과 공감을 높인다. 이 책 곳곳에 돋보이는 최강록 특유의 유머 사이에 가슴 찡한 장면들이 반짝인다. 이 진솔한 에세이를 읽다보면 음식과 요리란 무엇인지, 일과 직업이란 무슨 의미인지 생각해보게 될 것이다.〈마스터셰프 코리아2〉의 우승자이자 〈흑백요리사〉 〈냉장고를 부탁해〉 등에 출연한 셰프 최강록의 자전적 에세이. 음식, 요리, 식당, 요리사라는 네 가지 키워드로 지난날과 지금의 일상을 담았다. 요리사라는 직업인으로서, 먹는 것을 좋아하는 평범한 생활인으로서 잔잔하면서도 솔직하게 써내려간 기쁨과 슬픔, 희망과 걱정이 독자들의 몰입과 공감을 높인다. 이 책 곳곳에 돋보이는 최강록 특유의 유머 사이에 가슴 찡한 장면들이 반짝인다. 이 진솔한 에세이를 읽다보면 음식과 요리란 무엇인지, 일과 직업이란 무슨 의미인지 생각해보게 될 것이다.〈마스터셰프 코리아2〉의 우승자이자 〈흑백요리사〉 〈냉장고를 부탁해〉 등에 출연한 셰프 최강록의 자전적 에세이. 음식, 요리, 식당, 요리사라는 네 가지 키워드로 지난날과 지금의 일상을 담았다. 요리사라는 직업인으로서, 먹는 것을 좋아하는 평범한 생활인으로서 잔잔하면서도 솔직하게 써내려간 기쁨과 슬픔, 희망과 걱정이 독자들의 몰입과 공감을 높인다. 이 책 곳곳에 돋보이는 최강록 특유의 유머 사이에 가슴 찡한 장면들이 반짝인다. 이 진솔한 에세이를 읽다보면 음식과 요리란 무엇인지, 일과 직업이란 무슨 의미인지 생각해보게 될 것이다.";
}

//
//추천 도서()
//
function pickRecoBooks(currentBook, count = 5) {
  // 1) 베스트(true)만 후보로
  const pool = books
    .filter((b) => b.isBest === true)
    .filter((b) => b.id !== currentBook.id); // 자기 자신 제외

  // 2) 섞어서 count개
  const shuffled = pool.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function renderRecoBooks(list) {
  const row = document.getElementById("recoRow");
  if (!row) return;

  row.innerHTML = list
    .map(
      (b) => `
    <a class="reco-card" href="detailPage.html?id=${b.id}">
      <img src="${b.image}" alt="${b.title}">
      <div class="reco-title">${b.title}</div>
    </a>
  `,
    )
    .join("");
}

//리뷰 버튼
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btnReview")?.addEventListener("click", () => {
    alert("리뷰가 잘 전달되었습니다");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  if (!books || !Array.isArray(books)) {
    alert("books 데이터 로드 실패(books.js 경로/순서 확인)");
    return;
  }

  const id = getBookIdFromUrl();
  const book = getBookById(id);

  if (!book) {
    alert("존재하지 않는 상품입니다");
    location.href = "../domestic/domestic.html";
    return;
  }

  render(book);
  // leftbox
  // 장바구니 담기
  document.getElementById("btnAddCart").addEventListener("click", () => {
    const result = addToCartOnce(book);

    // 이미 담김이면 여기서 메시지 줄 수도 있음
    if (result.ok === false && result.reason === "EXISTS") {
      alert("이미 장바구니에 담긴 상품입니다");
    }

    const goCart = confirm("장바구니로 이동할까요?");
    if (goCart) location.href = "../cart/cart.html";
  });

  // 구매하기
  const buyBtn = document.getElementById("btnBuyNow");
  if (buyBtn) {
    buyBtn.addEventListener("click", () => {
      alert("구매 완료");
      location.href = "../myPage/myPage.html";
    });
  }

  // subnav
  // 장바구니 담기
  document.getElementById("btnAddCartsubnav").addEventListener("click", () => {
    const result = addToCartOnce(book);

    // 이미 담김이면 여기서 메시지 줄 수도 있음
    if (result.ok === false && result.reason === "EXISTS") {
      alert("이미 장바구니에 담긴 상품입니다");
    }

    const goCart = confirm("장바구니로 이동할까요?");
    if (goCart) location.href = "../cart/cart.html";
  });

  // 구매하기
  const buyBtnsubnav = document.getElementById("btnBuyNowsubnav");
  if (buyBtnsubnav) {
    buyBtnsubnav.addEventListener("click", () => {
      alert("구매 완료");
      location.href = "../myPage/myPage.html";
    });
  }

  //
  const ORDER_KEY = "orders";

  function getOrders() {
    const raw = localStorage.getItem(ORDER_KEY);
    return raw ? JSON.parse(raw) : [];
  }
  function setOrders(orders) {
    localStorage.setItem(ORDER_KEY, JSON.stringify(orders));
  }

  buyBtn.addEventListener("click", () => {
    const orders = getOrders();

    const order = {
      orderId: Date.now(),
      items: [
        {
          id: book.id,
          title: book.title,
          price: book.price,
          qty: 1,
          author: book.author,
          img: book.image,
        },
      ],
      total: book.price,
      orderedAt: new Date().toISOString(),
    };

    orders.push(order);
    setOrders(orders);
  });

  buyBtnsubnav.addEventListener("click", () => {
    const orders = getOrders();

    const order = {
      orderId: Date.now(),
      items: [
        {
          id: book.id,
          title: book.title,
          price: book.price,
          qty: 1,
          author: book.author,
          img: book.image,
        },
      ],
      total: book.price,
      orderedAt: new Date().toISOString(),
    };

    orders.push(order);
    setOrders(orders);
  });

  //

  // TOP 버튼(기존 유지)
  const toTopBtn = document.getElementById("toTopBtn");
  window.addEventListener("scroll", () => {
    toTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
  });
  toTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  //추천 도서 실행
  const recoList = pickRecoBooks(book, 5);
  renderRecoBooks(recoList);
});
