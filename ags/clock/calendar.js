const calendar = Widget.Calendar({
  showDayNames: true,
  showDetails: true,
  showHeading: true,
  showWeekNumbers: true,
  detail: (self, y, m, d) => {
    return `<span color="white">${d}. ${m}. ${y}.</span>`;
  },
});

const Calendar = (monitor = 0) => {
  return Widget.Window({
    name: "Calendar",
    class_name: "calendar-window",
    monitor,
    visible: false,
    anchor: ["right"],
    child: Widget.Box({
      class_name: "calendar",
      vertical: true,
      child: calendar,
    }),
  });
};

export default Calendar;
