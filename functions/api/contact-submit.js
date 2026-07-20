export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const contentType = request.headers.get("content-type") || "";
    
    let name = "";
    let email = "";
    let message = "";
    let website = ""; // honeypot

    if (contentType.includes("form")) {
      const formData = await request.formData();
      name = formData.get("name") || "";
      email = formData.get("email") || "";
      message = formData.get("message") || "";
      website = formData.get("website") || "";
    } else if (contentType.includes("json")) {
      const json = await request.json();
      name = json.name || "";
      email = json.email || "";
      message = json.message || "";
      website = json.website || "";
    }

    // Clean strings
    name = String(name).trim();
    email = String(email).trim();
    message = String(message).trim();

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ success: false, message: "Submission failed" }), {
        status: 400,
        headers: { "content-type": "application/json" }
      });
    }

    // Honeypot check
    if (website) {
      // Silently accept but do not process
      return new Response(JSON.stringify({ success: true, message: "Message sent successfully" }), {
        status: 200,
        headers: { "content-type": "application/json" }
      });
    }

    const kv = env.CONTACT_FORM || env.CONTACT_MESSAGES;
    if (!kv) {
      return new Response(JSON.stringify({ success: false, message: "Submission failed" }), {
        status: 500,
        headers: { "content-type": "application/json" }
      });
    }

    const timestamp = new Date().toISOString();
    // Unique ID format: contact:{timestamp}:{email}
    const id = `contact:${timestamp}:${email}`;
    const data = { name, email, message, timestamp };

    // Store in KV
    await kv.put(id, JSON.stringify(data));

    // Optional: Forward to Web3Forms to maintain email notification functionality if a key is present
    const accessKey = env.PUBLIC_WEB3FORMS_KEY || env.WEB3FORMS_KEY;
    if (accessKey && accessKey !== "YOUR_ACCESS_KEY_HERE") {
      try {
        const web3FormData = new URLSearchParams();
        web3FormData.append("access_key", accessKey);
        web3FormData.append("name", name);
        web3FormData.append("email", email);
        web3FormData.append("message", message);

        await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: web3FormData,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/json"
          }
        });
      } catch (e) {
        console.error("Web3Forms forwarding failed:", e);
      }
    }

    return new Response(JSON.stringify({ success: true, message: "Message sent successfully" }), {
      status: 200,
      headers: { "content-type": "application/json" }
    });

  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: "Submission failed" }), {
      status: 500,
      headers: { "content-type": "application/json" }
    });
  }
}

// Support CORS preflight if needed
export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400"
    }
  });
}
