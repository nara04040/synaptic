# Synaptic Design System

## 1. 디자인 원칙

### 1.1 핵심 원칙
1. **연결성 (Connectivity)**
   - 지식과 개념 간의 연결을 시각적으로 표현
   - 관계성을 직관적으로 이해할 수 있는 디자인
   - 시각적 계층구조를 통한 학습 경로 표현

2. **진보성 (Progression)**
   - 학습 진행 상태를 명확하게 시각화
   - 성취감을 강화하는 시각적 피드백
   - 단계별 성장을 표현하는 마이크로 인터랙션

3. **집중성 (Focus)**
   - 핵심 학습 내용에 집중할 수 있는 여백 활용
   - 불필요한 시각적 요소 최소화
   - 학습 컨텍스트에 맞는 UI 전환

4. **일관성 (Consistency)**
   - 통일된 시각 언어 사용
   - 예측 가능한 인터랙션 패턴
   - 학습 경험의 연속성 유지

## 2. 색상 시스템

### 2.1 브랜드 컬러
```css
/* Primary Colors - Light Mode */
--primary-100: #E3F2FD;
--primary-300: #64B5F6;
--primary-500: #2196F3; /* 메인 브랜드 컬러 */
--primary-700: #1976D2;
--primary-900: #0D47A1;

/* Primary Colors - Dark Mode */
--primary-dark-100: #1A2C42;
--primary-dark-300: #1E4976;
--primary-dark-500: #90CAF9; /* 다크모드 메인 브랜드 컬러 */
--primary-dark-700: #B3E5FC;
--primary-dark-900: #E1F5FE;

/* Secondary Colors - Light Mode */
--secondary-100: #F3E5F5;
--secondary-300: #BA68C8;
--secondary-500: #9C27B0;
--secondary-700: #7B1FA2;
--secondary-900: #4A148C;

/* Secondary Colors - Dark Mode */
--secondary-dark-100: #2A1B2D;
--secondary-dark-300: #4A2F50;
--secondary-dark-500: #CE93D8;
--secondary-dark-700: #E1BEE7;
--secondary-dark-900: #F3E5F5;
```

### 2.2 시스템 컬러
```css 
/* Semantic Colors - Light Mode */
--success-light: #4CAF50;
--warning-light: #FFC107;
--error-light: #F44336;
--info-light: #2196F3;

/* Semantic Colors - Dark Mode */
--success-dark: #81C784;
--warning-dark: #FFD54F;
--error-dark: #E57373;
--info-dark: #64B5F6;

/* Neutral Colors - Light Mode */
--neutral-light-100: #FFFFFF;
--neutral-light-200: #F5F5F5;
--neutral-light-300: #E0E0E0;
--neutral-light-400: #BDBDBD;
--neutral-light-500: #9E9E9E;
--neutral-light-600: #757575;
--neutral-light-700: #616161;
--neutral-light-800: #424242;
--neutral-light-900: #212121;

/* Neutral Colors - Dark Mode */
--neutral-dark-100: #121212;
--neutral-dark-200: #1E1E1E;
--neutral-dark-300: #282828;
--neutral-dark-400: #404040;
--neutral-dark-500: #606060;
--neutral-dark-600: #808080;
--neutral-dark-700: #A0A0A0;
--neutral-dark-800: #C0C0C0;
--neutral-dark-900: #E0E0E0;
```

### 2.3 테마 시스템
```css
/* Light Theme */
.theme-light {
    /* Background Colors */
    --background-primary: var(--neutral-light-100);
    --background-secondary: var(--neutral-light-200);
    --background-tertiary: var(--neutral-light-300);
    
    /* Surface Colors */
    --surface-primary: var(--neutral-light-100);
    --surface-secondary: var(--neutral-light-200);
    --surface-elevated: var(--neutral-light-100);
    
    /* Text Colors */
    --text-primary: var(--neutral-light-900);
    --text-secondary: var(--neutral-light-700);
    --text-tertiary: var(--neutral-light-500);
    --text-inverse: var(--neutral-light-100);
    
    /* Border Colors */
    --border-primary: var(--neutral-light-300);
    --border-secondary: var(--neutral-light-200);
    
    /* Interactive Colors */
    --interactive-primary: var(--primary-500);
    --interactive-primary-hover: var(--primary-700);
    --interactive-secondary: var(--secondary-500);
    --interactive-secondary-hover: var(--secondary-700);
}
```

```css
/* Dark Theme */
.theme-dark {
    /* Background Colors */
    --background-primary: var(--neutral-dark-100);
    --background-secondary: var(--neutral-dark-200);
    --background-tertiary: var(--neutral-dark-300);
    
    /* Surface Colors */
    --surface-primary: var(--neutral-dark-200);
    --surface-secondary: var(--neutral-dark-300);
    --surface-elevated: var(--neutral-dark-400);
    
    /* Text Colors */
    --text-primary: var(--neutral-dark-900);
    --text-secondary: var(--neutral-dark-700);
    --text-tertiary: var(--neutral-dark-500);
    --text-inverse: var(--neutral-dark-100);
    
    /* Border Colors */
    --border-primary: var(--neutral-dark-400);
    --border-secondary: var(--neutral-dark-300);
    
    /* Interactive Colors */
    --interactive-primary: var(--primary-dark-500);
    --interactive-primary-hover: var(--primary-dark-700);
    --interactive-secondary: var(--secondary-dark-500);
    --interactive-secondary-hover: var(--secondary-dark-700);
}
```

### 2.4 컴포넌트별 테마 적용
```css
/* Card Component */
.card {
    background-color: var(--surface-primary);
    border: 1px solid var(--border-primary);
    color: var(--text-primary);
    box-shadow: var(--shadow-md);
}

/* Button Component */
.button-primary {
    background-color: var(--interactive-primary);
    color: var(--text-inverse);
}

.button-primary:hover {
    background-color: var(--interactive-primary-hover);
}

/* Input Component */
.input {
    background-color: var(--surface-primary);
    border: 1px solid var(--border-primary);
    color: var(--text-primary);
}

.input:focus {
    border-color: var(--interactive-primary);
    box-shadow: 0 0 0 2px var(--interactive-primary-hover);
}

/* Navigation Component */
.nav {
    background-color: var(--surface-primary);
    border-bottom: 1px solid var(--border-primary);
}

/* Modal Component */
.modal {
    background-color: var(--surface-elevated);
    border: 1px solid var(--border-primary);
    box-shadow: var(--shadow-lg);
}
```

## 3. 타이포그래피

### 3.1 폰트 패밀리
```css
/* Font Families */
--font-primary: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto;
--font-code: 'JetBrains Mono', monospace;
```

### 3.2 타입 스케일
```css
/* Type Scale */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
```

### 3.3 텍스트 스타일
```css
/* Text Styles */
--text-heading: {
  font-family: var(--font-primary);
  font-weight: 700;
  letter-spacing: -0.02em;
}

--text-body: {
  font-family: var(--font-primary);
  font-weight: 400;
  letter-spacing: -0.01em;
  line-height: 1.6;
}

--text-code: {
  font-family: var(--font-code);
  font-weight: 400;
}
```

## 4. 스페이싱 시스템

### 4.1 기본 스페이싱
```css
/* Spacing Scale */
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
--space-12: 3rem;    /* 48px */
--space-16: 4rem;    /* 64px */
```

### 4.2 레이아웃 스페이싱
```css
/* Layout Spacing */
--layout-xs: 1rem;     /* 16px */
--layout-sm: 1.5rem;   /* 24px */
--layout-md: 2rem;     /* 32px */
--layout-lg: 3rem;     /* 48px */
--layout-xl: 4rem;     /* 64px */
```

## 5. 컴포넌트 시스템

### 5.1 카드
```css
/* Card Styles */
--card-padding: var(--space-4);
--card-radius: 12px;
--card-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--card-border: 1px solid var(--neutral-200);
```

### 5.2 버튼
```css
/* Button Styles */
--button-height-sm: 32px;
--button-height-md: 40px;
--button-height-lg: 48px;
--button-radius: 8px;
--button-padding: 0 var(--space-4);
```

### 5.3 입력 필드
```css
/* Input Styles */
--input-height: 40px;
--input-radius: 8px;
--input-border: 1px solid var(--neutral-300);
--input-padding: 0 var(--space-3);
```

## 6. 애니메이션

### 6.1 트랜지션
```css
/* Transitions */
--transition-fast: 150ms ease;
--transition-base: 250ms ease;
--transition-slow: 350ms ease;
```

### 6.2 애니메이션
```css
/* Animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}
```

## 7. 반응형 디자인

### 7.1 브레이크포인트
```css
/* Breakpoints */
--breakpoint-sm: 640px;  /* Mobile */
--breakpoint-md: 768px;  /* Tablet */
--breakpoint-lg: 1024px; /* Desktop */
--breakpoint-xl: 1280px; /* Large Desktop */
```

### 7.2 컨테이너
```css
/* Containers */
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1280px;
```

## 8. 접근성

### 8.1 포커스 스타일
```css
/* Focus Styles */
--focus-ring: 0 0 0 2px var(--primary-500);
--focus-ring-offset: 2px;
```

### 8.2 시각적 계층
```css
/* Visual Hierarchy */
--z-negative: -1;
--z-base: 0;
--z-dropdown: 1000;
--z-sticky: 1100;
--z-modal: 1200;
--z-popover: 1300;
--z-tooltip: 1400;
```

## 9. 특수 효과

### 9.1 그래디언트
```css
/* Gradients */
--gradient-primary: linear-gradient(135deg, var(--primary-500), var(--primary-700));
--gradient-secondary: linear-gradient(135deg, var(--secondary-500), var(--secondary-700));
```

### 9.2 그림자
```css
/* Shadows */
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
```

이 디자인 시스템은 Synaptic의 학습 중심 UX를 지원하도록 설계되었습니다. 특히 학습 경험의 연속성, 집중도, 그리고 성취감을 강화하는 데 중점을 두었습니다. 모든 디자인 요소는 일관된 사용자 경험을 제공하면서도 학습 컨텍스트에 따라 적절히 변화할 수 있도록 구성되어 있습니다.
