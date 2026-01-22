// assets/js/login.js
// login.html 전용: 가입된 계정(users)으로만 로그인 허용
// 성공 시: accessToken + loginUserId 저장
// iframe(모달)인 경우: 부모에게 LOGIN_SUCCESS postMessage

const form = document.getElementById("loginform");
const idInput = document.getElementById("floatingInput");
const pwInput = document.getElementById("floatingPassword");
const commonError = document.getElementById("commonError");

function getUsers() {
  try {
    return JSON.parse(localStorage.getItem("users")) || [];
  } catch {
    return [];
  }
}

function showCommonError(msg) {
  if (!commonError) return;
  commonError.textContent = msg;
  commonError.style.display = "block";
}

function hideCommonError() {
  if (!commonError) return;
  commonError.textContent = "아이디 혹은 비밀번호를 입력해주세요.";
  commonError.style.display = "none";
}

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const id = (idInput?.value || "").trim();
    const pw = (pwInput?.value || "").trim();

    // 1) 입력 검증
    if (!id || !pw) {
      showCommonError("아이디 혹은 비밀번호를 입력해주세요.");
      return;
    }

    // 2) 가입된 사용자 목록에서 매칭
    const users = getUsers();
    const found = users.find((u) => u.id === id && u.pw === pw);

    if (!found) {
      showCommonError("아이디 또는 비밀번호가 올바르지 않습니다.");
      return;
    }

    hideCommonError();

    // 3) 로그인 성공 처리: 토큰/유저정보 저장
    const token = `token_${Date.now()}`;
    localStorage.setItem("accessToken", token);
    localStorage.setItem("loginUserId", found.id);
    localStorage.setItem("loginUserName", found.name || ""); // (선택) 이름도 저장

    // 4) iframe(모달)에서 열린 경우: 부모(index/domestic 등)에 알림
    if (window.parent && window.parent !== window) {
      window.parent.postMessage(
        { type: "LOGIN_SUCCESS", userId: found.id },
        "*"
      );
      return;
    }

    // 5) 단독 페이지로 열린 경우: 메인으로 이동(경로는 너 프로젝트에 맞게)
    location.href = "../index.html";
  });
}
