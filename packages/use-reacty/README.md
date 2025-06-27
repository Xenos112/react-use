# use-reacty

<div align="center">
  <img src="https://use-reacty.vercel.app/logo.png" width="180" alt="use-reacty logo" />
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

---

## 🤔 Why use-reacty?

- **Minimal**: No dependencies except React itself.
- **TypeScript-first**: All hooks are fully typed.
- **Stateful**: Designed for real-world, interactive UIs.
- **SSR-friendly**: Works with Next.js, Remix, and other SSR frameworks.
- **Consistent API**: All hooks follow React conventions.
- **Well-documented**: Each hook has its own docs and demo.
- **Actively maintained**: New hooks and improvements are added regularly.

---

## ✨ Features

- 🪶 Minimal and lightweight
- ⚛️ Follows React standards
- 🟦 Type-safe out of the box
- 🌀 Stateful and interactive
- 🧩 SSR/SSG support (see caveats)
- 📚 Per-hook documentation and demos

---

## 🛠 Usage Example

```tsx
import { useIdle, useSupported, useTitle } from "use-reacty";

function Example() {
  const { isIdle } = useIdle();
  const [title, setTitle] = useTitle("Hello World");
  const isSupported = useSupported(() => "clipboard" in navigator);

  return (
    <div>
      <div>Idle: {isIdle ? "Yes" : "No"}</div>
      <div>
        <input value={title} onChange={e => setTitle(e.target.value)} />
      </div>
      <div>Clipboard API supported: {isSupported ? "Yes" : "No"}</div>
    </div>
  );
}
```

---

## 📖 Documentation

- [Getting Started](https://use-reacty.vercel.app/get-started)
- [All Hooks & API Reference](https://use-reacty.vercel.app/)

---

## ⚠️ Caveats

> [!WARNING]
> Current version has limited support for SSG and SSR.
> Please report any issues or incompatibilities.

---

## 🗺️ Roadmap

- [ ] 50+ hooks
- [ ] 100% test coverage
- [x] SSR compatibility
- [x] Per-hook documentation & demos
- [ ] Extensibility for custom hooks

---

## 🤝 Contributing

Contributions, issues and feature requests are welcome!
Feel free to check [issues page](https://github.com/xenodiv/use-reacty/issues) or submit a PR.

---

## 📄 License

MIT

---

<div align="center">
  <sub>Made with ❤️ by Xenos
</div>
