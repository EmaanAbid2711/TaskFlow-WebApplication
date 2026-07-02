import { Header, Sidebar } from "../../components";

function Dashboard() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 p-8">
          Dashboard Content
        </main>
      </div>
    </div>
  );
}

export default Dashboard;