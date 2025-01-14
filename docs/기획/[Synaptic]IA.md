네, 제공된 문서들을 바탕으로 Synaptic의 Information Architecture(IA)를 작성하겠습니다.

# Synaptic - Information Architecture

## 1. 최상위 네비게이션

### 1.1 메인 네비게이션
- Home
- My Roadmaps
- Study Notes
- Review Center
- Blog
- Settings

### 1.2 보조 네비게이션
- Notifications
- Search
- Profile Menu
  - My Profile
  - Account Settings
  - Help Center
  - Logout

## 2. 페이지 구조 상세

### 2.1 Home (/)
- Welcome Section
  - Quick Stats
  - Today's Review Items
  - Continue Learning
- Featured Roadmaps
  - Popular Templates
  - Community Roadmaps
  - Recommended for You
- Learning Progress
  - Active Roadmaps
  - Recent Activities
  - Achievement Badges

### 2.2 My Roadmaps (/roadmaps)
- Roadmap Dashboard
  - Active Roadmaps
  - Completed Roadmaps
  - Drafts
- Create New
  - Blank Canvas
  - From Template
    - Frontend Development
    - Backend Development
    - DevOps
    - Computer Science
    - Custom Templates
- Shared With Me
- Templates Library

### 2.3 Study Notes (/notes)
- Notes Dashboard
  - Recent Notes
  - Favorites
  - By Roadmap
  - By Tags
- Create New Note
  - Select Template
    - Concept Definition
    - Technical Deep Dive
    - Interview Prep
    - Code Examples
    - Custom Template
- Note Organization
  - Folders
  - Tags
  - Search
  - Filters

### 2.4 Review Center (/review)
- Today's Reviews
  - Due Now
  - Coming Up
  - Completed
- Review Calendar
- Review Types
  - Flash Cards
  - Quizzes
  - Mock Interviews
  - Concept Mapping
- Progress Tracking
  - Review Stats
  - Performance Metrics
  - Weak Areas
  - Improvement Suggestions

### 2.5 Blog (/blog)
- Blog Home
  - Featured Posts
  - Recent Posts
  - Popular Tags
- My Posts
  - Published
  - Drafts
  - Scheduled
- Create Post
  - From Note
  - New Post
- Categories
  - Technical Concepts
  - Tutorials
  - Interview Experience
  - Learning Paths
- Blog Settings
  - SEO Settings
  - Social Sharing
  - Analytics

### 2.6 Settings (/settings)
- Profile Settings
  - Personal Info
  - Professional Info
  - Profile Picture
  - Social Links
- Account Settings
  - Email & Password
  - Connected Accounts
  - Security
  - Privacy
- Learning Preferences
  - Review Schedule
  - Notification Settings
  - Study Time Preferences
  - Template Defaults
- Subscription Management
  - Current Plan
  - Billing History
  - Payment Methods

## 3. 기능별 상세 구조

### 3.1 Roadmap Editor (/roadmaps/editor/:id)
- Toolbar
  - Node Tools
  - Connection Tools
  - Style Tools
  - Undo/Redo
- Canvas
  - Grid View
  - Mini Map
  - Zoom Controls
- Properties Panel
  - Node Properties
  - Connection Properties
  - Canvas Properties
- Collaboration Tools
  - Share
  - Comments
  - Version History

### 3.2 Note Editor (/notes/editor/:id)
- Editor Toolbar
  - Text Formatting
  - Code Block
  - Media Insert
  - Links
- Template Sections
  - Concept Definition
  - Key Points
  - Examples
  - Related Concepts
- Preview Mode
- Auto-save Status
- Version History

### 3.3 Review Session (/review/session/:id)
- Session Controls
  - Progress Indicator
  - Timer
  - Difficulty Level
- Content Area
  - Question/Answer
  - Hints
  - Related Notes
- Response Options
  - Multiple Choice
  - Text Input
  - Code Editor
- Session Summary
  - Performance Stats
  - Next Review Date
  - Weak Areas

### 3.4 Analytics Dashboard (/analytics)
- Learning Overview
  - Study Time
  - Completion Rate
  - Review Performance
- Detailed Reports
  - Daily Activity
  - Weekly Progress
  - Monthly Summary
- Concept Mastery
  - Strong Areas
  - Weak Areas
  - Improvement Trends
- Custom Reports
  - Date Range Selection
  - Metric Selection
  - Export Options

## 4. 시스템 상태 및 알림

### 4.1 Notification Center
- Review Reminders
- Study Streak Updates
- Social Interactions
- System Updates

### 4.2 Error States
- 404 Not Found
- 403 Forbidden
- 500 Server Error
- Offline Mode

### 4.3 Loading States
- Initial Load
- Content Loading
- Action Processing
- Sync Status

이 IA는 Synaptic의 전체 구조를 체계적으로 정리한 것입니다. 각 섹션은 사용자의 학습 여정을 효과적으로 지원하도록 구성되어 있으며, 직관적인 네비게이션과 명확한 정보 계층 구조를 제공합니다.
