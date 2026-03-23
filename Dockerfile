FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ARG VITE_CLOUDINARY_CLOUD_NAME
ARG VITE_CLOUDINARY_UPLOAD_PRESET
ENV VITE_CLOUDINARY_CLOUD_NAME=$VITE_CLOUDINARY_CLOUD_NAME
ENV VITE_CLOUDINARY_UPLOAD_PRESET=$VITE_CLOUDINARY_UPLOAD_PRESET

RUN npm run build

FROM nginx:alpine AS runner
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
