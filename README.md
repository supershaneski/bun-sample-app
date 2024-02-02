bun-sample-app
======

A sample application using Bun + Vite + React.

The application is a simple **Time Notifier**, that displays the current time and speaks it at some intervals, using [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) for the Text-to-Speech (TTS) part.

# Motivation

This is a sample application to test [Bun](https://bun.sh), a fast Javascript all-in-one toolkit, with [React](https://react.dev), a Javascript front-end library. Although Bun can [run React](https://bun.sh/guides/ecosystem/react), it is not a framework so it needs a framework like [Vite](https://bun.sh/guides/ecosystem/vite) to build an app.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


# Setup

First, make sure to install Bun

```sh
$ npm install -g bun
```

See Bun [installation page](https://bun.sh/docs/installation) for more details.

To clone the repository and install the dependencies

```sh
$ bun create github.com/supershaneski/bun-sample-app myproject
```

Open your browser to `http://localhost:5173/` to load the application page.
