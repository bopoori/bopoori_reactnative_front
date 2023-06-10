import { Instance, SnapshotOut, types } from "mobx-state-tree"

export const UserStoreModel = types
  .model("UserStore")
  .props({
    userNickname: "",
    userId: "",
    userPw: "",
    userGender: "",
    userHeight: "",
    userWeight: "",
    otp: "",
  })
  .views((store) => ({
    get everything() {
      return {
        user_nickname: store.userNickname,
        user_id: store.userId,
        user_pw: store.userPw,
        user_gender: store.userGender,
        user_height: store.userHeight,
        user_weight: store.userWeight,
        otp: store.otp,
      }
    },
    get genderValidationError() {
      if (store.userGender === "") {
        return "성별은 필수 입력 항목입니다"
      }
      return ""
    },
    get heightValidationError() {
      if (store.userHeight === "") {
        return "키는 필수 입력 항목입니다"
      }
      if (Number(store.userHeight) > 300 || Number(store.userHeight) < 100) {
        return "올바른 키를 입력해주세요"
      }
      return ""
    },
    get weightValidationError() {
      if (store.userWeight === "") {
        return "몸무게는 필수 입력 항목입니다"
      }
      if (Number(store.userWeight) > 200 || Number(store.userWeight) < 20) {
        return "올바른 몸무게를 입력해주세요"
      }
      return ""
    },
    get nicknameValidationError() {
      if (store.userNickname === "") {
        return "닉네임은 필수 입력 항목입니다"
      }
      return ""
    },
    get passwordValidationError() {
      if (store.userPw === "") {
        return "비밀번호는 필수  입력 항목입니다"
      }
      if (
        !/^(?=(.*[a-zA-Z]){1,})(?=(.*\d){1,})(?=(.*[~!@#$%^&*()_+]){1,})[a-zA-Z\d~!@#$%^&*()_+]{8,25}$/.test(
          store.userPw,
        )
      )
        return "비밀번호는 영어, 숫자, 특수문자를 각각 하나 이상 포함하여 8자 이상 25자 미만으로 입력해주세요"
      return ""
    },
    get emailValidationError() {
      if (store.userId === "") {
        return "이메일은 필수  입력 항목입니다"
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(store.userId)) return "올바르지 않은 이메일 형식입니다"
      return ""
    },
  }))
  .actions((store) => ({
    setGender(value?: string) {
      store.userGender = value
    },
    setHeight(value?: string) {
      store.userHeight = value
    },
    setWeight(value?: string) {
      store.userWeight = value
    },
    setNickname(value?: string) {
      store.userNickname = value
    },
    setUserId(value?: string) {
      store.userId = value
    },
    setPw(value?: string) {
      store.userPw = value
    },
    setOtp(value?: string) {
      store.otp = value
    },
    cleanUp() {
      store.userGender = ""
      store.userHeight = ""
      store.userId = ""
      store.userNickname = ""
      store.userWeight = ""
    },
  }))

export interface UserStore extends Instance<typeof UserStoreModel> {}
export interface UserStoreSnapshot extends SnapshotOut<typeof UserStoreModel> {}
