// 암호화 키 (실제 프로덕션에서는 환경 변수로 관리)
const CRYPTO_KEY = 'synaptic-secret-key'

// 암호화
export const encrypt = (text: string): string => {
  try {
    // 간단한 base64 인코딩 (실제 프로덕션에서는 더 강력한 암호화 사용)
    return btoa(text)
  } catch (error) {
    console.error('Encryption error:', error)
    return text
  }
}

// 복호화
export const decrypt = (encrypted: string): string => {
  try {
    // base64 디코딩
    return atob(encrypted)
  } catch (error) {
    console.error('Decryption error:', error)
    return encrypted
  }
} 