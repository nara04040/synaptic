# 시냅스 기반 지식 연결 플랫폼 상세 기획서

## 1. 서비스 상세 정의

### 1.1 서비스명: "Synaptic" (시냅틱)
- 태그라인: "지식을 연결하여 더 깊은 이해를 만들다"

### 1.2 서비스 목적
- 개념 간 연결을 통한 직관적 이해 도모
- 시각적 시냅스 맵을 통한 지식 구조화
- 연결 기반 학습을 통한 장기 기억 형성
- 개인화된 지식 네트워크 구축

### 1.3 타겟 사용자
1. 주 타겟
   - 개발 지식을 체계화하려는 개발자
   - 개념 간 연결을 중시하는 학습자
   - 직관적 이해를 추구하는 학습자

2. 부 타겟
   - 지식 구조화에 관심 있는 교육자
   - 팀 지식 관리가 필요한 개발팀
   - 개념 설명이 필요한 기술 작가

## 2. 핵심 기능 상세

### 2.1 시냅스 맵 시스템

#### A. 노드 시스템
1. 노드 타입
   ```typescript
   interface Node {
     id: string;
     type: 'concept' | 'implementation' | 'example' | 'question';
     title: string;
     summary: string;
     tags: string[];
     strength: number; // 이해도/숙련도 (0-100)
     metadata: {
       created: Date;
       lastReviewed: Date;
       complexity: number;
       prerequisites: string[];
     };
   }
   ```

2. 연결 시스템
   ```typescript
   interface Connection {
     id: string;
     sourceId: string;
     targetId: string;
     type: 'prerequisite' | 'related' | 'extends' | 'implements';
     strength: number;  // 연결 강도
     explanation: string; // 연결 이유
     bidirectional: boolean;
     metadata: {
       created: Date;
       lastStrengthened: Date;
       references: string[];
     };
   }
   ```

#### B. 시각화 시스템
1. 뉴런 모드
   ```typescript
   interface NeuralView {
     mode: 'neural';
     options: {
       pulseEffect: boolean;
       strengthVisualization: 'thickness' | 'color' | 'both';
       animationSpeed: number;
       focusHighlight: boolean;
     };
   }
   ```

2. 마인드맵 모드
   ```typescript
   interface MindMapView {
     mode: 'mindmap';
     options: {
       layout: 'radial' | 'horizontal' | 'vertical';
       grouping: boolean;
       expandLevels: number;
       minimap: boolean;
     };
   }
   ```

### 2.2 노트 시스템

#### A. 노트 구조
```typescript
interface Note {
  id: string;
  type: 'detail' | 'example' | 'interview' | 'code';
  content: {
    markdown: string;
    codeBlocks: CodeBlock[];
    attachments: Attachment[];
  };
  linkedNodes: {
    nodeId: string;
    relevance: number;
    context: string;
  }[];
  metadata: {
    created: Date;
    lastModified: Date;
    tags: string[];
    visibility: 'private' | 'public' | 'shared';
  };
}
```

#### B. 노트 템플릿
1. 개념 정의 템플릿
   ```typescript
   interface ConceptTemplate {
     definition: string;
     keyPoints: string[];
     examples: string[];
     commonMisconceptions: string[];
     practicalApplications: string[];
   }
   ```

2. 구현 예시 템플릿
   ```typescript
   interface ImplementationTemplate {
     problem: string;
     approach: string;
     codeExample: string;
     edgeCases: string[];
     optimizations: string[];
   }
   ```

### 2.3 블로그 시스템

#### A. 블로그 포스트 구조
```typescript
interface BlogPost {
  id: string;
  type: 'explanation' | 'deep-dive' | 'connection-story';
  content: {
    markdown: string;
    synapseMapSnapshot: {
      nodes: string[];
      connections: string[];
      focusNode: string;
    };
  };
  metadata: {
    seo: SEOData;
    publishStatus: 'draft' | 'published';
    visibility: 'public' | 'private' | 'shared';
  };
}
```

#### B. 시냅스 맵 통합
```typescript
interface MapIntegration {
  embedType: 'static' | 'interactive';
  highlightPath: string[];
  focusNodes: string[];
  interactiveOptions: {
    allowExploration: boolean;
    showDetails: boolean;
    allowEditing: boolean;
  };
}
```

## 3. 기술 아키텍처

### 3.1 프론트엔드
```typescript
// 기술 스택
- React + TypeScript
- D3.js/Three.js (시냅스 맵 시각화)
- TailwindCSS + shadcn/ui (UI 컴포넌트)
- Zustand (상태 관리)
- TanStack Query (데이터 페칭)
- Monaco Editor (코드 에디터)
```

### 3.2 백엔드
```typescript
// 기술 스택
- Node.js + NestJS
- Neo4j (그래프 데이터베이스)
- PostgreSQL (관계형 데이터)
- Redis (캐싱)
- Socket.io (실시간 통신)
```

## 4. 데이터 모델

### 4.1 그래프 데이터 모델
```typescript
interface GraphModel {
  nodes: {
    concepts: ConceptNode[];
    implementations: ImplementationNode[];
    examples: ExampleNode[];
  };
  edges: {
    connections: Connection[];
    references: Reference[];
  };
  metadata: {
    version: string;
    lastModified: Date;
    stats: GraphStats;
  };
}
```

### 4.2 문서 데이터 모델
```typescript
interface DocumentModel {
  notes: Note[];
  blogs: BlogPost[];
  templates: Template[];
  attachments: Attachment[];
}
```

## 5. UI/UX 상세 설계

### 5.1 시냅스 맵 인터페이스
1. 메인 캔버스
   - 줌 인/아웃 컨트롤
   - 노드 드래그 앤 드롭
   - 연결선 생성/편집
   - 미니맵 네비게이션

2. 노드 상세 패널
   - 노드 정보 표시/편집
   - 연결된 노트/블로그 목록
   - 이해도 업데이트
   - 연결 관리

### 5.2 노트 에디터
1. 분할 뷰
   - 마크다운 에디터
   - 실시간 프리뷰
   - 시냅스 맵 미니뷰
   - 연결된 노드 목록

2. 도구 모음
   - 서식 도구
   - 코드 블록
   - 파일 첨부
   - 노드 링크

## 6. 개발 단계별 계획

### 6.1 Phase 1: MVP (1개월)
- 기본 시냅스 맵 생성/편집
- 노드 및 연결 관리
- 기본 노트 작성
- 시각화 기초 기능

### 6.2 Phase 2: 고도화 (2개월)
- 고급 시각화 기능
- 노트-맵 연동 강화
- 블로그 시스템 통합
- 실시간 협업 기능

### 6.3 Phase 3: 확장 (3개월)
- AI 기반 연결 추천
- 고급 분석 기능
- API 개발
- 성능 최적화

이 상세 기획서는 시냅스 기반 지식 연결 플랫폼의 구체적인 구현 방향을 제시합니다. 각 섹션은 실제 개발에 필요한 상세 스펙을 포함하며, 단계별 구현 계획을 통해 체계적인 개발이 가능하도록 구성되어 있습니다.
