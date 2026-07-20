function getCookie(request, name) {
  const cookieString = request.headers.get("Cookie") || "";
  const cookies = cookieString.split(";").map(c => c.trim());
  for (const cookie of cookies) {
    const [k, v] = cookie.split("=");
    if (k === name) return v;
  }
  return null;
}

function escapeHtml(text) {
  if (!text) return "";
  return text.toString()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderLoginPage(error = "") {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Login — TaxDebtWealthSuite</title>
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    body {
      background-color: #0A0F1D;
      color: #F8FAFC;
      font-family: 'Inter', sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      margin: 0;
      padding: 16px;
      box-sizing: border-box;
    }
    .card {
      background-color: #141C32;
      border: 1px solid #1E294B;
      border-radius: 16px;
      padding: 32px;
      width: 100%;
      max-width: 400px;
      box-shadow: 0 10px 25px -5px rgba(0,0,0,0.5);
    }
    h1 {
      font-size: 24px;
      font-weight: 700;
      margin: 0 0 8px 0;
      text-align: center;
    }
    p {
      color: #94A3B8;
      font-size: 14px;
      margin: 0 0 24px 0;
      text-align: center;
    }
    .form-group {
      margin-bottom: 20px;
    }
    label {
      display: block;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #CBD5E1;
      margin-bottom: 8px;
    }
    input {
      width: 100%;
      box-sizing: border-box;
      padding: 12px 16px;
      background-color: #0A0F1D;
      border: 1px solid #1E294B;
      border-radius: 8px;
      color: white;
      font-size: 14px;
      transition: all 0.2s;
    }
    input:focus {
      outline: none;
      border-color: #00F5D4;
      box-shadow: 0 0 0 2px rgba(0, 245, 212, 0.2);
    }
    button {
      width: 100%;
      padding: 12px;
      background: linear-gradient(135deg, #00F5D4, #4338ca);
      border: none;
      border-radius: 8px;
      color: white;
      font-weight: 600;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.2s;
    }
    button:hover {
      opacity: 0.95;
      transform: translateY(-1px);
    }
    .error {
      background-color: rgba(239, 68, 68, 0.1);
      border: 1px solid rgba(239, 68, 68, 0.2);
      color: #F87171;
      padding: 12px;
      border-radius: 8px;
      font-size: 13px;
      margin-bottom: 20px;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="card">
    <h1>Admin Panel</h1>
    <p>Enter password to access contact messages</p>
    
    ${error ? `<div class="error">${error}</div>` : ''}
    
    <form method="POST">
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" name="password" required placeholder="••••••••" autofocus>
      </div>
      <button type="submit">Unlock Dashboard</button>
    </form>
  </div>
</body>
</html>`;
}

function renderDashboardPage(messages) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Dashboard — Contact Messages</title>
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono&display=swap" rel="stylesheet">
  <style>
    body {
      background-color: #0A0F1D;
      color: #F8FAFC;
      font-family: 'Inter', sans-serif;
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    header {
      background-color: #141C32;
      border-bottom: 1px solid #1E294B;
      padding: 16px 32px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .logo {
      font-size: 18px;
      font-weight: 700;
      color: white;
    }
    .logo span {
      color: #00F5D4;
    }
    .logout-btn {
      background-color: transparent;
      border: 1px solid #1E294B;
      color: #94A3B8;
      padding: 8px 16px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }
    .logout-btn:hover {
      color: white;
      border-color: #F87171;
    }
    main {
      flex-grow: 1;
      padding: 32px;
      max-width: 1400px;
      width: 100%;
      margin: 0 auto;
      box-sizing: border-box;
    }
    .dashboard-title-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
      flex-wrap: wrap;
      gap: 16px;
    }
    h2 {
      margin: 0;
      font-size: 24px;
      font-weight: 700;
    }
    .message-count {
      background-color: #1E294B;
      color: #00F5D4;
      font-size: 12px;
      font-weight: 700;
      padding: 4px 8px;
      border-radius: 12px;
      margin-left: 8px;
      vertical-align: middle;
    }
    .actions-bar {
      display: flex;
      gap: 12px;
    }
    .btn {
      padding: 10px 16px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.2s;
      border: 1px solid transparent;
    }
    .btn-primary {
      background-color: #1E294B;
      border-color: #00F5D4/30;
      color: #00F5D4;
    }
    .btn-primary:hover {
      background-color: #00F5D4;
      color: #0A0F1D;
    }
    .btn-danger {
      background-color: rgba(239, 68, 68, 0.1);
      border-color: rgba(239, 68, 68, 0.2);
      color: #F87171;
    }
    .btn-danger:hover {
      background-color: #EF4444;
      color: white;
    }
    .btn:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
    .filters-card {
      background-color: #141C32;
      border: 1px solid #1E294B;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 24px;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
    }
    .filter-group {
      display: flex;
      flex-direction: column;
    }
    .filter-group label {
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #94A3B8;
      margin-bottom: 6px;
    }
    .filter-input {
      background-color: #0A0F1D;
      border: 1px solid #1E294B;
      border-radius: 8px;
      padding: 10px 12px;
      color: white;
      font-size: 13px;
    }
    .filter-input:focus {
      outline: none;
      border-color: #00F5D4;
    }
    .table-container {
      background-color: #141C32;
      border: 1px solid #1E294B;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }
    table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
    }
    th {
      background-color: #1E294B;
      color: #CBD5E1;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: 14px 20px;
      border-bottom: 1px solid #1E294B;
    }
    td {
      padding: 16px 20px;
      border-bottom: 1px solid #1E294B;
      font-size: 13px;
      color: #E2E8F0;
      vertical-align: top;
    }
    tr:last-child td {
      border-bottom: none;
    }
    tr.selected td {
      background-color: rgba(0, 245, 212, 0.05);
    }
    .col-checkbox { width: 40px; text-align: center; padding-right: 0; }
    .col-date { width: 180px; font-family: 'JetBrains Mono', monospace; color: #94A3B8; }
    .col-name { width: 180px; font-weight: 600; }
    .col-email { width: 220px; }
    .col-message { }
    .col-actions { width: 80px; text-align: center; }
    
    a.email-link {
      color: #00F5D4;
      text-decoration: none;
    }
    a.email-link:hover {
      text-decoration: underline;
    }
    .message-text {
      white-space: pre-wrap;
      word-break: break-word;
      line-height: 1.5;
    }
    .checkbox-custom {
      cursor: pointer;
      width: 16px;
      height: 16px;
      accent-color: #00F5D4;
    }
    .btn-delete-row {
      background: none;
      border: none;
      color: #94A3B8;
      cursor: pointer;
      padding: 4px;
      border-radius: 4px;
      transition: all 0.2s;
    }
    .btn-delete-row:hover {
      color: #F87171;
      background-color: rgba(248, 113, 113, 0.1);
    }
    .empty-state {
      padding: 48px;
      text-align: center;
      color: #94A3B8;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <header>
    <div class="logo">TaxDebtWealth<span>Suite</span> Admin</div>
    <button class="logout-btn" onclick="logout()">Logout</button>
  </header>
  <main>
    <div class="dashboard-title-bar">
      <h2>Contact Form Submissions<span class="message-count" id="total-badge">${messages.length}</span></h2>
      <div class="actions-bar">
        <button class="btn btn-primary" onclick="exportCSV()">
          Export CSV
        </button>
        <button class="btn btn-danger" id="btn-delete-selected" disabled onclick="deleteSelected()">
          Delete Selected (<span id="selected-count">0</span>)
        </button>
        <button class="btn btn-danger" onclick="clearAll()">Clear All</button>
      </div>
    </div>

    <div class="filters-card">
      <div class="filter-group">
        <label for="filter-search">Search Keyword</label>
        <input type="text" id="filter-search" class="filter-input" placeholder="Search name, email, message..." oninput="applyFilters()">
      </div>
      <div class="filter-group">
        <label for="filter-email">Filter by Email</label>
        <input type="text" id="filter-email" class="filter-input" placeholder="e.g. john@example.com" oninput="applyFilters()">
      </div>
      <div class="filter-group">
        <label for="filter-start-date">Start Date</label>
        <input type="date" id="filter-start-date" class="filter-input" onchange="applyFilters()">
      </div>
      <div class="filter-group">
        <label for="filter-end-date">End Date</label>
        <input type="date" id="filter-end-date" class="filter-input" onchange="applyFilters()">
      </div>
    </div>

    <div class="table-container">
      <table id="messages-table">
        <thead>
          <tr>
            <th class="col-checkbox"><input type="checkbox" id="checkbox-select-all" class="checkbox-custom" onchange="toggleSelectAll(this)"></th>
            <th class="col-date">Date</th>
            <th class="col-name">Name</th>
            <th class="col-email">Email</th>
            <th class="col-message">Message</th>
            <th class="col-actions">Actions</th>
          </tr>
        </thead>
        <tbody id="table-body">
          <!-- Rows will be dynamically loaded by client-side script -->
        </tbody>
      </table>
      <div id="table-empty" class="empty-state" style="display: none;">
        No submissions found matching your filters.
      </div>
    </div>
  </main>

  <script>
    const MESSAGES = ${JSON.stringify(messages)};

    let filteredMessages = [...MESSAGES];
    let selectedIds = new Set();

    function formatDate(isoString) {
      if (!isoString) return '—';
      try {
        const d = new Date(isoString);
        return d.toLocaleString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        });
      } catch(e) {
        return isoString;
      }
    }

    function renderTable() {
      const tbody = document.getElementById('table-body');
      const emptyDiv = document.getElementById('table-empty');
      tbody.innerHTML = '';
      
      if (filteredMessages.length === 0) {
        emptyDiv.style.display = 'block';
        document.getElementById('messages-table').style.display = 'none';
        return;
      }
      
      emptyDiv.style.display = 'none';
      document.getElementById('messages-table').style.display = 'table';
      
      filteredMessages.forEach(msg => {
        const tr = document.createElement('tr');
        tr.id = 'row-' + msg.id;
        if (selectedIds.has(msg.id)) {
          tr.classList.add('selected');
        }
        
        const isChecked = selectedIds.has(msg.id) ? 'checked' : '';
        
        tr.innerHTML = \`
          <td class="col-checkbox">
            <input type="checkbox" class="checkbox-custom row-checkbox" data-id="\${msg.id}" \${isChecked} onchange="toggleRowSelection(this, '\${msg.id}')">
          </td>
          <td class="col-date">\${formatDate(msg.date)}</td>
          <td class="col-name">\${escapeHtml(msg.name)}</td>
          <td class="col-email">
            <a href="mailto:\${msg.email}" class="email-link">\${escapeHtml(msg.email)}</a>
          </td>
          <td class="col-message">
            <div class="message-text">\${escapeHtml(msg.message)}</div>
          </td>
          <td class="col-actions">
            <button class="btn-delete-row" title="Delete message" onclick="deleteSingle('\${msg.id}')">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </td>
        \`;
        tbody.appendChild(tr);
      });
      
      updateSelectionUI();
    }

    function escapeHtml(text) {
      if (!text) return '';
      return text.toString()
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    }

    function toggleRowSelection(checkbox, id) {
      const row = document.getElementById('row-' + id);
      if (checkbox.checked) {
        selectedIds.add(id);
        row?.classList.add('selected');
      } else {
        selectedIds.delete(id);
        row?.classList.remove('selected');
      }
      updateSelectionUI();
    }

    function toggleSelectAll(selectAllCheckbox) {
      const checkboxes = document.querySelectorAll('.row-checkbox');
      checkboxes.forEach(cb => {
        cb.checked = selectAllCheckbox.checked;
        const id = cb.getAttribute('data-id');
        const row = document.getElementById('row-' + id);
        if (selectAllCheckbox.checked) {
          selectedIds.add(id);
          row?.classList.add('selected');
        } else {
          selectedIds.delete(id);
          row?.classList.remove('selected');
        }
      });
      updateSelectionUI();
    }

    function updateSelectionUI() {
      const btn = document.getElementById('btn-delete-selected');
      const countSpan = document.getElementById('selected-count');
      const selectAll = document.getElementById('checkbox-select-all');
      
      countSpan.innerText = selectedIds.size;
      btn.disabled = selectedIds.size === 0;
      
      const rowCheckboxes = document.querySelectorAll('.row-checkbox');
      if (rowCheckboxes.length > 0) {
        const allChecked = Array.from(rowCheckboxes).every(cb => cb.checked);
        selectAll.checked = allChecked;
      } else {
        selectAll.checked = false;
      }
    }

    function applyFilters() {
      const searchVal = document.getElementById('filter-search').value.toLowerCase().trim();
      const emailVal = document.getElementById('filter-email').value.toLowerCase().trim();
      const startDateVal = document.getElementById('filter-start-date').value;
      const endDateVal = document.getElementById('filter-end-date').value;
      
      const start = startDateVal ? new Date(startDateVal) : null;
      const end = endDateVal ? new Date(endDateVal + 'T23:59:59') : null;

      filteredMessages = MESSAGES.filter(msg => {
        if (searchVal) {
          const nameMatch = (msg.name || '').toLowerCase().includes(searchVal);
          const emailMatch = (msg.email || '').toLowerCase().includes(searchVal);
          const messageMatch = (msg.message || '').toLowerCase().includes(searchVal);
          if (!nameMatch && !emailMatch && !messageMatch) return false;
        }
        
        if (emailVal) {
          if (!(msg.email || '').toLowerCase().includes(emailVal)) return false;
        }
        
        if (msg.date) {
          const msgDate = new Date(msg.date);
          if (start && msgDate < start) return false;
          if (end && msgDate > end) return false;
        } else if (start || end) {
          return false;
        }
        
        return true;
      });
      
      const filteredIds = new Set(filteredMessages.map(m => m.id));
      selectedIds = new Set([...selectedIds].filter(id => filteredIds.has(id)));
      
      document.getElementById('total-badge').innerText = filteredMessages.length;
      renderTable();
    }

    async function deleteSingle(id) {
      if (!confirm('Are you sure you want to delete this message?')) return;
      
      try {
        const res = await fetch('/api/delete-messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ids: [id] })
        });
        const data = await res.json();
        if (data.success) {
          const index = MESSAGES.findIndex(m => m.id === id);
          if (index > -1) MESSAGES.splice(index, 1);
          selectedIds.delete(id);
          applyFilters();
        } else {
          alert('Error: ' + data.message);
        }
      } catch(e) {
        alert('Network error trying to delete.');
      }
    }

    async function deleteSelected() {
      if (selectedIds.size === 0) return;
      if (!confirm(\`Are you sure you want to delete the \${selectedIds.size} selected message(s)?\`)) return;
      
      const idsArray = Array.from(selectedIds);
      try {
        const res = await fetch('/api/delete-messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ids: idsArray })
        });
        const data = await res.json();
        if (data.success) {
          idsArray.forEach(id => {
            const idx = MESSAGES.findIndex(m => m.id === id);
            if (idx > -1) MESSAGES.splice(idx, 1);
            selectedIds.delete(id);
          });
          applyFilters();
        } else {
          alert('Error: ' + data.message);
        }
      } catch(e) {
        alert('Network error trying to delete.');
      }
    }

    async function clearAll() {
      if (!confirm('WARNING: Are you sure you want to permanently delete ALL contact messages? This cannot be undone.')) return;
      
      try {
        const res = await fetch('/api/delete-messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ clearAll: true })
        });
        const data = await res.json();
        if (data.success) {
          MESSAGES.length = 0;
          selectedIds.clear();
          applyFilters();
        } else {
          alert('Error: ' + data.message);
        }
      } catch(e) {
        alert('Network error trying to clear all.');
      }
    }

    function exportCSV() {
      if (filteredMessages.length === 0) {
        alert('No messages to export.');
        return;
      }
      
      const headers = ['Date', 'Name', 'Email', 'Message'];
      const csvRows = [headers.join(',')];
      
      filteredMessages.forEach(msg => {
        const dateStr = formatDate(msg.date);
        const row = [
          dateStr,
          msg.name || '',
          msg.email || '',
          msg.message || ''
        ].map(val => {
          const escaped = val.toString().replace(/"/g, '""');
          return \`"\${escaped}"\`;
        });
        csvRows.push(row.join(','));
      });
      
      const csvContent = csvRows.join('\\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', 'contact_messages_' + new Date().toISOString().split('T')[0] + '.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    function logout() {
      document.cookie = 'admin_session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      location.reload();
    }

    renderTable();
  </script>
</body>
</html>`;
}

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  // If logout query param is provided, clear cookie and redirect
  if (url.searchParams.has("logout")) {
    return new Response(null, {
      status: 302,
      headers: {
        "Location": "/admin/contact-messages",
        "Set-Cookie": "admin_session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;"
      }
    });
  }

  // Determine standard admin password
  const expectedPassword = env.ADMIN_PASSWORD || "your_secure_password";

  if (request.method === "POST") {
    // Handle login submission
    try {
      const formData = await request.formData();
      const password = formData.get("password");

      if (password === expectedPassword) {
        // Success: Redirect to same path with Set-Cookie
        return new Response(null, {
          status: 302,
          headers: {
            "Location": "/admin/contact-messages",
            "Set-Cookie": "admin_session=admin_session_active; Path=/; HttpOnly; Max-Age=86400; Secure; SameSite=Strict"
          }
        });
      } else {
        // Fail: Render login with error
        return new Response(renderLoginPage("Invalid password. Please try again."), {
          status: 200,
          headers: { "content-type": "text/html; charset=utf-8" }
        });
      }
    } catch (e) {
      return new Response(renderLoginPage("Error processing login: " + e.message), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" }
      });
    }
  }

  // GET Request
  const session = getCookie(request, "admin_session");
  if (session !== "admin_session_active") {
    // Show login page
    return new Response(renderLoginPage(), {
      status: 200,
      headers: { "content-type": "text/html; charset=utf-8" }
    });
  }

  // Authorized: Fetch submissions
  try {
    if (!env.CONTACT_MESSAGES) {
      return new Response("<h1>KV Binding Missing</h1><p>Ensure CONTACT_MESSAGES namespace binding is configured in Wrangler/Cloudflare.</p>", {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" }
      });
    }

    // List all message keys
    let list = await env.CONTACT_MESSAGES.list({ prefix: "message:" });
    let keys = list.keys.map(k => k.name);
    
    // Support paginated listing if keys exceed 1000
    while (!list.list_complete) {
      list = await env.CONTACT_MESSAGES.list({ prefix: "message:", cursor: list.cursor });
      keys = keys.concat(list.keys.map(k => k.name));
    }

    // Fetch the values of all keys
    const messages = await Promise.all(
      keys.map(async (key) => {
        try {
          const val = await env.CONTACT_MESSAGES.get(key);
          return val ? JSON.parse(val) : null;
        } catch (e) {
          console.error("Failed to parse message:", key, e);
          return null;
        }
      })
    );

    // Clean null values and sort by date descending
    const activeMessages = messages
      .filter(m => m !== null)
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    return new Response(renderDashboardPage(activeMessages), {
      status: 200,
      headers: { 
        "content-type": "text/html; charset=utf-8",
        "Cache-Control": "no-cache, no-store, must-revalidate"
      }
    });

  } catch (error) {
    return new Response(`<h1>Internal Server Error</h1><p>${escapeHtml(error.message)}</p>`, {
      status: 500,
      headers: { "content-type": "text/html" }
    });
  }
}
