const hyprland = await Service.import("hyprland");

export const ClientTitle = () => {
  return Widget.Label({
    class_name: "client-title",
    truncate: "end",
    maxWidthChars: 24,
    label: hyprland.active.client.bind("title"),
  });
};
