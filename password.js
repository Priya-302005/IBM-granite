<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>EMS - Login</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: { primary: '#4f46e5' }
        }
      }
    }
  </script>
</head>
<body class="bg-slate-50">
  <!-- Login Page -->
  <div id="loginPage" class="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-4">
    <div class="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 w-full max-w-md border-white/20">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-white mb-2">EMS Login</h1>
        <p class="text-indigo-100">Employee Management Portal</p>
      </div>

      <form id="loginForm" class="space-y-5">
        <input
          type="email"
          id="email"
          placeholder="Email Address"
          class="w-full px-4 py-3 rounded-xl bg-white/20 border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
          required
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          class="w-full px-4 py-3 rounded-xl bg-white/20 border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
          required
        />
        <button type="submit" class="w-full py-3 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition duration-300 shadow-lg">
          Sign In
        </button>
      </form>

      <div class="mt-6 text-center text-white/80 text-sm bg-white/10 py-2 rounded-lg">
        Demo: admin@ems.com / 1234
      </div>
    </div>
  </div>

  <script>
    document.getElementById('loginForm').addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;
      
      if(email === 'admin@ems.com' && password === '1234') {
        localStorage.setItem('ems_auth', 'true');
        localStorage.setItem('ems_user', JSON.stringify({name: 'Admin', email}));
        window.location.href = 'dashboard.html';
      } else {
        alert('Invalid credentials! Use: admin@ems.com / 1234');
      }
    });
  </script>
</body>
</html>