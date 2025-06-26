---
title: Getting Started
description: How to install use-reacty in you project
---

# Get Started

use-reacty is a hooks library for react that makes life easier for the developer,
it provides set of hooks that are well documented and easy to use and integrate into your project.

## Installation

To install use-reacty in your project, use can use the following commands to install it:

::: code-group

```bash [npm]
npm install use-reacty
```

```bash [pnpm]
pnpm add use-reacty
```

```bash [yarn]
yarn install use-reacty
```

```bash [bun]
bun add use-reacty
```

once installed you can use it in your project with no extra setup.

## Usage Example

by importing the library in your project, you will have access to all the hooks

```tsx
import { useIdle, useSupported, useTitle } from "use-reacty";

const { isIdle } = useIdle();
const [title, setTitle] = useTitle();
const isSupported = useSupported(() => navigator && "getBattery" in navigator);
```
