import { JWTToken } from '@/types/auth'
import { encrypt, decrypt } from './crypto'

const TOKEN_KEY = 'synaptic_auth_tokens'
const AUTO_LOGIN_KEY = 'synaptic_auto_login'

// 토큰 암호화하여 저장
export const saveTokens = (tokens: JWTToken): void => {
  const encrypted = encrypt(JSON.stringify(tokens))
  localStorage.setItem(TOKEN_KEY, encrypted)
}

// 토큰 복호화하여 조회
export const getTokens = (): JWTToken | null => {
  const encrypted = localStorage.getItem(TOKEN_KEY)
  if (!encrypted) return null
  
  try {
    const decrypted = decrypt(encrypted)
    return JSON.parse(decrypted)
  } catch (error) {
    console.error('Error decrypting tokens:', error)
    return null
  }
}

// 토큰 삭제
export const removeTokens = (): void => {
  localStorage.removeItem(TOKEN_KEY)
}

// 토큰 유효성 검사
export const isTokenValid = (token: JWTToken): boolean => {
  if (!token.accessToken || !token.expiresIn) return false
  
  const expirationTime = new Date(token.expiresIn).getTime()
  const currentTime = new Date().getTime()
  
  return currentTime < expirationTime
}

// 자동 로그인 설정 저장
export const setAutoLogin = (enabled: boolean): void => {
  localStorage.setItem(AUTO_LOGIN_KEY, JSON.stringify(enabled))
}

// 자동 로그인 설정 조회
export const getAutoLogin = (): boolean => {
  const value = localStorage.getItem(AUTO_LOGIN_KEY)
  return value ? JSON.parse(value) : false
}

// 디바이스 정보 가져오기
export const getDeviceInfo = () => {
  const userAgent = window.navigator.userAgent
  const browser = detectBrowser(userAgent)
  const os = detectOS(userAgent)
  const device = detectDevice(userAgent)
  
  return {
    browser,
    os,
    device,
    deviceId: generateDeviceId(browser, os, device)
  }
}

// 브라우저 감지
const detectBrowser = (userAgent: string): string => {
  if (userAgent.includes('Chrome')) return 'Chrome'
  if (userAgent.includes('Firefox')) return 'Firefox'
  if (userAgent.includes('Safari')) return 'Safari'
  if (userAgent.includes('Edge')) return 'Edge'
  return 'Unknown'
}

// OS 감지
const detectOS = (userAgent: string): string => {
  if (userAgent.includes('Windows')) return 'Windows'
  if (userAgent.includes('Mac')) return 'MacOS'
  if (userAgent.includes('Linux')) return 'Linux'
  if (userAgent.includes('Android')) return 'Android'
  if (userAgent.includes('iOS')) return 'iOS'
  return 'Unknown'
}

// 디바이스 타입 감지
const detectDevice = (userAgent: string): string => {
  if (userAgent.includes('Mobile')) return 'Mobile'
  if (userAgent.includes('Tablet')) return 'Tablet'
  return 'Desktop'
}

// 디바이스 ID 생성
const generateDeviceId = (browser: string, os: string, device: string): string => {
  const combined = `${browser}-${os}-${device}-${window.screen.width}x${window.screen.height}`
  return btoa(combined)
} 