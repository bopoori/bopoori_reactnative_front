import { Translations } from "./en"

const ko: Translations = {
  common: {
    ok: "확인!",
    cancel: "취소",
    back: "뒤로",
    logOut: "로그아웃",
  },
  navigator: {
    homeTab: "홈",
    closetTab: "옷장",
    tipsTab: "팁",
    myTab: "마이",
  },
  welcomeScreen: {
    postscript:
      "보풀은 여러분의 옷장 속 아이템들을 앱으로 옮겨서 한 눈에 볼 수 있도록 도와주고, 미리 입을 옷들의 조합을 정해두거나 옷장 속에서 빛을 보지 못한 옷들을 더 자주 입을 수 있게 도와주는 앱이에요. 이제 시작해볼까요?",
    welcome: "환영해요!",
    exciting:
      "반가워요 저는 보푸리에요. 아래의 방법 중 하나를 통해 보풀 서비스를 이용하실 수 있답니다!",
    signUp: "새롭게 회원 가입하기",
    kakaoLogin: "카카오 계정으로 로그인 하기",
    emailLogin: "이메일로 로그인 하기",
  },
  loginScreen: {
    signIn: "로그인",
    enterDetails: "보풀 서비스를 이용하기 위해서 먼저 로그인이 필요해요.",
    emailFieldLabel: "이메일",
    passwordFieldLabel: "비밀번호",
    emailFieldPlaceholder: "이메일을 입력하세요",
    passwordFieldPlaceholder: "비밀번호를 입력하세요",
    tapToSignIn: "눌러서 로그인 하기!",
    hint: "힌트: 가장 좋아하는 암호와 아무런 아무 이메일 주소나 사용할 수 있어요 :)",
  },
  errorScreen: {
    title: "뭔가 잘못되었습니다!",
    friendlySubtitle:
      "이 화면은 오류가 발생할 때 프로덕션에서 사용자에게 표시됩니다. 이 메시지를 커스터마이징 할 수 있고(해당 파일은 `app/i18n/ko.ts` 에 있습니다) 레이아웃도 마찬가지로 수정할 수 있습니다(`app/screens/error`). 만약 이 오류화면을 완전히 없에버리고 싶다면 `app/app.tsx` 파일에서 <ErrorBoundary> 컴포넌트를 확인하기 바랍니다.",
    reset: "초기화",
  },
  emptyStateComponent: {
    generic: {
      heading: "너무 텅 비어서.. 너무 슬퍼요..",
      content: "데이터가 없습니다. 버튼을 눌러서 리프레쉬 하시거나 앱을 리로드하세요.",
      button: "다시 시도해봅시다",
    },
  },
}

export default ko
