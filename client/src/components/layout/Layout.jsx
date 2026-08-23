import Navbar from "../Navbar";

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-100">
      

      <main className="max-w-7xl mx-auto p-8">
        {children}
      </main>
    </div>
  );
}

export default Layout;