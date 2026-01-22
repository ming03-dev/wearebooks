// assets/js/header.js

function initHeader() {
  const loginBtn = document.getElementById("loginBtn");

  const userMenu = document.getElementById("userMenu");
  const userHello = document.getElementById("userHello");
  const logoutBtn = document.getElementById("logoutBtn");

  const myPageLink = document.getElementById("myPageLink");
  const cartLink = document.getElementById("cartLink");

  const loginModal = document.getElementById("loginModal");
  const loginModalOverlay = document.getElementById("loginModalOverlay");
  const loginModalClose = document.getElementById("loginModalClose");

  // --- 안전장치: 헤더가 없는 페이지면 그냥 종료 ---
  if (!loginBtn || !loginModal) return;

  function isLoggedIn() {
    return Boolean(localStorage.getItem("accessToken"));
  }

  function getUserId() {
    return localStorage.getItem("loginUserId") || "";
  }

  function renderHeaderUI() {
    const loggedIn = isLoggedIn();

    if (loggedIn) {
      loginBtn.classList.add("is-hidden");
      userMenu?.classList.remove("is-hidden");

      const id = getUserId();
      if (userHello) userHello.textContent = id ? `${id}님` : "로그인됨";
    } else {
      loginBtn.classList.remove("is-hidden");
      userMenu?.classList.add("is-hidden");
      if (userHello) userHello.textContent = "";
    }
  }

  function openLoginModal() {
    loginModal.classList.remove("is-hidden");
    document.body.style.overflow = "hidden";
  }

  function closeLoginModal() {
    loginModal.classList.add("is-hidden");
    document.body.style.overflow = "";
  }

  // 이벤트
  loginBtn.addEventListener("click", openLoginModal);
  loginModalOverlay?.addEventListener("click", closeLoginModal);
  loginModalClose?.addEventListener("click", closeLoginModal);

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !loginModal.classList.contains("is-hidden")) {
      closeLoginModal();
    }
  });

  // 로그아웃
  logoutBtn?.addEventListener("click", () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("loginUserId");

    renderHeaderUI();

    if (location.protocol === "file:") {
      // file:// 환경
      location.href = "../../index.html";
    } else {
      // http:// 서버 환경
      location.replace("/index.html");
    }
  });

  // 보호 링크
  function protectLink(e) {
    if (!isLoggedIn()) {
      e.preventDefault();
      openLoginModal();
    }
  }
  myPageLink?.addEventListener("click", protectLink);
  cartLink?.addEventListener("click", protectLink);

  // iframe 로그인 성공 메시지 수신
  window.addEventListener("message", (event) => {
    if (event.data?.type !== "LOGIN_SUCCESS") return;

    if (event.data.userId) {
      localStorage.setItem("loginUserId", event.data.userId);
    }

    closeLoginModal();
    renderHeaderUI();
  });

  renderHeaderUI();
}

// DOM 다 그려진 후에 실행 (각 페이지에 헤더가 직접 있으니까 이게 정답)
document.addEventListener("DOMContentLoaded", initHeader);
