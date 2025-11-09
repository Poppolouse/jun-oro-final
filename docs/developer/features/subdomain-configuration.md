# Subdomain Configuration for Jun-Oro v2

This document provides instructions on how to configure subdomains for your applications in Cloudflare.

## Prerequisites

- A Cloudflare account with your domain (`jun-oro.com`) added.
- Your applications deployed and accessible via a public URL.

## Steps

1.  **Log in to your Cloudflare account.**
2.  **Select your domain (`jun-oro.com`).**
3.  **Navigate to the "DNS" section.**
4.  **Add a new CNAME record for each application:**

    -   **Type:** `CNAME`
    -   **Name:** The name of your subdomain (e.g., `studio`, `admin`).
    -   **Target:** The public URL of your deployed application (e.g., your Cloudflare Pages URL).
    -   **Proxy status:** Proxied (orange cloud).

    **Example:**

    | Type  | Name    | Target                      | Proxy status |
    | :---- | :------ | :-------------------------- | :----------- |
    | CNAME | `studio`| `your-studio-app.pages.dev` | Proxied      |
    | CNAME | `admin` | `your-admin-app.pages.dev`  | Proxied      |

5.  **Repeat for each application.**

## Important Notes

- It may take some time for the DNS changes to propagate.
- For applications that require special protection, such as the `admin` panel, you can use Cloudflare Access to restrict access to authorized users. You can find more information on how to set up Cloudflare Access in the Cloudflare documentation.
