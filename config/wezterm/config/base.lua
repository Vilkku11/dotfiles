local wezterm = require 'wezterm'
local module = {}

function module.apply_to_config(config)
    config.font = wezterm.font_with_fallback({
        'Hack Nerd Font',
        'Mononoki Nerd Font',
    })
    config.font_size = 12
    config.window_padding = {
        left = 4,
        right = 4,
        top = 0,
        bottom = 2,
    }
    config.enable_wayland = false
    config.enable_scroll_bar = true

    config.initial_rows = 40 --height
    config.initial_cols = 120 --width
    config.enable_tab_bar = true
    config.hide_tab_bar_if_only_one_tab = true
    config.default_cursor_style = 'SteadyBar'
end

return module
