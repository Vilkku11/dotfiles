local wezterm = require("wezterm")
local module = {}

local state_file = wezterm.home_dir .. '/.config/wezterm/state/bg_mode'

local function read_bg_mode()
    local file = io.open(state_file, 'r')

    if file then
        local mode = file:read('*l')
        file:close()
        return mode
    end
    return 'transparent'
end

local function write_bg_mode(mode)
    local file = io.open(state_file, 'w')
    if file then
        file:write(mode)
        file:close()
    end
end

local bg_mode = read_bg_mode()

module.opacity = (bg_mode == 'transparent') and 0.85 or 1.0

wezterm.on('toggle-opacity', function(window, pane)
    local new_mode = (bg_mode == 'transparent') and 'black' or 'transparent'
    write_bg_mode(new_mode)
    wezterm.log_info('Switched background to ' .. new_mode)
    wezterm.reload_configuration()    
end)

function module.apply_to_config(config)
    config.window_background_opacity = module.opacity
    config.text_background_opacity = 1.0
end

return module