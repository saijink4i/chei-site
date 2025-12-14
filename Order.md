# 국제 커플 결혼식 온라인 청첩장

## 프로젝트 개요
- 국제 커플의 결혼식을 위한 온라인 청첩장 웹사이트
- 반응형(Responsive Web), 글로벌 손님 대상, 다국어 지원(한국어/일본어)
- Google Maps, Google Sheets API 연동

## 주요 기술 스택
- **Frontend**: React(App Router)
- **i18n**: react-i18next
- **스타일링**: Tailwind CSS, (선택) shadcn/ui, Framer Motion
- **지도**: Google Maps JavaScript API
- **데이터 저장**: Google Sheets API (OAuth 2.0, Next.js API Route)
- **배포**: Vercel (CDN, SSL)
> **참고:** 의존성 버전은 호환성을 고려하여 설정하세요.

## 주요 기능
- 언어 선택 및 전환 (한국어/일본어). 맨처음 사이트를 접속할때 어느 언어로 표시할지 선택할 수 있도록 하고, 사이트 내에서도 언어를 전환할 수 있도록 합니다.
- 결혼식 정보, 신랑/신부 소개, 오시는 길(지도), RSVP(참석 여부 응답)
- RSVP 데이터 Google Sheets 자동 저장

## 구조 및 보안
- 환경 변수 및 OAuth 등 보안 고려
- 유지보수 및 문서화 용이성 확보

## 페이지 예시
- 메인(날짜/시간/장소/언어)
- 신랑/신부 소개
- 오시는 길(Google Map)
- RSVP(참석 여부 입력)