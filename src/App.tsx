import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [iconList, setIconList] = useState<any[]>([]);

  useEffect(() => {
    import("@dasa-health/alma-icons").then((module) => {
      const { ...iconsModules } = module as any;
      console.log({ iconsModules });

      const icons = Object.entries(iconsModules).map(([key, value]) => ({
        key,
        value,
      }));
      setIconList(icons);
    });
  }, []);

  return (
    <div className="App">
      {iconList.map((icon) => (
        <div key={icon.key} className="card">
          <h2>{icon.key}</h2>
          <i>{icon.value.render()}</i>
          <button
            onClick={() => navigator.clipboard.writeText(`<${icon.key} />`)}
          >
            Copy component
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
