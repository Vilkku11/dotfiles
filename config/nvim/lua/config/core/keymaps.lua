vim.g.mapleader = " "

local keymap = vim.keymap


-- Ctrl+C / Ctrl+V 
keymap.set("v", "<C-c>", '"+y', { noremap = true, silent = true, desc= "copy"})
keymap.set("n", "<C-v>", '"+p', { noremap = true, silent = true, desc = "paste"})
keymap.set("i", "<C-v>", '<C-r+', { noremap = true, silent = true})

s
-- increment/decrement for values
keymap.set("n", "<leader>+", "<C-a>", {desc = "Increment num"})
keymap.set("n", "<leader>-", "<C-x>", {desc = "Decrement num"})

-- window management
keymap.set("n", "<leader>sv", "<C-w>v", { desc = "Split window vertically" })
keymap.set("n", "<leader>sh", "<C-w>s", { desc = "Split window horizontally" })
keymap.set("n", "<leader>se", "<C-w>=", { desc = "Make splits equal size" })
keymap.set("n", "<leader>sx", "<cmd>close<CR>", { desc = "Close current split" })

keymap.set("n", "<leader>to", "<cmd>tabnew<CR>", { desc = "Open new tab" })
keymap.set("n", "<leader>tx", "<cmd>tabclose<CR>", { desc = "Close current tab" })
keymap.set("n", "<leader>tn", "<cmd>tabn<CR>", { desc = "Go to next tab" })
keymap.set("n", "<leader>tp", "<cmd>tabp<CR>", { desc = "Go to previous tab" })
keymap.set("n", "<leader>tf", "<cmd>tabnew %<CR>", { desc = "Open current buffer in new tab" })
