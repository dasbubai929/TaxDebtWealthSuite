function getCookie(request, name) {
  const cookieString = request.headers.get("Cookie") || "";
  const cookies = cookieString.split(";").map(c => c.trim());
  for (const cookie of cookies) {
    const [k, v] = cookie.split("=");
    if (k === name) return v;
  }
  return null;
}

export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    
    // Check authentication
    const session = getCookie(request, "admin_session");
    if (session !== "admin_session_active") {
      return new Response(JSON.stringify({ success: false, message: "Unauthorized" }), {
        status: 401,
        headers: { "content-type": "application/json" }
      });
    }

    const payload = await request.json();
    
    const kv = env.CONTACT_FORM || env.CONTACT_MESSAGES;
    if (!kv) {
      return new Response(JSON.stringify({ success: false, message: "KV binding missing" }), {
        status: 500,
        headers: { "content-type": "application/json" }
      });
    }

    if (payload.clearAll) {
      // List and delete all keys starting with "contact:"
      let list = await kv.list({ prefix: "contact:" });
      let keys = list.keys.map(k => k.name);
      
      while (keys.length > 0) {
        await Promise.all(keys.map(key => kv.delete(key)));
        
        if (list.list_complete) {
          break;
        }
        list = await kv.list({ prefix: "contact:", cursor: list.cursor });
        keys = list.keys.map(k => k.name);
      }

      return new Response(JSON.stringify({ success: true, message: "All messages cleared successfully." }), {
        status: 200,
        headers: { "content-type": "application/json" }
      });
    }

    if (payload.ids && Array.isArray(payload.ids)) {
      // Delete specific keys
      await Promise.all(payload.ids.map(key => kv.delete(key)));
      return new Response(JSON.stringify({ success: true, message: `${payload.ids.length} message(s) deleted.` }), {
        status: 200,
        headers: { "content-type": "application/json" }
      });
    }

    return new Response(JSON.stringify({ success: false, message: "Invalid payload" }), {
      status: 400,
      headers: { "content-type": "application/json" }
    });

  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: error.message }), {
      status: 500,
      headers: { "content-type": "application/json" }
    });
  }
}
