const WINDOW_NAME = "powermenu";

export const Power = () => {
  const PowerButton = () =>
    Widget.Button({
      on_clicked: () => {
        Menu.visible = !Menu.visible;
        print(Menu.visible);
      },
      child: Widget.Icon({
        icon: `system-shutdown-symbolic`,
      }),
    });

  const Menu = () =>
    Widget.Window({
      name: WINDOW_NAME,
      setup: (self) =>
        self.keybind("Escape", () => {
          App.closeWIndow(WINDOW_NAME);
        }),
      visible: false,
      keymode: "exclusive",
      child: Application(),
    });

  return Widget.Box({
    class_name: "power",
    child: PowerButton(),
  });
};
