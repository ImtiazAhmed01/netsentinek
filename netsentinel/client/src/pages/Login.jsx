export default function Login({ setIsAuthenticated }) {
  // Simple mock login for development purposes bypasses actual JWT API if API isn't up
  const handleMockLogin = (e) => {
    e.preventDefault();
    localStorage.setItem('token', 'mock_token_123');
    localStorage.setItem('user', JSON.stringify({ name: "Guest Admin", avatar: "GA" }));
    setIsAuthenticated(true);
  };

  return (
    <div className="flex h-[80vh] items-center justify-center">
      <div className="card w-full max-w-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Login to NetSentinel</h2>
        <form onSubmit={handleMockLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
            <input 
              type="email" 
              className="w-full bg-slate-900 border border-slate-700 rounded-md px-4 py-2 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              placeholder="admin@netsentinel.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
            <input 
              type="password" 
              className="w-full bg-slate-900 border border-slate-700 rounded-md px-4 py-2 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              placeholder="••••••••"
              required
            />
          </div>
          <button type="submit" className="btn-primary w-full mt-4">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
