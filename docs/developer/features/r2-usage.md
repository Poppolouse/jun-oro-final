# Using Cloudflare R2 for Asset Storage

This document explains how to use Cloudflare R2 to store and serve assets for your Jun-Oro v2 applications.

## Prerequisites

- A Cloudflare account with R2 enabled.
- Your R2 bucket created and your public URL available.

## Configuration

The R2 public URL is configured in `apps/portal/src/config.ts`:

```typescript
export const R2_PUBLIC_URL = import.meta.env.VITE_R2_PUBLIC_URL || 'https://pub-f31c742a4d8545aba1589f1893c59dab.r2.dev';
```

This allows you to use the `R2_PUBLIC_URL` variable in your application to construct asset URLs.

## Uploading Assets

You can upload assets to your R2 bucket using the Cloudflare dashboard or the `wrangler` CLI.

### Using the Cloudflare Dashboard

1.  **Log in to your Cloudflare account.**
2.  **Navigate to the "R2" section.**
3.  **Select your bucket.**
4.  **Upload your files.**

### Using the `wrangler` CLI

1.  **Install the `wrangler` CLI:**

    ```bash
    npm install -g wrangler
    ```

2.  **Configure `wrangler` with your Cloudflare account:**

    ```bash
    wrangler login
    ```

3.  **Upload a file to your bucket:**

    ```bash
    wrangler r2 object put <BUCKET_NAME>/<OBJECT_KEY> --file <FILE_PATH>
    ```

    -   `<BUCKET_NAME>`: The name of your R2 bucket.
    -   `<OBJECT_KEY>`: The name of the object in the bucket (e.g., `images/avatar.png`).
    -   `<FILE_PATH>`: The path to the file you want to upload.

## Using Assets in Your Application

To use an asset from R2 in your application, construct the URL using the `R2_PUBLIC_URL` and the object key:

```typescript
import { R2_PUBLIC_URL } from './config';

const avatarUrl = `${R2_PUBLIC_URL}/images/avatar.png`;

// Use the avatarUrl in your component
<img src={avatarUrl} alt="User avatar" />
```

By following these steps, you can effectively use Cloudflare R2 for storing and serving assets in your Jun-Oro v2 project.
