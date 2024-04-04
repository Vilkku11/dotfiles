const systemtray = await Service.import("systemtray");

export const SystemTray = () => {
  const items = systemtray.bind("items").as((items) =>
    items.map((item) =>
      Widget.Button({
        child: Widget.Icon({
          class_name: "systemtray-button",
          icon: item.bind("icon"),
          size: 20,
        }),
        on_primary_click: (_, event) => item.activate(event),
        on_secondary_click: (_, event) => item.openMenu(event),
        tooltip_markup: item.bind("tooltip_markup"),
      })
    )
  );

  return Widget.Box({
    children: items,
  });
};
