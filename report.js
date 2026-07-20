// Auth Check
if(localStorage.getItem('ems_auth')!== 'true' &&!window.location.pathname.includes('index.html')) {
  window.location.href = 'index.html';
}

const user = JSON.parse(localStorage.getItem('ems_user') || '{}');

// ===== LAYOUT CODE =====
function renderLayout(title, active) {
  return `
  <div id="overlay" class="hidden lg:hidden fixed inset-0 bg-black/50 z-40" onclick="toggleSidebar()"></div>
  <aside id="sidebar" class="fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 -translate-x-full lg:translate-x-0 transition duration-300">
    <div class="p-6 border-b border-slate-700"><h2 class="text-2xl font-bold text-white">EMS</h2></div>
    <nav class="p-4 space-y-2">
      <a href="dashboard.html" class="block px-4 py-3 rounded-xl ${active==='dashboard'?'bg-indigo-600 text-white':'text-slate-300'}">📊 Dashboard</a>
      <a href="attendance.html" class="block px-4 py-3 rounded-xl ${active==='attendance'?'bg-indigo-600 text-white':'text-slate-300'}">⏰ Attendance</a>
    </nav>
  </aside>
  <div class="flex-1 lg:ml-64">
    <header class="px-8 py-4 bg-white shadow-sm flex justify-between items-center sticky top-0">
      <button onclick="toggleSidebar()" class="lg:hidden p-2 bg-indigo-600 text-white rounded-lg">☰</button>
      <h2 class="text-2xl font-bold">${title}</h2>
    </header>
    <main class="p-8 min-h-[calc(100vh-180px)]">
  `;
}

function renderFooter() {
  return `</main><footer class="bg-slate-800 text-white px-8 py-6"><p class="text-center">© 2026 EMS</p></footer></div>`;
}

// Sidebar Toggle for Mobile
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');
  sidebar.classList.toggle('-translate-x-full');
  overlay.classList.toggle('hidden');
}

// Modal Open/Close
function openModal(id) {
  document.getElementById(id).classList.remove('hidden');
}
function closeModal(id) {
  document.getElementById(id).classList.add('hidden');
}

// Logout
function logout() {
  localStorage.removeItem('ems_auth');
  localStorage.removeItem('ems_user');
  window.location.href = 'index.html';
}

// ===== API CODE =====
function showToast(msg, type='success') {
  const t = document.createElement('div');
  t.className = `fixed top-4 right-4 px-6 py-4 rounded-xl shadow-2xl z-50 ${type==='success'?'bg-green-500':'bg-red-500'} text-white`;
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}

async function apiCall(url) {
  showToast('Planning...', 'success');
  await new Promise(r => setTimeout(r, 1500));
  if(url.includes('attendance')) return [{date:'2026-06-22', punchIn:'09:05', punchOut:null}];
  return {success:true};
}

// Set User Name
window.onload = function() {
  const userNameEl = document.getElementById('userName');
  if(userNameEl) userNameEl.textContent = user.name || 'Admin';
}

// Update Profile Function
async function updateProfile() {
  // 1. Loader + Toast kaamum
  showToast('Updating profile...', 'success');
  
  // 2. Form data eduthu Mock API call panum
  await apiCall('/api/profile/update');
  
  // 3. Success toast
  showToast('Profile updated successfully! ✅', 'success');
}