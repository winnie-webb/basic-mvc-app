import SidebarMenu from "./components/SidebarMenu";
import WorkoutLog from "./components/WorkoutLog";
import "./App.css";
function App() {
  return (
    <section className="dashboard">
      <SidebarMenu />
      <WorkoutLog />
    </section>
  );
}

export default App;
