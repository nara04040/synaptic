# Synaptic - 상세 유저 플로우

## 1. 최초 진입 및 온보딩 (First-time User Flow)

### A. 서비스 진입
1. **앱 실행 및 회원가입**
   ```typescript
   interface OnboardingFlow {
     step1: {
       action: "회원가입/로그인 선택";
       options: ['이메일', 'Google', 'GitHub'];
       duration: "1-2분";
     };
     step2: {
       action: "학습 스타일 설정";
       options: [
         '시각적 학습자',
         '연결 중심 학습자',
         '실습 중심 학습자'
       ];
     };
     step3: {
       action: "관심 분야 선택";
       fields: {
         mainField: string;    // 주 관심 분야
         subFields: string[];  // 부 관심 분야
         experience: number;   // 경험 수준 (1-5)
       };
     };
   }
   ```

### B. 시냅스 맵 튜토리얼
1. **기본 사용법 안내**
   ```typescript
   interface TutorialFlow {
     steps: [
       {
         step: "노드 생성";
         action: "첫 개념 노드 생성하기";
         guidance: "핵심 개념을 노드로 생성해보세요";
       },
       {
         step: "연결 생성";
         action: "노드 간 연결 만들기";
         guidance: "관련 개념을 연결해보세요";
       },
       {
         step: "노트 연결";
         action: "노드에 상세 내용 추가";
         guidance: "개념에 대한 설명을 작성해보세요";
       }
     ];
     duration: "5-7분";
   }
   ```

## 2. 시냅스 맵 생성 및 확장 (Knowledge Building)

### A. 개념 노드 생성
1. **노드 생성 프로세스**
   ```typescript
   interface NodeCreationFlow {
     steps: {
       basic: {
         title: string;
         type: 'concept' | 'implementation' | 'example' | 'question';
         summary: string;
       };
       details: {
         tags: string[];
         complexity: number;
         importance: number;
       };
       connections: {
         relatedNodes: string[];
         connectionTypes: 'prerequisite' | 'related' | 'extends';
         connectionStrength: number;
       };
     };
   }
   ```

2. **연결 설정**
   ```typescript
   interface ConnectionFlow {
     selection: {
       sourceNode: string;
       targetNode: string;
       type: ConnectionType;
     };
     details: {
       strength: number;
       explanation: string;
       bidirectional: boolean;
     };
     visualization: {
       style: 'neural' | 'direct';
       thickness: number;
       animation: boolean;
     };
   }
   ```

### B. 지식 확장
1. **관련 개념 탐색**
   ```typescript
   interface ExplorationFlow {
     startPoint: string;  // 시작 노드
     exploration: {
       direction: 'upstream' | 'downstream' | 'related';
       depth: number;     // 탐색 깊이
       filter: {
         nodeTypes: NodeType[];
         minStrength: number;
       };
     };
     discovery: {
       suggestedNodes: Node[];
       suggestedConnections: Connection[];
     };
   }
   ```

## 3. 학습 및 복습 (Learning Process)

### A. 노드 학습
1. **학습 세션**
   ```typescript
   interface LearningFlow {
     node: {
       current: Node;
       relatedNotes: Note[];
       connections: Connection[];
     };
     activities: {
       reading: {
         content: string;
         estimatedTime: number;
       };
       practice: {
         exercises: Exercise[];
         examples: Example[];
       };
       connection: {
         review: Connection[];
         strengthen: Connection[];
       };
     };
     progress: {
       comprehension: number;
       timeSpent: number;
       nextReview: Date;
     };
   }
   ```

### B. 연결 강화
1. **복습 프로세스**
   ```typescript
   interface ReviewFlow {
     schedule: {
       type: 'spaced' | 'connection-based';
       timing: Date[];
       priority: number;
     };
     session: {
       nodes: Node[];
       connections: Connection[];
       activities: ReviewActivity[];
     };
     feedback: {
       comprehension: number;
       connectionStrength: number;
       nextInterval: number;
     };
   }
   ```

## 4. 콘텐츠 작성 (Content Creation)

### A. 노트 작성
```typescript
interface NoteCreationFlow {
  context: {
    linkedNode: string;
    noteType: 'detail' | 'example' | 'question';
  };
  content: {
    markdown: string;
    codeBlocks: CodeBlock[];
    attachments: Attachment[];
  };
  connections: {
    autoSuggest: boolean;
    manualLinks: string[];
  };
}
```

### B. 블로그 포스트 작성
```typescript
interface BlogCreationFlow {
  preparation: {
    synapseMapSnapshot: {
      nodes: string[];
      connections: string[];
      focusNode: string;
    };
    template: 'explanation' | 'deep-dive' | 'connection-story';
  };
  writing: {
    content: string;
    embeddedMaps: SynapseMapEmbed[];
    references: Reference[];
  };
  publishing: {
    visibility: 'public' | 'private' | 'shared';
    seo: SEOSettings;
    sharing: SharingOptions;
  };
}
```

## 5. 분석 및 개선 (Analysis & Improvement)

### A. 학습 분석
```typescript
interface AnalyticsFlow {
  metrics: {
    nodeComprehension: Map<string, number>;
    connectionStrength: Map<string, number>;
    reviewEffectiveness: number;
  };
  insights: {
    weakAreas: Node[];
    suggestedReviews: Review[];
    learningPatterns: Pattern[];
  };
  recommendations: {
    nextNodes: Node[];
    reviewSchedule: Schedule;
    connectionSuggestions: Connection[];
  };
}
```

### B. 지식 맵 최적화
```typescript
interface OptimizationFlow {
  analysis: {
    connectionDensity: number;
    clusterAnalysis: Cluster[];
    pathEfficiency: number;
  };
  suggestions: {
    nodeReorganization: Change[];
    connectionAdjustments: Change[];
    structuralImprovements: Improvement[];
  };
  implementation: {
    automaticChanges: Change[];
    manualReview: Review[];
    verificationSteps: Step[];
  };
}
```

이 유저플로우는 시냅스 기반 지식 연결 플랫폼의 주요 사용자 경험을 정의합니다. 각 단계는 사용자가 자연스럽게 지식을 구조화하고 확장할 수 있도록 설계되었습니다.
