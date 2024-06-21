vim.cmd("let g:netrw_liststyle = 3")

local opt = vim.opt

-- linenumbers
opt.relativenumber = false
opt.number = true

-- tabs
opt.tabstop = 2 -- amount of space for tab
opt.shiftwidth = 2 -- intent width
opt.expandtab = true
opt.autoindent = true

-- backspace


-- search
opt.ignorecase = true -- ignore case on search
opt.smartcase = true -- don't ignore case on mixed search


-- color
opt.termguicolors = false
opt.background = "dark"
opt.signcolumn = "yes"
