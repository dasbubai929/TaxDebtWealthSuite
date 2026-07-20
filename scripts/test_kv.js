// scripts/test_kv.js
import { onRequestPost as submitContact } from '../functions/api/submit-contact.js';
import { onRequestPost as deleteMessages } from '../functions/api/delete-messages.js';
import { onRequest as contactMessages } from '../functions/admin/contact-messages.js';

// Mock global objects
globalThis.Response = class Response {
  constructor(body, init) {
    this.body = body;
    this.init = init;
    this.status = init ? init.status : 200;
    this.headers = new Map(Object.entries(init && init.headers ? init.headers : {}));
  }
  async json() {
    return JSON.parse(this.body);
  }
  async text() {
    return this.body;
  }
};

globalThis.Request = class Request {
  constructor(url, init) {
    this.url = url;
    this.method = init ? init.method : 'GET';
    this.headers = new Map(Object.entries(init && init.headers ? init.headers : {}));
    this.body = init ? init.body : null;
  }
  async formData() {
    const data = new Map();
    if (this.body instanceof URLSearchParams) {
      for (const [k, v] of this.body.entries()) {
        data.set(k, v);
      }
    }
    return data;
  }
  async json() {
    return JSON.parse(this.body);
  }
};

const mockKV = {
  store: {},
  async put(key, val) {
    this.store[key] = val;
  },
  async get(key) {
    return this.store[key] || null;
  },
  async list(options) {
    let keys = Object.keys(this.store)
      .filter(k => !options.prefix || k.startsWith(options.prefix))
      .map(k => ({ name: k }));
    return {
      keys,
      list_complete: true
    };
  },
  async delete(key) {
    delete this.store[key];
  }
};

async function testSubmit() {
  console.log("Testing submit-contact...");
  const formData = new URLSearchParams();
  formData.append("name", "Test User");
  formData.append("email", "test@example.com");
  formData.append("message", "This is a test message");

  const req = new Request("http://localhost/api/submit-contact", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: formData
  });

  const context = {
    request: req,
    env: {
      CONTACT_MESSAGES: mockKV
    }
  };

  const res = await submitContact(context);
  const json = await res.json();
  console.log("Submit Response Status:", res.status);
  console.log("Submit Response JSON:", json);
  console.log("KV Store state after submit:", mockKV.store);
  if (res.status === 200 && json.success === true) {
    console.log("✅ submit-contact passed.");
  } else {
    throw new Error("submit-contact failed");
  }
}

async function testDashboard() {
  console.log("\nTesting contact-messages GET (unauthorized)...");
  const req1 = new Request("http://localhost/admin/contact-messages");
  const context1 = {
    request: req1,
    env: {
      CONTACT_MESSAGES: mockKV,
      ADMIN_PASSWORD: "your_secure_password"
    }
  };
  const res1 = await contactMessages(context1);
  const html1 = await res1.text();
  console.log("Response 1 Status:", res1.status);
  if (html1.includes("Password") && !html1.includes("Submissions")) {
    console.log("✅ unauthorized GET passed (renders login).");
  } else {
    throw new Error("unauthorized GET failed");
  }

  console.log("\nTesting contact-messages GET (authorized)...");
  const req2 = new Request("http://localhost/admin/contact-messages", {
    headers: { "Cookie": "admin_session=admin_session_active" }
  });
  const context2 = {
    request: req2,
    env: {
      CONTACT_MESSAGES: mockKV,
      ADMIN_PASSWORD: "your_secure_password"
    }
  };
  const res2 = await contactMessages(context2);
  const html2 = await res2.text();
  console.log("Response 2 Status:", res2.status);
  if (html2.includes("Contact Form Submissions") && html2.includes("Test User")) {
    console.log("✅ authorized GET passed (renders dashboard).");
  } else {
    throw new Error("authorized GET failed");
  }
}

async function run() {
  try {
    await testSubmit();
    await testDashboard();
    console.log("\nAll tests passed successfully! 🎉");
  } catch (e) {
    console.error("Test failed:", e);
    process.exit(1);
  }
}

run();
