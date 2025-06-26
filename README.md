# use-reacty

<div align="center">
  <img src="https://use-reacty.vercel.app/logo.png" width="220" alt="use-reacty logo" />
  <h2>A collection of useful, type-safe, and stateful React hooks</h2>
  <p>
    <b>Minimal</b> · <b>TypeScript-first</b> · <b>Stateful</b> · <b>SSR-friendly</b>
  </p>
</div>

---

> ⚠️ **Project is under active development!**
> Expect breaking changes and new features.

---

## 🚀 Installation

```bash
# npm
npm install use-reacty

# pnpm
pnpm add use-reacty

# bun
bun add use-reacty

# yarn
yarn add use-reacty
```

## ✨ Features

- 🪶 **Minimal**: Only uses React and web standard features
- ⚛️ **Follows the React Standard**: No magic, just hooks
- 🟦 **Type-safe**: TypeScript support out of the box for all hooks
- 🌀 **Stateful**: All hooks are stateful
- 🧩 **SSR-friendly**: Works with SSR and SSG (limited support, see below)
- 📚 **Well-documented**: Each hook comes with its own docs and demo

## 🛠 Usage Example

```tsx
import { useIdle, useSupported, useTitle } from "use-reacty";

const { isIdle } = useIdle();
const [title, setTitle] = useTitle();
const isSupported = useSupported(() => navigator && "getBattery" in navigator);
```

## 📖 Documentation

- [Getting Started](./docs/get-started.md)
- [All Hooks & API Reference](https://use-reacty.vercel.app/)

## ⚠️ Caveats

> [!WARNING]
> Current version has limited support for SSG and SSR.
> Please report any issues or incompatibilities.

## 🗺️ Roadmap

- [ ] 50+ hooks
- [ ] 100% test coverage
- [x] SSR compatibility
- [x] Per-hook documentation & demos
- [ ] Extensibility for custom hooks

---

<div align="center">
  <sub>Made with ❤️ by Xenos</sub>
</div>
