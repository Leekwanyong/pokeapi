# 🏆 포켓몬 도감 (PokeAPI React Project)


## 📌 프로젝트 소개
포켓몬 도감을 구현한 React + TypeScript 프로젝트입니다.  
PokeAPI를 활용하여 **무한 스크롤을 적용**하고, React Query로 데이터를 관리합니다.

👉 **[🔗 배포된 사이트 보기](https://pokeapi-cgyl-l6kax7iiq-leekwanyongs-projects.vercel.app)**  

## 🚀 주요 기능
✅ **React Query로 API 데이터 관리**  
✅ **무한 스크롤 적용 (Infinite Scroll)**  
✅ **TypeScript 적용 (정적 타입 검증)**  
✅ **Styled Components로 UI 스타일링**  
✅ **Vercel을 통한 자동 배포**

---

## 🛠️ 기술 스택
- **Frontend**: React, TypeScript
- **State Management**: React Query
- **CSS**: Styled Components
- **Deployment**: Vercel
  
---

## 📂 프로젝트 폴더 구조
```
pokeapi/
├── public/                       # 정적 파일 (HTML, 이미지 등)
│   └── favicon.ico
├── src/                          # 소스 코드
│   ├── api/                      # API 관련 코드
│   │   └── pokemonApi.ts
│   ├── assets/                   # 프로젝트에서 사용하는 정적 자산
│   │   └── Spinner.gif
│   ├── components/               # UI 컴포넌트
│   │   ├── Card.tsx
│   │   ├── CardList.tsx
│   │   ├── Loading.tsx
│   │   └── Modal.tsx
│   ├── types/                    # 타입 정의 파일
│   │   ├── Card/
│   │   │   └── cardType.ts
│   │   ├── Modal/
│   │   │   └── modalType.ts
│   │   └── PoketApi/
│   │       └── pokemonApiType.ts
│   ├── App.css                   # 전역 스타일
│   ├── App.tsx                   # 최상위 React 컴포넌트
│   ├── index.css                 # 기본 스타일 파일
│   └── index.tsx                 # 엔트리 포인트
├── .eslintrc.json                # ESLint 설정 파일
├── .gitignore                    # Git에서 무시할 파일 목록
├── .prettierrc                   # Prettier 설정 파일
├── package.json                  # 프로젝트 의존성 및 스크립트
├── package-lock.json             # 의존성 잠금 파일
└── README.md                     # 프로젝트 설명 파일

```


---

## ⚡ 문제 해결 과정 & 회고
### 1️⃣ **React Query + 무한 스크롤 구현 시 어려웠던 점**
- 처음에는 `useEffect + useState`를 사용했지만, 데이터 캐싱과 성능 최적화를 위해 React Query로 변경함.
- 쿼리와, state + effect에 성능 차이는 진짜 어마어마 했다. 바로 느껴짐... 
- 처음에 무한 로딩이 되었는데 useState로 loading을 따로 관리하였다. 그래서 무한 로딩이 발생했다.
- Query에서 제공해주는 isLoading으로 변경하여 해결하였다... 멍청한 녀석...

### 2️⃣ **TypeScript의 어려움**
- API 응답 데이터를 적절한 타입으로 정의하는 것이 가장 어려웠음.
- TS는 아직 많이 부족한거 같다. 더 연습을 하고 더 공부를 해야 겠다. 이 프로젝트에서도 잘 정의하지 못한 데이터가 많은 것 같다.
- **해결:** `interface`를 명확하게 정의하고, 필요한 데이터만 가공하여 저장.

### 3️⃣ **Vercel 배포 오류**
- `react@18.3.1`과 `react-dom@19.0.0` 충돌 발생  
  → **해결:** `react-dom`을 `18.3.1`로 다운그레이드하고 `node_modules`를 재설치.

### 1️⃣ **Ul컴포넌트 List컴포넌트 분리하여 생성하였을 떄 같은 요소가 두 번 렌더링**
- key 값을 고유하게 줘야 했었는데 고유한 키 값을 주지 못하여 두 번 렌더링 되었다.
- **해결:** 고유한 키 값을 주어 해결하였다. 리액트는 고유한 키가 중요하다!!!

### 1️⃣ **API데이터 요청**
- 포켓몬API가 공식문서 보기가 어려웠다.
- 데이터 구조가 너무 중첩이 되어 있어가지고 처음에는 map과 find를 사용하여 처리 하는 변수 들이 너무 많이 늘어났다.
- **해결:** 내가 사용한 방법은 flatMap()을 사용하는 방법 이였다.
- 더 깔끔하게 구조를 잘 가져오는 방법이 있을꺼라고 생각한다.

### 1️⃣ **Git 브랜치 전략**
- Git을 브랜치 전략으로 사용 해볼려고 많은 고민을 하면서 커밋과 푸쉬를 하였다.
- 이렇게 하는게 잘 맞는지 몰르겠지만 다음 프로젝트 에서는 더 깃을 잘 사용하여 브랜치 전략을 할 수 있을꺼 같다.

### 4️⃣ **임포트 시 `.tsx`를 입력해야 렌더링이 되는 문제**
- **문제:** 임포트할 때 `.tsx` 확장자를 입력하지 않으면 컴포넌트가 렌더링되지 않는 문제가 발생.  
- **원인:** 초기 프로젝트 설정에서 잘못된 경로 설정 또는 빌드 환경 문제가 있었던 것으로 추정됨.  
- **시도:** 구글링과 GPT를 활용해 문제를 해결하려 했으나 정확한 원인을 찾지 못함. 4시간 동안 했는데도 수정을 못함..  
- **교훈:** 다음 프로젝트에서는 초기에 프로젝트 환경 설정(빌드 및 경로 설정)을 꼼꼼히 확인하고 구성해야겠다고 생각함
- - **"멍청한 나, 지반부터 잘 다져야지..."** 😂  

---

## 📌 개선하고 싶은 점  
🔹 **React Query를 좀 더 깊게 활용해 캐싱 최적화**  
🔹 **Redux/Zustand 같은 상태 관리 라이브러리 적용 연습 이 프로젝트에서는 props가 깊지 않아서 사용은 안 했지만 다음에는 사용을 해보고 싶다.**  
🔹 **다크 모드 지원 추가하기**
🔹 **더 깔끔하게 데이터를 가져오는 방법을 생각해보기**
🔹 **내 나름대로 코드를 생각하면서 작성했지만 더 리팩토링을 할 수 있다고 생각한다.**
🔹 **성능 최적화를 했다고 하지만 더 성능 최적화를 할 수 있을꺼 같다.**


---

## 📎 프로젝트 실행 방법
```bash
# 1️⃣ 프로젝트 클론
git clone https://github.com/Leekwanyong/pokeapi.git

# 2️⃣ 패키지 설치
npm install

# 3️⃣ 로컬 서버 실행
npm start
