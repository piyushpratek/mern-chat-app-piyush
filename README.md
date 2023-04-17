# Mern Chat App

## Deloyed URL

https://chat-rlbn.onrender.com

## Deployment @ Render

1. Root Directory: `backend`

2. Build command:

```
npm i && npm run build && cd ../frontend && npm i && npm run build && cp -r dist ../backend/react-static
```

## Source

Tutorial: [Click here](https://youtu.be/fH8VIb8exdA?list=PLKhlp2qtUcSZsGkxAdgnPcHioRr-4guZf&t=727)

## Development

1. Using frontend development server:

- To run development locally use `nr start:dev` (you need to start vite frontend server too)
- To run production locally use `nr start:prod` (you need to start vite frontend server too)

2. Using frontend static build files:

**NOTE:** You would need to build frontend with `npm run build` from frontend folder each time you change code in frontend folder.

To run static build of react you can use `nr start:dev-static` and `start:prod-static`.
