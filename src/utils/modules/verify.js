export const rules = {
  /**
   * 身份证
   */
  ID: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
  /**
   * 手机号
   */
  mobilePhone: /^1[3456789]\d{9}$/,
  /**
   * 邮箱
   */
  email: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
}

const Verify = {
  isMobilePhone(val) {
    return rules.mobilePhone.test(val)
  },
  isID(val) {
    return rules.ID.test(val)
  },
  isEmail(val) {
    return rules.email.test(val)
  }
}

export default Verify
