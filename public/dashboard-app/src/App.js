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
        <div className="dashboard__content">
          <Route path="/" component={WorkoutLog} exact />
          <Route path="/analytics" component={Analytics} />
          <Route path="/weighttracker" component={WeightTracker} />
        </div>
      </section>
    </HashRouter>
  );
}

export default App;
