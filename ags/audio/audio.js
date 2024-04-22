const audio = await Service.import("audio");

const volumeIcons = {
  microphone: {
    100: "microphone-sensitivity-high-symbolic",
    50: "microphone-sensitivity-medium-symbolic",
    25: "microphone-sensitivity-low-symbolic",
    1: "audio-input-microphone-symbolic",
    0: "microphone-sensitivity-muted-symbolic",
  },
  speaker: {
    100: "audio-volume-overamplified-symbolic",
    50: "audio-volume-high-symbolic",
    25: "audio-volume-medium-symbolic",
    1: "audio-volume-low-symbolic",
    0: "audio-volume-muted-symbolic",
  },
};

const volumeIndicator = Widget.Button({
  on_clicked: () => {
    App.toggleWindow("Volumemenu");
  },
  child: Widget.Icon({ size: 20 }).hook(audio.speaker, (self) => {
    self.icon = fetchIcon("speaker");
    self.tooltip_text = `Volume ${Math.floor(audio.speaker.volume * 100)}%`;
  }),
});

export const Volume = Widget.Box({
  children: [volumeIndicator],
});

const thresholds = [100, 50, 25, 1, 0];

const fetchIcon = (type) => {
  const vol = audio[type].volume * 100;

  if (audio[type].is_muted) {
    return volumeIcons[type][0];
  }

  for (const threshold of thresholds) {
    if (vol >= threshold) {
      return volumeIcons[type][threshold];
    }
  }
  return "";
};

const volumeItem = (type = "", icon = "") => {
  if (typeof type === "string") {
    return Widget.Box({
      //class_name: "volumeitem",
      vertical: false,
      children: [
        Widget.Icon({ class_name: "volumeitem-icon" }).hook(
          audio[type],
          (self) => {
            self.icon = fetchIcon(type);
          }
        ),
        Widget.Slider({
          class_name: "volume-slider",
          hexpand: true,
          draw_value: false,
          on_change: ({ value }) => (audio[type].volume = value),
          value: audio[type].bind("volume"),
        }),
        Widget.Label({ class_name: "volumeitem-label" }).hook(
          audio[type],
          (self) => {
            const vol = Math.floor(audio[type].volume * 100);
            self.label = audio[type].is_muted ? "0%" : `${vol}%`;
          }
        ),
      ],
    });
  }
  return Widget.Box({
    class_name: "volumeitem",
    vertical: true,
    children: [
      Widget.Label({
        class_name: "volumeitem-label-name",
        label: type.description,
      }),
      Widget.Box({
        vertical: false,
        children: [
          Widget.Icon({
            class_name: "volumeitem-icon",
            icon: icon,
          }),
          Widget.Slider({
            class_name: "volume-slider",
            hexpand: true,
            draw_value: false,
            on_change: ({ value }) => (type.volume = value),
            value: type.bind("volume"),
          }),
          Widget.Label({ class_name: "volumeitem-label" }).hook(
            type,
            (self) => {
              const vol = Math.floor(type.volume * 100);
              self.label = type.is_muted ? "0%" : `${vol}%`;
            }
          ),
        ],
      }),
    ],
  });
};

const AppMixer = Widget.Scrollable({
  hscroll: "never",
  vscroll: "automatic",
  class_name: "volume-scrollable",
  child: Widget.Box({
    vertical: true,
    setup: (self) => {
      const updateChildren = () => {
        self.children = audio.apps.map((item) =>
          volumeItem(item, item.icon_name)
        );
      };
      audio.connect("stream-added", updateChildren);
      audio.connect("stream-removed", updateChildren);
    },
  }),
});

const StreamMixer = Widget.Scrollable({
  hscroll: "never",
  vscroll: "automatic",
  class_name: "volume-scrollable",
  child: Widget.Box({
    vertical: true,
    setup: (self) => {
      const updateChildren = () => {
        self.children = [
          ...audio.speakers.map((item) =>
            volumeItem(item, volumeIcons.speaker[50])
          ),
          ...audio.microphones.map((item) =>
            volumeItem(item, volumeIcons.microphone[100])
          ),
          ...audio.recorders.map((item) =>
            volumeItem(item, volumeIcons.microphone[100])
          ),
        ];
      };
      audio.connect("stream-added", updateChildren);
      audio.connect("stream-removed", updateChildren);
    },
  }),
});

const Separator = () =>
  Widget.Separator({
    class_name: "vol-separator",
    vertical: false,
  });

export const VolumeMenu = () => {
  return Widget.Window({
    name: "Volumemenu",
    class_name: "volume-menu",
    visible: false,
    anchor: ["top", "right"],
    margins: [4, 95],
    child: Widget.Box({
      class_name: "volume-menu-box",
      vertical: true,
      children: [
        volumeItem("speaker"),
        volumeItem("microphone"),
        Separator(),
        AppMixer,
        Separator(),
        StreamMixer,
      ],
    }),
  });
};
