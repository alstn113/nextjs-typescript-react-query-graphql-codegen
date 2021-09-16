npx create-next-app 이름 --ts

npm i react-query axios recoil
npm i -D @types/node @types/react-dom ts-node

react-query 설정 및 recoil 설정

ts.config,json에서

      "rootDir": ".",
      "baseUrl": ".",
      "paths": {
        "@/*": ["./src/*"]
      }

추가하기

src를 만들고 다 넣기

      src
      ├── api
      ├── components
      ├── pages
      ├── public
      ├── shared
      |     ├── styled.ts
      |     ├── types.ts
      ├── store
      └── styles
            ├── global-style.tsx
            ├── emotion.d.ts
            └── theme.ts

npm info "eslint-config-airbnb@latest" peerDependencies로
뭐 설치해야할 지 확인하고 설치

//.eslintrc.json

      {
        "parser": "@typescript-eslint/parser", // typescript 전용 parser로 지정
        "parserOptions": {
          "project": "./tsconfig.json",
          "sourceType": "module"
        },
        "env": {
          "node": true, // node 사용 OK
          "browser": true, // browser 인식 Ok
          "es6": true // es6 버전사용 OK
        },
        "plugins": ["@typescript-eslint"],
        // react, react-hooks 가 있으면 Error Cannot get result from ~ 이 나옴.
        "extends": [
          "plugin:react/recommended", //recommended 붙여져 있는건 preset을 사용하겠다는 의미
          "prettier", // 8.0.0 버젼이상은 모두 prettier로 통합됨.
          "plugin:@typescript-eslint/eslint-recommended",
          "plugin:@typescript-eslint/recommended",
          "plugin:prettier/recommended"
        ],
        //plugin과 extends로 적용된 규칙에 덮어씌워져서 강제 설정할 수 있는 부분
        "rules": {
          "no-console": "off", // console.log(사용하는 것 금지)
          "prettier/prettier": [
            "error",
            {
              "endOfLine": "auto"
            }
          ],
          "arrow-body-style": "off",
          "prefer-arrow-callback": "off",
          "react/react-in-jsx-scope": "off",
          "no-unused-expressions": 0,
          "import/extensions": ["off"],
          "import/no-unresolved": "off",
          "import/prefer-default-export": "off",
          "@typescript-eslint/no-var-requires": "off",
          "@typescript-eslint/explicit-module-boundary-types": "off", //values returned from a module are of the expected type.
          "no-nested-ternary": "off",
          // 삼항연산안에 또 삼항연산 하는 것을 방지
          "react/jsx-filename-extension": "off", // <> </>쓰는 것 방지
          "spaced-comment": "off", // 주석 쓰는 것 방지
          "no-unused-variable": "off",
          "@typescript-eslint/no-non-null-assertion": "off"
        },
        "settings": {
          "react": {
            "version": "detect"
          },
          "import/parsers": {
            "@typescript-eslint/parser": [".ts", ".tsx", ".js"]
          }
        }
      }

//.prettierrc.json

      {
        "singleQuote": true,
        "semi": true,
        "useTabs": false,
        "tabWidth": 2,
        "trailingComma": "all",
        "printWidth": 100
      }

emotion 설치 및 설정
참고 https://www.howdy-mj.me/css/emotion.js-intro/
npm i @emotion/react @emotion/styled
npm i -D @emotion/babel-plugin
npm i emotion-reset

\_app.tsx 설정
.babelrc 설정

react-query랑 graphql-request 같이 사용하는 법(+codegen)
참고 : https://youtu.be/ZZrr82beJQk

npm i react-query graphql graphql-request
npm i -D @graphql-codegen/typescript-react-query @graphql-codegen/cli @graphql-codegen/typescript @graphql-codegen/typescript-operations

1. codegen.yml 폴더 만들기
2. graphql 폴더에 원하는 query나 mutation 넣기
3. lib-clients에 graphql설정하기
4. package.json에 "generate": "graphql-codegen --config codegen.yml" 스크립트 추가하기
5. npm run generate로 generated폴더에 type이랑 useQuery useMutation 생성하기

2021/09/16 포기
왜 '/'페이지만 ssr이 안되는 걸까...
