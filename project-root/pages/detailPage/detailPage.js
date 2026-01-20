//localStorage.getItem("cartItems")

// detailPage.js
const books = window.books; // books.js가 먼저 로드되어 있어야 함

const CART_KEY = "cartItems";

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

    // 가격
    const priceLine = document.querySelector(".mini-info > div:nth-child(1)");
    if (priceLine) priceLine.textContent = `가격: ${won(book.price)}`;

    // 소개 영역
    const intro = document.querySelector("#intro .muted");
    intro.textContent = "〈마스터셰프 코리아2〉의 우승자이자 〈흑백요리사〉 〈냉장고를 부탁해〉 등에 출연한 셰프 최강록의 자전적 에세이. 음식, 요리, 식당, 요리사라는 네 가지 키워드로 지난날과 지금의 일상을 담았다. 요리사라는 직업인으로서, 먹는 것을 좋아하는 평범한 생활인으로서 잔잔하면서도 솔직하게 써내려간 기쁨과 슬픔, 희망과 걱정이 독자들의 몰입과 공감을 높인다. 이 책 곳곳에 돋보이는 최강록 특유의 유머 사이에 가슴 찡한 장면들이 반짝인다. 이 진솔한 에세이를 읽다보면 음식과 요리란 무엇인지, 일과 직업이란 무슨 의미인지 생각해보게 될 것이다.〈마스터셰프 코리아2〉의 우승자이자 〈흑백요리사〉 〈냉장고를 부탁해〉 등에 출연한 셰프 최강록의 자전적 에세이. 음식, 요리, 식당, 요리사라는 네 가지 키워드로 지난날과 지금의 일상을 담았다. 요리사라는 직업인으로서, 먹는 것을 좋아하는 평범한 생활인으로서 잔잔하면서도 솔직하게 써내려간 기쁨과 슬픔, 희망과 걱정이 독자들의 몰입과 공감을 높인다. 이 책 곳곳에 돋보이는 최강록 특유의 유머 사이에 가슴 찡한 장면들이 반짝인다. 이 진솔한 에세이를 읽다보면 음식과 요리란 무엇인지, 일과 직업이란 무슨 의미인지 생각해보게 될 것이다.〈마스터셰프 코리아2〉의 우승자이자 〈흑백요리사〉 〈냉장고를 부탁해〉 등에 출연한 셰프 최강록의 자전적 에세이. 음식, 요리, 식당, 요리사라는 네 가지 키워드로 지난날과 지금의 일상을 담았다. 요리사라는 직업인으로서, 먹는 것을 좋아하는 평범한 생활인으로서 잔잔하면서도 솔직하게 써내려간 기쁨과 슬픔, 희망과 걱정이 독자들의 몰입과 공감을 높인다. 이 책 곳곳에 돋보이는 최강록 특유의 유머 사이에 가슴 찡한 장면들이 반짝인다. 이 진솔한 에세이를 읽다보면 음식과 요리란 무엇인지, 일과 직업이란 무슨 의미인지 생각해보게 될 것이다.〈마스터셰프 코리아2〉의 우승자이자 〈흑백요리사〉 〈냉장고를 부탁해〉 등에 출연한 셰프 최강록의 자전적 에세이. 음식, 요리, 식당, 요리사라는 네 가지 키워드로 지난날과 지금의 일상을 담았다. 요리사라는 직업인으로서, 먹는 것을 좋아하는 평범한 생활인으로서 잔잔하면서도 솔직하게 써내려간 기쁨과 슬픔, 희망과 걱정이 독자들의 몰입과 공감을 높인다. 이 책 곳곳에 돋보이는 최강록 특유의 유머 사이에 가슴 찡한 장면들이 반짝인다. 이 진솔한 에세이를 읽다보면 음식과 요리란 무엇인지, 일과 직업이란 무슨 의미인지 생각해보게 될 것이다.〈마스터셰프 코리아2〉의 우승자이자 〈흑백요리사〉 〈냉장고를 부탁해〉 등에 출연한 셰프 최강록의 자전적 에세이. 음식, 요리, 식당, 요리사라는 네 가지 키워드로 지난날과 지금의 일상을 담았다. 요리사라는 직업인으로서, 먹는 것을 좋아하는 평범한 생활인으로서 잔잔하면서도 솔직하게 써내려간 기쁨과 슬픔, 희망과 걱정이 독자들의 몰입과 공감을 높인다. 이 책 곳곳에 돋보이는 최강록 특유의 유머 사이에 가슴 찡한 장면들이 반짝인다. 이 진솔한 에세이를 읽다보면 음식과 요리란 무엇인지, 일과 직업이란 무슨 의미인지 생각해보게 될 것이다.〈마스터셰프 코리아2〉의 우승자이자 〈흑백요리사〉 〈냉장고를 부탁해〉 등에 출연한 셰프 최강록의 자전적 에세이. 음식, 요리, 식당, 요리사라는 네 가지 키워드로 지난날과 지금의 일상을 담았다. 요리사라는 직업인으로서, 먹는 것을 좋아하는 평범한 생활인으로서 잔잔하면서도 솔직하게 써내려간 기쁨과 슬픔, 희망과 걱정이 독자들의 몰입과 공감을 높인다. 이 책 곳곳에 돋보이는 최강록 특유의 유머 사이에 가슴 찡한 장면들이 반짝인다. 이 진솔한 에세이를 읽다보면 음식과 요리란 무엇인지, 일과 직업이란 무슨 의미인지 생각해보게 될 것이다."
}

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

    // 장바구니 담기
    document.getElementById("btnAddCart").addEventListener("click", () => {
        const result = addToCartOnce(book);

        // 이미 담김이면 여기서 메시지 줄 수도 있음
        if (result.ok === false && result.reason === "EXISTS") {
            // alert("이미 장바구니에 담긴 상품입니다");
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

    // TOP 버튼(기존 유지)
    const toTopBtn = document.getElementById("toTopBtn");
    window.addEventListener("scroll", () => {
        toTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
    });
    toTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});

