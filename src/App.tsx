import { ReactNode, useEffect, useState } from "react";
import "./App.css";

type IconItem = {
  value: { render: () => ReactNode };
  key: string;
};

function App() {
  const [iconList, setIconList] = useState<IconItem[]>([]);
  const [iconsCopied, setIconsCopied] = useState<string[]>([]);

  const onCopyIcon = (iconName: string) => {
    navigator.clipboard.writeText(`<${iconName} />`);
    setIconsCopied((prevIcons) => [...prevIcons, iconName]);

    setTimeout(() => {
      setIconsCopied((prevIcons) =>
        prevIcons.filter((icon) => icon !== iconName)
      );
    }, 3000);
  };

  useEffect(() => {
    import("@dasa-health/alma-icons").then((module) => {
      const { ...iconsModules } = module as any;
      console.log({ iconsModules });

      const icons = Object.entries(iconsModules).map(
        ([key, value]) =>
          ({
            key,
            value,
          } as IconItem)
      );
      setIconList(icons);
    });
  }, []);

  return (
    <div className="App">
      {iconList.map((icon) => (
        <div key={icon.key} className="card">
          <h2>{icon.key}</h2>
          <i>{icon.value.render()}</i>
          <button onClick={() => onCopyIcon(icon.key)}>
            {iconsCopied.includes(icon.key) ? "Icon copied!" : "Copy icon"}
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
