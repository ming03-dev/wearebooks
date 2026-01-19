/**********************************************************
 * js 붙일 부분
- 상품 목록 영역: <tbody id = "cartTbody">
- 요약 영역: 상품 총 금액 <span id="grandTotal"></span>
- 컨트롤 영역: 선택 삭제(#btnDeleteSelected), 전체 삭제(#btnDeleteAll), 주문하기(#btnOrder), 쇼핑 계속하기(btnContinue)
 **********************************************************/
const testbook = {
  id: "0001",
  title: "테스트북",
  price: 15000,
  img: "../../assets/imgs/book1.jpg",
  detailUrl: "detailPage.html",
  category: "국내도서",
  author: "홍길동",
  qty: 1,
  // status: "주문완료",
};

/**********************************************************
 * [A] 상수/키
 **********************************************************/
const CART_KEY = "cartItems";
const ORDER_KEY = "orders";

/**********************************************************
 * [B] localStorage 유틸 (get/set)
 **********************************************************/
function getCartItems() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch (e) {
    console.log("JSON 파싱 실패:", e);
    return [];
  }
}

function setCartItems(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

const items = getCartItems();
console.log("items =", items);

/**********************************************************
 * [C] 렌더링 (tbody 채우기)
 **********************************************************/
// 1) tbody 찾기
const tbody = document.getElementById("cartTbody");

// 2) 비어있으면 안내 row
if (!items.length) {
  const row = tbody.insertRow();
  const cell = row.insertCell();
  cell.colSpan = 5;
  cell.textContent = "담은 상품이 없습니다.";
} else {
  items.forEach((item) => {
    const row = tbody.insertRow();
    row.dataset.id = item.id;

    // 체크박스
    const c0 = row.insertCell();
    c0.innerHTML = `<input type="checkbox" class="row-check">`;

    // 이미지
    const c1 = row.insertCell();
    c1.innerHTML = `<img src="${item.img}" class="bookImg img-fluid" />`;

    // 상품 정보
    const c2 = row.insertCell();
    c2.className = "text-start";
    c2.innerHTML = `
      <p><span class="bookName fw-bold">${item.title}</span></p>
      <p>${item.author}</p>
      <p class="price" data-price="${item.price}">
        ${item.price.toLocaleString()}원
      </p>
    `;

    // 수량
    const c3 = row.insertCell();
    c3.innerHTML = `
      <input type="number" class="form-control text-center mx-auto"
        style="max-width:80px" value="${item.qty}" min="1" />
    `;

    // 금액
    const c4 = row.insertCell();
    c4.className = "row-total-price";
    c4.textContent = (item.price * item.qty).toLocaleString() + "원";
  });
}

/**********************************************************
 * [D] 합계 계산/체크박스 상태 갱신
 **********************************************************/
// 체크박스 상태(전체선택) 갱신
function syncCheckAllState() {
  const checkAll = document.getElementById("checkAll");
  if (!checkAll) return;

  const selectable = Array.from(
    document.querySelectorAll("#cartTbody .row-check"),
  );
  const checkedCount = selectable.filter((cb) => cb.checked).length;

  checkAll.checked =
    selectable.length > 0 && checkedCount === selectable.length;
  checkAll.indeterminate = checkedCount > 0 && checkedCount < selectable.length;
}

// thead “전체 선택” 이벤트
const checkAll = document.getElementById("checkAll");

if (checkAll) {
  checkAll.addEventListener("change", () => {
    const checked = checkAll.checked;

    document.querySelectorAll("#cartTbody .row-check").forEach((cb) => {
      cb.checked = checked;
    });

    updateSelectedGrandTotal();
  });
}

tbody.addEventListener("change", (e) => {
  // 1) 개별 체크박스가 바뀐 경우
  if (e.target.classList.contains("row-check")) {
    updateSelectedGrandTotal();
    return;
  }

  // 2) 수량 input이 바뀐 경우: 행합계 다시 계산 → 선택된 합계도 갱신
  if (e.target.matches('input[type="number"]')) {
    const row = e.target.closest("tr");
    const id = row?.dataset?.id;
    if (!row || !id) return;

    const items = getCartItems();
    const item = items.find((it) => it.id === id);
    if (!item) return;

    const nextQty = Math.max(1, Number(e.target.value) || 1);
    item.qty = nextQty;
    setCartItems(items);

    // 행 합계 갱신 (5번째 칸)
    const rowTotal = item.price * item.qty;
    const cell = row.querySelector(".row-total-price") || row.cells?.[4];
    if (cell) cell.textContent = rowTotal.toLocaleString() + "원";
    updateSelectedGrandTotal();
  }
});

/* function updateGrandTotalAll() {
  const items = getCartItems();
  const total = items.reduce((sum, it) => sum + it.price * it.qty, 0);

  const el = document.getElementById("grandTotal");
  if (el) el.textContent = total.toLocaleString() + "원";
}
 */

function updateSelectedGrandTotal() {
  const cartItems = getCartItems();

  const selectedIds = Array.from(
    document.querySelectorAll("#cartTbody .row-check:checked"),
  )
    .map((chk) => chk.closest("tr")?.dataset?.id)
    .filter(Boolean);

  const total = cartItems
    .filter((it) => selectedIds.includes(it.id))
    .reduce((sum, it) => sum + it.price * it.qty, 0);

  const el = document.getElementById("grandTotal");
  if (el) el.textContent = total.toLocaleString() + "원";

  syncCheckAllState();
}

/**********************************************************
 * [E] 이벤트 바인딩 (checkAll, tbody change, btnOrder, btnDelete, btnMain)
 **********************************************************/
function resetCartUIState(hasItems) {
  const checkAll = document.getElementById("checkAll");

  // 1) 전체선택 체크 해제 + 비활성화 처리
  if (checkAll) {
    checkAll.checked = false;
    checkAll.indeterminate = false;
    checkAll.disabled = !hasItems;
  }

  // 2) 개별 체크박스 전부 해제
  document.querySelectorAll("#cartTbody .row-check").forEach((cb) => {
    cb.checked = false;
  });

  // 3) 선택 합계는 무조건 0원으로
  const el = document.getElementById("grandTotal");
  if (el) el.textContent = "0원";
}

// 장바구니 버튼 로직
function getOrders() {
  try {
    const raw = localStorage.getItem(ORDER_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch (e) {
    console.log("주문내역 JSON 파싱 실패:", e);
    return [];
  }
}

function setOrders(orders) {
  localStorage.setItem(ORDER_KEY, JSON.stringify(orders));
}

function calcTotal(items) {
  return items.reduce((sum, it) => sum + it.price * it.qty, 0);
}

const btnOrder = document.getElementById("btnOrder");
console.log("btnOrder 존재 여부 =", btnOrder); // 실행되는지 확인용

if (btnOrder) {
  btnOrder.addEventListener("click", () => {
    const cartItems = getCartItems();

    // 1) 체크된 행들의 id 수집
    const checkedRows = Array.from(
      document.querySelectorAll("#cartTbody .row-check:checked"),
    ).map((chk) => chk.closest("tr"));

    if (checkedRows.length === 0) {
      alert("주문할 상품을 선택해 주세요.");
      return;
    }

    const selectedIds = checkedRows.map((row) => row.dataset.id);

    // 2) 선택된 상품만 추출
    const selectedItems = cartItems.filter((it) => selectedIds.includes(it.id));

    if (selectedItems.length === 0) {
      // 보통 dataset.id 누락/렌더 문제일 때 여기에 걸림
      alert("선택된 상품 정보를 찾지 못했습니다. (row.dataset.id 확인)");
      return;
    }

    // 3) 주문 저장
    const order = {
      orderId: "o_" + Date.now(),
      orderedAt: new Date().toISOString(),
      items: selectedItems,
      totalPrice: calcTotal(selectedItems),
    };

    const orders = getOrders();
    orders.push(order);
    setOrders(orders);

    alert("주문완료!");

    // 4) (중요) 주문된 상품만 장바구니에서 제거
    const remainItems = cartItems.filter((it) => !selectedIds.includes(it.id));
    setCartItems(remainItems);

    // 마이페이지 이동
    location.href = "../myPage/myPage.html";
  });
}

// 메인으로 가기 버튼
const btnMain = document.getElementById("btnMain");

if (btnMain) {
  btnMain.addEventListener("click", () => {
    location.href = "../../index.html";
  });
}

// 삭제 버튼
function getSelectedIds() {
  return Array.from(document.querySelectorAll("#cartTbody .row-check:checked"))
    .map((cb) => cb.closest("tr")?.dataset?.id)
    .filter(Boolean);
}

const btnDelete = document.getElementById("btnDelete");

if (btnDelete) {
  btnDelete.addEventListener("click", () => {
    const selectedIds = getSelectedIds();

    if (selectedIds.length === 0) {
      alert("삭제할 상품을 선택해 주세요.");
      return;
    }

    const cartItems = getCartItems();
    const remainItems = cartItems.filter((it) => !selectedIds.includes(it.id));
    setCartItems(remainItems);

    selectedIds.forEach((id) => {
      const row = document.querySelector(`#cartTbody tr[data-id="${id}"]`);
      if (row) row.remove();
    });

    if (remainItems.length === 0) {
      tbody.innerHTML = "";
      const row = tbody.insertRow();
      const cell = row.insertCell();
      cell.colSpan = 5;
      cell.textContent = "담은 상품이 없습니다.";
    }

    resetCartUIState(getCartItems().length > 0);
  });
}

/**********************************************************
 * [F] 초기화/페이지 재진입(pageshow)
 **********************************************************/
window.addEventListener("pageshow", () => {
  resetCartUIState(getCartItems().length > 0);
});
// 렌더링 끝난 뒤 "초기 상태" 고정 (항상 0원 + checkAll 초기화)
resetCartUIState(items.length > 0); // (checkAll 해제 + 개별 체크 해제 + 0원 갱신)
