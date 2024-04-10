const { query } = await Service.import("applications");
const WINDOW_NAME = "applauncher";

/* @param {import('resource:///com/github/Aylur/ags/service/applications.js').Application} app */
const AppItem = (app) =>
  Widget.Button({
    class_name: "applauncher-item",
    on_clicked: () => {
      App.closeWindow(WINDOW_NAME);
      app.launch();
    },
    on_hover: (self) => {
      //self.grab_focus();
    },
    attribute: { app },
    child: Widget.Box({
      children: [
        Widget.Icon({
          icon: app.icon_name || "",
          size: 42,
        }),
        Widget.Label({
          class_name: "title",
          label: app.name,
          xalign: 0,
          vpack: "center",
          truncate: "end",
        }),
      ],
    }),
  });

const applauncher = ({ width = 500, height = 500, spacing = 12 }) => {
  // list of application buttons
  let applications = query("").map(AppItem);

  // container holding the buttons
  const list = Widget.Box({
    vertical: true,
    children: applications,
    spacing,
  });

  // repopulate the box, so the most frequent apps are on top of the list
  function repopulate() {
    applications = query("").map(AppItem);
    list.children = applications;
  }

  // search entry
  const entry = Widget.Entry({
    hexpand: true,
    css: `margin-bottom: ${spacing}px;`,
    class_name: "applauncher-entry",

    // to launch the first item on Enter
    on_accept: () => {
      // make sure we only consider visible (searched for) applications
      const results = applications.filter((item) => item.visible);
      if (results[0]) {
        App.toggleWindow(WINDOW_NAME);
        applications[0].attribute.app.launch();
      }
    },

    // filter out the list
    on_change: ({ text }) =>
      applications.forEach((item) => {
        item.visible = item.attribute.app.name
          .toLowerCase()
          .match(text.toLowerCase() ?? "");
      }),
  });

  return Widget.Box({
    vertical: true,
    css: `margin: ${spacing * 2}px;`,
    //class_name: "applauncher-",
    children: [
      entry,

      // wrap the list in a scrollable
      Widget.Scrollable({
        hscroll: "never",
        css: `min-width: ${width}px;` + `min-height: ${height}px;`,
        child: list,
      }),
    ],
    setup: (self) =>
      self.hook(App, (_, windowName, visible) => {
        if (windowName !== WINDOW_NAME) return;

        // when the applauncher shows up
        if (visible) {
          repopulate();
          entry.text = "";
          //entry.grab_focus();
        }
      }),
  });
};

// there needs to be only one instance
export const Applauncher = Widget.Window({
  name: WINDOW_NAME,
  class_name: "applauncher-window",
  setup: (self) =>
    self.keybind("Escape", () => {
      App.closeWindow(WINDOW_NAME);
    }),
  visible: false,
  keymode: "exclusive",
  child: applauncher({
    width: 500,
    height: 500,
    spacing: 12,
  }),
});
