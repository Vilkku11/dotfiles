const hyprland = await Service.import("hyprland");

export const Workspaces = () => {
  const activeId = hyprland.active.workspace.bind("id");
  const workspaces = hyprland.bind("workspaces").as((ws) =>
    ws
      .sort((a, b) => a.id - b.id)
      .map(({ id }) =>
        Widget.Button({
          on_clicked: () => hyprland.messageAsync(`dispatch workspace ${id}`),
          child: Widget.Label({
            class_name: "workspace-label",
            label: `${id}`,
          }),
          class_name: activeId.as(
            (i) => `${i === id ? "workspaces-focused" : ""}`
          ),
        })
      )
  );

  return Widget.Box({
    class_name: "workspaces",
    children: workspaces,
  });
};
