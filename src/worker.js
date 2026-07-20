import { onRequestPost as contactSubmit, onRequestOptions as contactSubmitOptions } from '../functions/api/contact-submit.js';
import { onRequestPost as deleteMessages } from '../functions/api/delete-messages.js';
import { onRequest as adminMessages } from '../functions/admin/contact-messages.js';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Provide a mocked 'context' object that matches Cloudflare Pages Functions API
    const context = { request, env, waitUntil: ctx.waitUntil.bind(ctx) };

    if (url.pathname === '/api/contact-submit') {
      if (request.method === 'POST') {
        return contactSubmit(context);
      } else if (request.method === 'OPTIONS') {
        return contactSubmitOptions(context);
      }
    }
    
    if (url.pathname === '/api/delete-messages' && request.method === 'POST') {
      return deleteMessages(context);
    }
    
    if (url.pathname === '/admin/contact-messages' || url.pathname.startsWith('/admin/contact-messages/')) {
      return adminMessages(context);
    }
    
    // Fallback to serving static assets
    return env.ASSETS.fetch(request);
  }
};
