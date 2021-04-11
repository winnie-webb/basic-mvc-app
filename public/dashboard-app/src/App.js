import SidebarMenu from "./components/SidebarMenu";
import Analytics from "./components/Analytics";
import WorkoutLog from "./components/WorkoutLog";
import WeightTracker from "./components/WeightTracker";
import { HashRouter, Route } from "react-router-dom";
import "./App.css";
function App() {
  return (
    <HashRouter>
      <section className="dashboard">
        <SidebarMenu />
        <Route path="/dashboard" component={WorkoutLog} />
        <Route path="/dashboard/analytics" component={Analytics} />
        <Route path="/dashboard/weighttracker" component={WeightTracker} />
      </section>
    </HashRouter>
  );
}

export default App;
