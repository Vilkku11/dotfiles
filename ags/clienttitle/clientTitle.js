const hyprland = await Service.import("hyprland");

export const ClientTitle = () => {
  return Widget.Label({
    class_name: "client-title",
    label: hyprland.active.client.bind("title"),
  });
};
