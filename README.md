# use-reacty

use-reacty is a React hook library that provides a set of useful hooks for React.

> [!WARNING]
> Project still under development

## Installation

<div align='center'>
  <img src='https://use-reacty.vercel.app/logo.png' width='300' />
  <h2>Set of usefull react hooks</h2>
</div>

```bash
npm install use-reacty # npm
pnpm add use-reacty # pnpm
bun add use-reacty # bun
yarn install use-reacty # yarn
```

## Usage Example

```ts
import {useIdle, useSupported, useTitle} from 'use-reacty'

const { isIdle } = useIdle()
const [title, setTitle] = useTitle()
const isSupported = useSupported(() => navigator && 'getBattery' in navigator)
```

> [!CAUTION]
> Current vestion have limited support for SSG and SSR.

# TODOs

- [ ] create more than 50 hooks.
- [ ] test all hooks.
- [ ] make it SSR compatible.
- [X] provide docs file under each hook.
- [ ] make it more extendable.
